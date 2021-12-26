import React, { useState, useEffect } from 'react';
import CartDisplay from './CartDisplay';

export default function Cart() {

 const [items, setItems] = useState([]);
 
 useEffect(() => {
  let itemValues = [];
  let keys = Object.keys(localStorage);
  let i = keys.length;
  while ( i-- ) {
   itemValues.push(localStorage.getItem(keys[i]));
  }
  itemValues = itemValues.map(value => JSON.parse(value));
  setItems(itemValues);
 }, []);

 useEffect(() => {
  // let keys = Object.keys(localStorage);
  // let i = keys.length;
  // const item = localStorage.getItem(keys);
  // console.log(item);
 });

 return (
  <div>
   <h1>Cart:</h1>
   {items.map(item => {
    return (
     <div key={item.id}>
      <p>{item.amount}x {item.name} ${item.price}</p>
     </div>
    )
   })}
  </div>
 );
}