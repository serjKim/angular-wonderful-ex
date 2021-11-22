const ERROR_KEY = Symbol('ResultError.');

export class ResultError<T> {
  public readonly [ERROR_KEY] = true;
  public constructor(public readonly err: T) {}
  public toString(): string {
    return '[Result Error]';
  }
}

export function error<T>(err: T): ResultError<T> {
  return Object.freeze(new ResultError(err));
}

export function isError<TResult, TError>(
  obj: TResult | ResultError<TError> | null | undefined,
): obj is ResultError<TError> {
  return !!(obj as ResultError<TError>)?.[ERROR_KEY];
}
