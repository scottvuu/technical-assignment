export const indexingArray = <T extends any>(
  inputArray: T[],
  indexField: keyof T
): { [key: string]: T | undefined } => {
  if (!inputArray.length) return {};
  return inputArray.reduce((prev: any, next: T) => {
    const index = next[indexField] as any;
    return {
      ...prev,
      [index]: next,
    };
  }, {});
};

export const findById = <T extends { id: string }>(
  array: T[],
  id: string
): T | null => {
  return array.find((item) => item.id === id) || null;
};