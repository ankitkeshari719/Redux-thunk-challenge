function reducer(state = { input: 2, responsesList: {} }, action) {

  console.log("value of action inside reducer", state);

  if (action.type === 'UPDATE_USERINPUT') {
    return {
      ...state,
      input: action.updateInput

    }
  }
  else if (action.type === 'SAVE_RESPONSE') {
    console.log("RRRRRRRRRRR", state.responsesList)
    return {
      ...state,
      currentResponse: action.currentResponse,
      responsesList: Object.assign({}, state.responsesList, { [action.currentResponse.login]: action.currentResponse }),
      showProfile: true,

    }
  }
  else if (action.type === 'NEW_TIMEOUT') {
    return {
      ...state,
      newTimeOut: action.timeOut

    }
  }
  else {
    return state
  }

}

export default reducer;

