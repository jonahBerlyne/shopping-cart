import React, { useState, useEffect } from 'react';

export default function DecrementBtn(props) {

 const {amount} = props;

 function decrementTotal() {
  console.log("decremented");
 }

 return (
  <div>
   <button onClick={decrementTotal}>-</button>
  </div>
 );
}