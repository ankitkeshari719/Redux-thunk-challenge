export default function reducer(state={input:2}, action){

  console.log("value of action inside reducer", action);
  
  if( action.type === 'SUBMIT') {
   return{
    ...state ,
    input:action.updateInput,
     test:`hello`
   }
  }
 
   if (action.type === 'RESPONSE'){
     
     return{
      ...state,
      response: state.response ? state.response.concat([action.saveResponse]) : [action.saveResponse]
     }
   }
   
}


