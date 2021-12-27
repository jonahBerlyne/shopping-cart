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

 const [totalPrice, setTotalPrice] = useState(0);

 useEffect(() => {
  if (items.length !== 0) {
    let priceArr = [];
    let j = items.length;
    while (j--) {
      priceArr.push(parseFloat(items[j].price));
    }
    priceArr = priceArr.reduce((a, b) => a + b).toFixed(2);
    setTotalPrice(priceArr);
  }
 }, [items]);

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
   <br/>
   <br/>
   <br/>
   <p>Total Price: ${totalPrice}</p>
  </div>
 );
}