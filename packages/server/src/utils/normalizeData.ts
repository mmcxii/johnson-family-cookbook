export function normalizeData(data: { [key: string]: any }) {
  const normalizedData: typeof data = {};
  const dataKeys = Object.keys(data);

  for (let i = 0; i < dataKeys.length; i++) {
    const key = dataKeys[i];
    const value = data[key];

    switch (typeof value) {
      case "string":
        normalizedData[key] = value.toLowerCase().trim();
        break;

      default:
        normalizedData[key] = value;
        break;
    }
  }
  return normalizedData;
}
