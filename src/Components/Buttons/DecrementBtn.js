import React from 'react';

export default function DecrementBtn( {onClick} ) {

 return (
  <div>
   <button onClick={onClick} style={{cursor: "pointer"}}>-</button>
  </div>
 );
}