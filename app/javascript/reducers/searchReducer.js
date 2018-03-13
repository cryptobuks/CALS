const initialState = {
  inputData: {}

}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VALUE':
      return {
      	...state,
      	inputData: {
      		...state.inputData,
      		[action.key]: action.value
      	}
      }
    default:
      return state
  }
}
