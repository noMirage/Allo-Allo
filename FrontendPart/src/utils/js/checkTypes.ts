export function hasKeys<T extends object>(obj: T | {}): obj is T {
  return obj && Object.keys(obj as object).length > 0;
}
