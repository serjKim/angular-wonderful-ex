import { Directive, Input, OnChanges, SimpleChange, TemplateRef, ViewContainerRef } from '@angular/core';
import { CoreResultError, isError } from '../error';
import { isPending, Pending } from '../pending';
import { UnwrapService } from './unwrap.service';

type DirectiveChanges<T> = {
  [name in keyof UnwrapDirective<T>]: SimpleChange;
};

class UnwrapDirectiveContext<T> {
  constructor(public readonly $implicit: T) {}
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
  public value: T | CoreResultError | Pending | null = null;

  constructor(
    private readonly templateRef: TemplateRef<UnwrapDirectiveContext<T | null>>,
    private readonly viewContainer: ViewContainerRef,
    private readonly unwrapService: UnwrapService,
  ) {}

  public static ngTemplateContextGuard<T>(_: UnwrapDirective<T>, ctx: unknown): ctx is UnwrapDirectiveContext<T> {
    return true;
  }

  public ngOnChanges(changes: DirectiveChanges<T>): void {
    const val = changes.value;
    const errorTemplate = changes.errorTemplate;
    const pendingTemplate = changes.pendingTemplate;
    if (
      val.previousValue !== val.currentValue ||
      errorTemplate.previousValue !== errorTemplate.currentValue ||
      pendingTemplate.previousValue !== pendingTemplate.currentValue
    ) {
      this.render();
    }
  }

  private render(): void {
    if (isPending(this.value)) {
      this.viewContainer.clear();

      if (this.pendingTemplate) {
        this.viewContainer.createEmbeddedView(this.pendingTemplate);
      }
    } else if (isError(this.value)) {
      this.viewContainer.clear();

      if (this.errorTemplate) {
        this.viewContainer.createEmbeddedView(this.errorTemplate, { value: this.value });
      }

      this.unwrapService.raiseError.emit(this.value.err);
    } else {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef, new UnwrapDirectiveContext(this.value));
    }
  }
}
