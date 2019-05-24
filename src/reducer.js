function reducer(
  state = { input: 2, responsesList: {}, error: false },
  action
) {
  switch (action.type) {
    case "UPDATE_USERINPUT":
      return {
        ...state,
        input: action.updateInput
      };
    case "SAVE_RESPONSE":
      if (action.currentResponse !== undefined) {
        return {
          ...state,
          currentResponse: action.currentResponse,
          responsesList: Object.assign({}, state.responsesList, {
            [action.currentResponse.login]: action.currentResponse
          }),
          showProfile: true,
          error: false
        };
      } else {
        return {
          ...state,
          currentResponse: action.currentResponse,
          responsesList: {},
          showProfile: false,
          error: true
        };
      }
    case "NEW_TIMEOUT":
      return {
        ...state,
        newTimeOut: action.timeOut
      };
    default:
      return state;
  }
}

export default reducer;
