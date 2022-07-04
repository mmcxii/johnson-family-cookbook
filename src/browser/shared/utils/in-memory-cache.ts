export function createInMemoryCache<T>(initialValue: undefined | T = undefined) {
  let value: undefined | T = initialValue;

  return {
    get() {
      return value;
    },
    reset() {
      value = initialValue;
    },
    set(updatedValue: T) {
      value = updatedValue;
    },
  };
}
