import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CoreErrorEmitter } from '../error';
import { CoreResult, isError, isPending } from '../result';

class UnwrapState {
  constructor(public readonly pending: boolean, public readonly error: boolean) {}
}

class UnwrapDirectiveContext<T> {
  constructor(public readonly wexUnwrap: T | null, public readonly state: UnwrapState) {}
}

@Directive({
  selector: '[wexUnwrap]',
})
export class UnwrapDirective<T> {
  @Input('wexUnwrapError')
  public errorTemplate: TemplateRef<unknown> | null = null;

  @Input('wexUnwrapPending')
  public pendingTemplate: TemplateRef<unknown> | null = null;

  @Input('wexUnwrap')
  public set value(val: CoreResult<T> | null) {
    this.val = val;
    this.render();
  }

  public get value(): CoreResult<T> | null {
    return this.val;
  }

  private val: CoreResult<T> | null = null;

  constructor(
    private readonly templateRef: TemplateRef<UnwrapDirectiveContext<T | null>>,
    private readonly viewContainer: ViewContainerRef,
    private readonly errorEmitter: CoreErrorEmitter,
  ) {}

  public static ngTemplateContextGuard<T>(_: UnwrapDirective<T>, ctx: unknown): ctx is UnwrapDirectiveContext<T> {
    return true;
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
