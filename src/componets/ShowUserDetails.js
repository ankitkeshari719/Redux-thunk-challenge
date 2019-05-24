import React from "react";
import "./ShowUserDetails.css";

export default function ShowUserDetails(props) {
  return (
    <div className="divStyle">
      <h2>The Enter User Profile Details</h2>
      <h3>Name : {props.info.login}</h3>
      {props.info.email ? <h3>Email: {props.info.email}</h3> : null}
      {props.info.company ? <h3>Company: {props.info.company}</h3> : null}
      <img src={props.info.avatar_url} alt="avtar" />
    </div>
  );
}
