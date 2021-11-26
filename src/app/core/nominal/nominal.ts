const BRAND = Symbol('Branding');

export type Nominal<T, TBrand> = T & { readonly [BRAND]: TBrand };
