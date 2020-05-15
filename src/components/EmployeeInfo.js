import React from "react";

function EmployeeInfo(props) {

  return (
    <tr>
            <th scope="row"><img alt={props.firstName}  src={props.picture} /></th>  

      <td >{props.firstName}</td>
      <td >{props.lastName}</td>
      <td >{props.email}</td>
      <td >{props.phone}</td>

   </tr>
  );
}

export default EmployeeInfo;