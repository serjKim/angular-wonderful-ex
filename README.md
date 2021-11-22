# Guidelines

## Define index.ts for public api
To use short paths, to easy refactor, reduces the file path changes.

✅ Good:
```typescript
// module/logic.ts
export const someLogic = () => { ...};

// module/index.ts
export * from './logic';

// consumer.ts
import { someLogic } from './module';
```

❌ Bad:

```typescript
// consumer.ts
import { someLogic } from './module/logic';
```

## Use nominal types

Avoid primitive obsession

✅ Good: TBD

❌ Bad: TBD

## Display validation errors with `formGroup.touched`
Combine `hasError` with `formGroup.touched`, It increases UX, reduces the 'noise' in the form.
Don't use `[disabled]="formGroup.invalid"` it will confuse the user there isn't a clue to enable the button.
```html
<mat-form-field>
    <mat-label>Name</mat-label>
    <input type="text" matInput [formControl]="nameControl" >
    <mat-error *ngIf="nameControl.hasError('required') && formGroup.touched">
      Name is <strong>required</strong>
    </mat-error>
</mat-form-field>
<button mat-button (click)="onClick">Submit</button>
```
Errors will be displayed after user pressed to the one.
```typescript
public onClick() {
  this.formGroup.markAsTouched();
  if (this.formGroup.invalid) {
    return;
  }
  // ...
}
```
## Use `pending` + `startWith` for loading objects
```typescript
const items$ = this.httpClient.get<T>(...).pipe(
  startWith(pending()),
) // Observable<T | Pending>
```
The stream will emit `Pending` while T is loading. It's useful to display a progress bar or placeholder.
## Unwrap directive
So, `items$` has one of states: `Pending` or `T`. You might unwrap `items$` to get only `T`:
```html
<ng-container *wexUnwrap="items$ | async; let items;">
  <h3>Pending container</h3>
  {{ items }} <!-- T | null -->
</ng-container>
```
use `state.pending` to display progress state during loading:
```html
<ng-container *wexUnwrap="items$ | async; let items; state as s">
  <h3>Pending container</h3>
  <div *ngIf="s.pending">Loading...</div>
  {{ items }} <!-- T | null -->
</ng-container>
```

or with template:
```html
<ng-container *wexUnwrap="items$ | async; let items; pending: pending">
  <h3>Pending container</h3>
  {{ items }}
</ng-container>
<ng-template #pending> Loading... </ng-template>
```
The whole content will be replaced with `#pending` template.
## CoreResultError
The Rxjs streams are stopped once an error has occurred in. You have to handle it by the `catchError` operator.

Example:
A http call might be completed with an error. To handle, add `catchCoreError` to the pipe before `startWith`.
```typescript
const items$ = this.httpClient.get<T>(...).pipe(
  catchCoreError(),
  startWith(pending()),
) // Observable<T | Pending | CoreResultError>
```
Use the same `*wexUnwrap` to get `T`:
```html
<ng-container *wexUnwrap="items$ | async; let items;">
  <h3>Pending container</h3>
  {{ items }} <!-- T | null -->
</ng-container>
```
`*wexUnwrap` handles both `CoreResultError` and `Pending` distinguishing T from.

use `state` to display progress and error states:
```html
<ng-container *wexUnwrap="items$ | async; let items; state as s">
  <h3>Pending container</h3>
  <div *ngIf="s.pending">Loading...</div>
  <div *ngIf="s.error">Error.</div>
  {{ items }} <!-- T | null -->
</ng-container>
```

or with templates:
```html
<ng-container *wexUnwrap="items$ | async; let items; pending: pending; error: error">
  <div>Pending container</div>
  {{ items }}
</ng-container>

<ng-template #pending> Loading... </ng-template>
<ng-template #error> Error occurred. </ng-template>
```
## Use `CoreHttpClient`
The `CoreHttpClient` service is already encapsulating the ones technics:
Just use `request` method to call any http request:
```typescript
this.httpClient.request(http => http.get<T>(...)) // Observable<T | CoreResultError | Pending>
```
Under the hood it looks:
```typescript
public request<TResult>(
  builder: (httpClient: HttpClient) => Observable<TResult>,
): CoreResult<TResult> {
  return builder(this.http).pipe(
    catchCoreError(),
    startWith(pending()),
  );
}

type CoreResult<T> = Observable<T | CoreResultError | Pending>;

type CoreResultError =
  | HttpResponseError
  | Error
  // and other types
  ;
```
