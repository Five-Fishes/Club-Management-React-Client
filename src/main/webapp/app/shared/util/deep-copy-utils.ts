export const deepCopy = (obj: any): any => JSON.parse(JSON.stringify(obj));

export const updateKey = (state: any, key: string, value: any): any => {
  const member: any = Object.keys(state).filter(objKey => objKey === key);
  if (member) {
    state[member] = value;
  }
  return deepCopy(state);
};

export const updateKeys = (state: any, keyValuePairs: Map<string, any>): any => {
  const newState = deepCopy(state);
  keyValuePairs.forEach((value, key) => {
    newState[key] = value;
  });
  return newState;
};
