
export const generateUniqueId = (array) => {
  const maxId = array.reduce((max, object) => Math.max(max, object.id), 0);
  return maxId + 1;
};
