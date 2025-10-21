export function getTypedKeys<T extends Record<string, any>>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export function flattenObject<T extends Record<string, any>>(obj: T): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      return { ...acc, ...flattenObject(obj[key]) };
    }
    return { ...acc, [key]: obj[key] };
  }, {});
}
