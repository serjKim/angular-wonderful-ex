const PENDING = Symbol('Pending.');

export class Pending {
  public readonly [PENDING] = true;
  public toString(): string {
    return '[Pending]';
  }
}

export function pending(): Pending {
  return Object.freeze(new Pending());
}

export function isPending<T>(obj: T | Pending | null | undefined): obj is Pending {
  return !!(obj as Pending)?.[PENDING];
}
