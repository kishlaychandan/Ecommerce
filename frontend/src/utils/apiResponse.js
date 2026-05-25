export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function responseArray(response, key) {
  return asArray(response?.data?.[key]);
}
