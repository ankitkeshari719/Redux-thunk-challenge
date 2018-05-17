import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';



function ShowUserDetails(props){
  
  return(
    <div className="divStyle">
      <h2>The Enter User Profile Details</h2>
      <h3>Name : {props.info.login}</h3>
      <h3>Email: {props.info.email}</h3>
      <h3>Company:{props.info.company}</h3>
      <img src={props.info.avatar_url}/>
    </div>
  )

}

class App extends Component {

  constructor(props)
  {
    super(props)
    this.functionHandleChange = this.functionHandleChange.bind(this);
  }
  getUser(value) {
    return dispatch => {
      //return something from this function
      //store the input value inside the store
      //dispatch to store the value in the store
      dispatch({
        type:"UPDATE_USERINPUT",
        updateInput:value
      })
      //start tracking continuity in users input
      //To do the tracking we have keep a count of setTimeout function which is getting
      // fire on input change
      this.props.timeOut && clearTimeout(this.props.timeOut);
      
      let timeOut = setTimeout(()=>
      {
       
         if(value !== "" &&  this.props.responsesList[value] === undefined )
        {
          
          axios.get(`https://api.github.com/users/`+ value)
          .then((response)=>
          {
            console.log(response)
            dispatch({
              type: "SAVE_RESPONSE",
              currentResponse: response.data,
              showProfile: true
            })
          })
          
        }
        else{
          dispatch({
            type:"SAVE_RESPONSE",
            currentResponse:this.props.responsesList[value]
            
          });
          
        }
      },3000)
      
      dispatch({
        type:"NEW_TIMEOUT",
        timeOut
      })
    }
  }

  functionHandleChange(e){
      let value =e.target.value.toLowerCase();
      this.props.store.dispatch(this.getUser(value));
    }

  render(){
    return(
      <div className="App">
        <form >
          <label>
            Name:
            <input type="text" name="name" onChange={this.functionHandleChange}  />
          </label>
        </form>
        {this.props.showProfile && <ShowUserDetails info={this.props.currentResponse}/>}
      </div>
    );
  }
}
const mapStateToProps = (state) => { 
 
  return{
    updateInput:state.updateInput,
    timeOut:state.newTimeOut,
    showProfile:state.showProfile,
    currentResponse:state.currentResponse,
    responsesList:state.responsesList
    
  };

};

export default connect( mapStateToProps )(App)
