export const validInput = obj =>
  Object.keys(obj).some(key => obj[key].length < 1);
