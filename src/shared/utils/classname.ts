export const className = (object: object) => {
  return Object.entries(object)
    .filter(([_key, value]) => !!value)
    .map(([key]) => key)
    .join(" ");
};