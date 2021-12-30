import React from 'react';

export default function IncrementBtn( {onClick} ) {

 return (
  <div>
   <button onClick={onClick} style={{cursor: "pointer"}}>+</button>
  </div>
 );
}