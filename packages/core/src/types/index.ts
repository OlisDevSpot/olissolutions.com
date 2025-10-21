export * from "./enums";
export * from "./auth";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// get keys of object union eg: { a: string } | { b: string } | { c: number }
export type KeysOfUnion<T> = T extends T ? keyof T : never;

export interface IPaginationParams {
  limit?: number;
  page?: number;
}

export type PaginationParams = Prettify<IPaginationParams>;

export interface TableOptions<T extends string> {
  include: T[];
}
