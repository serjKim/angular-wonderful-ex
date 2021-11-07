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
  {{ items }} <!-- T -->
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
## ResultError
The Rxjs stream are completed when an error occurred within. You have to handle it by the `catchError` operator.

Example:
A http call might be completed with an error. To handle, add `catchCoreError` to the pipe before `startWith`.
```typescript
const items$ = this.httpClient.get<T>(...).pipe(
  catchCoreError(),
  startWith(pending()),
) // Observable<T | Pending | ResultError<CoreError>
```
Use the same `*wexUnwrap` to get `T`:
```html
<ng-container *wexUnwrap="items$ | async; let items;">
  <h3>Pending container</h3>
  {{ items }} <!-- T -->
</ng-container>
```
`*wexUnwrap` handles both `ResultError` and `Pending` distinguishing T from.

or with templates:
```html
<ng-container *wexUnwrap="items$ | async; let items; pending: pending; error: error">
  <div>Pending container</div>
  {{ items }}
</ng-container>

<ng-template #pending> Loading... </ng-template>
<ng-template #error> Error occurred. </ng-template>
```
## Use `pending` + `startWith` + `ResultError`
The `wex-http-client` service is already encapsulating the ones technics:
Just use `request` method to call any http request:
```typescript
this.httpClient.request(http => http.get<T>(...)) // Observable<T | CoreResultError | Pending>
```
Under the hood it looks:
```typescript
public request<TResult>(
  builder: (httpClient: HttpClient) => Observable<TResult>,
): WexHttpResult<TResult> {
  return builder(this.http).pipe(
    catchCoreError(),
    startWith(pending()),
  );
}

type WexHttpResult<T> = Observable<T | CoreResultError | Pending>;
```
