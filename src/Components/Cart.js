import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { Link } from 'react-router-dom';

export default function Cart(props) {

  const [items, setItems] = useState([]);
  const [cartIsEmpty, setCartIsEmpty] = useState(false);

  useEffect(() => {
    let itemValues = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;
    if (i === 0) {
      setCartIsEmpty(true);
    } else {
      while ( i-- ) {
        itemValues.push(localStorage.getItem(keys[i]));
      }
      itemValues = itemValues.map(value => JSON.parse(value));
      setItems(itemValues);
    }
  }, []);
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
  
  function removeItem(index, id) {
   items.splice(index, 1);
   setItems(items);
   localStorage.removeItem(`${id}`);
   setRefresh(!refresh);
  }

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
  });

 return (
  <div>
   <NavBar/>
   <h1>Cart:</h1>
   {cartIsEmpty && <h2>Your cart is currently empty.</h2>}
   {items.map((item, index) => {
      return (
        <div key={item.id}>
          <p>{item.amount}x {item.name} ${item.price}</p>
          <Link to={`/shop/${item.id}`}>Buy More</Link>
          <br/>
          <br/>
          <button onClick={() => removeItem(index, item.id)}>Remove</button>
        </div>
      )
    })}
   <br/>
   <br/>
   <br/>
   {!cartIsEmpty && <p>Total Price: ${totalPrice}</p>}
  </div>
 );
}