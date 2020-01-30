export const appendToArray = (arr, newItem) =>
  !newItem
    ? [...arr]
    : [...arr.filter(item => item.id !== newItem.id), newItem];

export const prependToArray = (arr, newItem) =>
  !newItem
    ? [...arr]
    : [newItem, ...arr.filter(item => item.id !== newItem.id)];

export const removeFromArray = (arr, newItem) =>
  !newItem ? [] : arr.filter(item => item.id !== newItem.id);
