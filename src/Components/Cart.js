import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { Link } from 'react-router-dom';
import DecrementBtn from './Buttons/DecrementBtn';
import IncrementBtn from './Buttons/IncrementBtn';
import Display from './Display';

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
  
  function removeItem(index, id, price) {
   items.splice(index, 1);
   setItems(items);
   localStorage.removeItem(`${id}`);
   if (totalPrice - price === 0) setCartIsEmpty(true);
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

  function handleRefresh() {
    setRefresh(!refresh);
    console.log("refreshed");
  }

  const [amount, setAmount] = useState(0);
  const incrementAmount = (arg) => setAmount(arg + 1);
  let decrementAmount = () => setAmount(amount - 1);

 return (
  <div>
   <NavBar/>
   <h1>Cart:</h1>
   {cartIsEmpty && <h2>Your cart is currently empty.</h2>}
   {items.map((item, index) => {
      return (
        <div key={item.id}>
          <div>{item.name}</div>
          <br/>
          <div style={{display: "flex", gap: "5px"}}>
          <DecrementBtn onClickFunc={decrementAmount} amount={amount} id={item.id}/>
          {item.amount}
          <IncrementBtn onClickFunc={() => incrementAmount(item.amount)} amount={item.amount} id={item.id} onRefresh={handleRefresh}/></div>
          <br/>
          <div>${item.price}</div>
          <br/>
          <br/>
          <Link to={`/shop/${item.id}`}>More Info</Link>
          <br/>
          <br/>
          <button onClick={() => removeItem(index, item.id, item.price)}>Remove</button>
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