function reducer(state={input:2, response:{}}, action){

  console.log("value of action inside reducer", state);
  
  if( action.type === 'UPDATE_USERINPUT') {
   return{
    ...state ,
    input:action.updateInput
    
   }
  }
 
   if (action.type === 'SAVE_RESPONSE'){
     
     return{
      ...state,
      saveAllResponses:state.response[action.saveResponse.login]=action.saveResponse,
      showProfile:true
    }
   }
   
   if( action.type === 'NEW_TIMEOUT') {
    return{
     ...state ,
     newTimeOut:action.timeOut
     
    }
   }else{
     return state
   }
   
}

export default reducer;

