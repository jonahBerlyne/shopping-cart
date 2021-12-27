import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';

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

 return (
  <div>
   <NavBar/>
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