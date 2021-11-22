import { Directive, Input, OnChanges, SimpleChange, TemplateRef, ViewContainerRef } from '@angular/core';
import { CoreResult, isError, isPending } from '../result';
import { CoreErrorEmitter } from '../error';

class UnwrapState {
  constructor(public readonly pending: boolean, public readonly error: boolean) {}
}

type DirectiveChanges<T> = {
  [name in keyof UnwrapDirective<T>]?: SimpleChange;
};

class UnwrapDirectiveContext<T> {
  constructor(public readonly $implicit: T | null, public readonly state: UnwrapState) {}
}

@Directive({
  selector: '[wexUnwrap]',
})
export class UnwrapDirective<T> implements OnChanges {
  @Input('wexUnwrapError')
  public errorTemplate: TemplateRef<unknown> | null = null;

  @Input('wexUnwrapPending')
  public pendingTemplate: TemplateRef<unknown> | null = null;

  @Input('wexUnwrap')
  public value: CoreResult<T> | null = null;

  constructor(
    private readonly templateRef: TemplateRef<UnwrapDirectiveContext<T | null>>,
    private readonly viewContainer: ViewContainerRef,
    private readonly errorEmitter: CoreErrorEmitter,
  ) {}

  public static ngTemplateContextGuard<T>(_: UnwrapDirective<T>, ctx: unknown): ctx is UnwrapDirectiveContext<T> {
    return true;
  }

  public ngOnChanges(changes: DirectiveChanges<T>): void {
    const val = changes.value;
    const errorTemplate = changes.errorTemplate;
    const pendingTemplate = changes.pendingTemplate;
    if (
      val?.previousValue !== val?.currentValue ||
      errorTemplate?.previousValue !== errorTemplate?.currentValue ||
      pendingTemplate?.previousValue !== pendingTemplate?.currentValue
    ) {
      this.render();
    }
  }

  private render(): void {
    const unwrapState = new UnwrapState(isPending(this.value), isError(this.value));

    if (isPending(this.value)) {
      this.viewContainer.clear();

      if (this.pendingTemplate) {
        this.viewContainer.createEmbeddedView(this.pendingTemplate);
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef, new UnwrapDirectiveContext(null, unwrapState));
      }
    } else if (isError(this.value)) {
      this.viewContainer.clear();

      if (this.errorTemplate) {
        this.viewContainer.createEmbeddedView(this.errorTemplate);
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef, new UnwrapDirectiveContext(null, unwrapState));
      }

      this.errorEmitter.emitter.emit(this.value.err);
    } else {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef, new UnwrapDirectiveContext(this.value, unwrapState));
    }
  }
}
