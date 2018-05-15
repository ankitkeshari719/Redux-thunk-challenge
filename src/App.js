import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



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
  constructor(props){
    super(props)
    console.log("value of props", props);
    console.log("value of local this props", props.store.getState())
    this.state={
      profileData:"",
      showProfile:false,
      componentinput:''
     
    }
    
    this.functionHandleChange = this.functionHandleChange.bind(this);
  }
  
  functionHandleChange(e){
      let value =e.target.value
      this.props.store.dispatch({
        type:"SUBMIT",
        updateInput:value
      })

      this.setState(()=>
      {
        return{ componentinput:this.props.store.getState().input }
      });
     

      this.state.timeOut && clearTimeout(this.state.timeOut)

      let timeOut = setTimeout(()=>{
        
        if(value === this.state.componentinput && value !=""){
          axios.get(`https://api.github.com/users/`+ this.state.componentinput)
          .then((response)=>{
          
          this.setState(()=>
          {
            
            return {
              profileData:response.data,
              showProfile:true,
              
            }
          })
        
          this.props.store.dispatch({
            type:"RESPONSE",
            saveResponse:this.state.profileData
          })
         
       
      })
      }
    },3000)
   
    this.setState(()=>{timeOut})
  
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
        {this.state.showProfile && <ShowUserDetails info={this.state.profileData}/>}
      </div>
    );
  }
}

export default App;
