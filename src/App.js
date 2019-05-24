import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { connect } from "react-redux";
import ShowUserDetails from "./componets/ShowUserDetails";

class App extends Component {
  getUser(value) {
    return dispatch => {
      //return something from this function
      //store the input value inside the store
      //dispatch to store the value in the store
      dispatch({
        type: "UPDATE_USERINPUT",
        updateInput: value
      });
      //start tracking continuity in users input
      //To do the tracking we have keep a count of setTimeout function which is getting
      // fire on input change
      this.props.timeOut && clearTimeout(this.props.timeOut);

      let timeOut = setTimeout(() => {
        if (value !== "" && this.props.responsesList[value] === undefined) {
          axios.get(`https://api.github.com/users/` + value).then(response => {
            console.log(response);
            dispatch({
              type: "SAVE_RESPONSE",
              currentResponse: response.data,
              showProfile: true
            });
          });
        } else {
          dispatch({
            type: "SAVE_RESPONSE",
            currentResponse: this.props.responsesList[value]
          });
        }
      }, 3000);

      dispatch({
        type: "NEW_TIMEOUT",
        timeOut
      });
    };
  }

  functionHandleChange = e => {
    let value = e.target.value.toLowerCase();
    this.props.store.dispatch(this.getUser(value));
  };

  render() {
    return (
      <div className="App">
        <h3>Please Enter the User Name</h3>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={this.functionHandleChange}
            />
          </label>
        </form>
        {this.props.showProfile && (
          <ShowUserDetails info={this.props.currentResponse} />
        )}
        {this.props.error && <p>User Not Found</p>}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    updateInput: state.updateInput,
    timeOut: state.newTimeOut,
    showProfile: state.showProfile,
    currentResponse: state.currentResponse,
    responsesList: state.responsesList,
    error: state.error
  };
};

export default connect(mapStateToProps)(App);
