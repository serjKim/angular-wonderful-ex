![example workflow](https://github.com/serjKim/angular-wonderful-ex/actions/workflows/node.js.yml/badge.svg)

# Guidelines

## Define index.ts for public api
To use short paths, to easy refactor, reduces the file path changes.

✅ Good
```typescript
// module/logic.ts
export const someLogic = () => { ...};

// module/index.ts
export * from './logic';

// consumer.ts
import { someLogic } from './module';
```

❌ Bad

```typescript
// consumer.ts
import { someLogic } from './module/logic';
```

## Use nominal types

Avoid primitive obsession.

✅ Good
```typescript
type UserId = Nominal<'user.userId', number>;
type RoleId = Nominal<'user.roleId', number>;

function foo(userId: UserId, roleId: RoleId) {}
```

❌ Bad
```typescript
function foo(userId: number, roleId: number) {}
```

### **How to use**

1. Define a nominal type using the `Nominal` helper.
```typescript
type UserId = Nominal<'user.userId', number>;
```
2. Define a parser with validation and so on.
```typescript
const UserId = {
  parse(x: unknown) {
    // Validate x...
    return x as UserId;
  },
} as const;
```
Better is to put the `parse` to a const object named as well as `UserId`, hence there would be only single import in the consumer's code:
```typescript
import { UserId } from './user-id'

const userId = UserId.parse(1);

function foo(userId: UserId) {}
```
instead of
```typescript
import { UserId, parseUserId } from './user-id'

const userId = parseUserId(1);

function foo(userId: UserId) {}
```
### **Properties**
1. Allows to cast to the underlying type.
```typescript
const n: number = userId; // Ok      it refers to a number (kind of Covariance),
const userId: UserId = 1; // Error   but not vice versa
```
2. Protects from passing invalid values.
```typescript
const userId = UserId.parse(1);
const roleId = RoleId.parse(100);

function foo(userId: UserId, roleId: RoleId) {}

foo(userId, roleId); // Ok
foo(roleId, userId); // Error
foo(-1, 0);          // Error
```
3. Zero-cost abstraction.
```javascript
// compiled js:
const roleId = 100; // After compilation it's just value
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
So, `items$` has one of states: `Pending` or `T`. You might want to unwrap `items$` to get only `T`:
```html
<ng-container *wexUnwrap="items$ | async as items">
  <h3>Pending container</h3>
  {{ items }} <!-- T | null -->
</ng-container>
```
use `state.pending` to display progress state during loading:
```html
<ng-container *wexUnwrap="items$ | async as items; state as s">
  <h3>Pending container</h3>
  <div *ngIf="s.pending">Loading...</div>
  {{ items }} <!-- T | null -->
</ng-container>
```

or with template:
```html
<ng-container *wexUnwrap="items$ | async as items; pending: pending">
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
<ng-container *wexUnwrap="items$ | async as items;">
  <h3>Pending container</h3>
  {{ items }} <!-- T | null -->
</ng-container>
```
`*wexUnwrap` handles both `CoreResultError` and `Pending` distinguishing T from.

use `state` to display progress and error states:
```html
<ng-container *wexUnwrap="items$ | async as items; state as s">
  <h3>Pending container</h3>
  <div *ngIf="s.pending">Loading...</div>
  <div *ngIf="s.error">Error.</div>
  {{ items }} <!-- T | null -->
</ng-container>
```

or with templates:
```html
<ng-container *wexUnwrap="items$ | async as items; pending: pending; error: error">
  <div>Pending container</div>
  {{ items }}
</ng-container>

<ng-template #pending> Loading... </ng-template>
<ng-template #error> Error occurred. </ng-template>
```
## Use `wrap`
The `wrap` is already encapsulating the ones technics:
Just add one to any http request:
```typescript
return this.httpClient.http
  .get<T>(...) // Observable<T>
  .pipe(wrap()); // Observable<T | CoreResultError | Pending>
```
Under the hood it looks:
```typescript
function wrap<T>(): OperatorFunction<T, CoreResult<T>> {
  return pipe(catchCoreError(), startWith(pending()));
}

type CoreResult<T> = Observable<T | CoreResultError | Pending>;

type CoreResultError =
  | HttpResponseError
  | Error
  // and other types
  ;
```

## Use ```wrapAsync``` with promise
The non-cancelable version of wrap. It could be useful for side effects, like a entity creating.
```typescript
wrapAsync(() => this.http.post<T>(...).toPromise()) // Observable<T | CoreResultError | Pending>
```
Under the hood:
```typescript
function wrapAsync<TResult>(builder: () => Promise<TResult>): Observable<CoreResult<TResult>> {
  return defer(() => builder())
    .pipe(
      catchCoreError(),
      startWith(pending())
    );
}
```
