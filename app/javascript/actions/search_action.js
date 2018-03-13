export const addValue = (key, value) => {
  const action = {
    type: 'ADD_VALUE',
    key,
    value
  }
  return action
}
