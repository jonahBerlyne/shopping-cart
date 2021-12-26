import React, { useState, useEffect } from 'react';

export default function CartDisplay() {

 const [items, setItems] = useState([]);

 useEffect(() => {
  setItems(localStorage.getItem("itemsStr"));
  console.log(items);
 });

 return (
  <div>
   <h1>Cart:</h1>
   {items.map(item => {
    return (
     <div key={item.id}>
      <p>{item.numItems}x {item.title}: ${item.totalPrice}</p>
     </div>
    )
   })}
   {/* {numItems}x {title}:  ${totalPrice} */}
  </div>
 );
}