export const className = (object: object) => {
  return Object.entries(object)
    .filter(([key, value]) => !!value && !!key)
    .map(([key]) => key)
    .join(" ");
};