import React, { useState, useEffect } from 'react';

export default function DecrementBtn(props) {

 const {onClick} = props;

 return (
  <div>
   <button onClick={onClick}>-</button>
  </div>
 );
}