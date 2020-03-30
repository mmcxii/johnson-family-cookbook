export function normalizeData(data: { [key: string]: any }) {
  let normalizedData: typeof data = {};
  for (const key in data) {
    const currentValue = data[key];
    switch (typeof currentValue) {
      case "string":
        normalizedData[key] = currentValue.toLowerCase().trim();
        break;
      default:
        normalizedData[key] = currentValue;
    }
  }
  return normalizedData;
}
