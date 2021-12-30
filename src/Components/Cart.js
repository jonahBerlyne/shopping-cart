import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { Link } from 'react-router-dom';
import DecrementBtn from './Buttons/DecrementBtn';
import IncrementBtn from './Buttons/IncrementBtn';

export default function Cart() {

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
  
  const removeItem = (index, id, price) => {
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
  
  const [totalAmount, setTotalAmount] = useState(NaN);
  const [id, setId] = useState(null);
  const [index, setIndex] = useState(null);
  const [itemPrice, setItemPrice] = useState(NaN);
  
  const decrementAmount = (amount, id, index, price) => {
    setId(id);
    setIndex(index);
    amount = amount - 1;
    amount === 0 ? removeItem(index, id, price) : setTotalAmount(amount);
  }

  const incrementAmount = (amount, id, index) => {
    setId(id);
    setIndex(index);
    amount = amount + 1;
    setTotalAmount(amount);
  }

  
  useEffect(() => {
    if (index !== null) setItemPrice((totalAmount * items[index].initial).toFixed(2));
  }, [totalAmount]);
  
  useEffect(() => {
    if (id !== null) changeItem(id, index);
    // So the UI and localStorage can update synchronously:
    setRefresh(!refresh);
  }, [itemPrice]);

  const changeItem = (id, index) => {
    items[index].amount = totalAmount;
    items[index].price = itemPrice;
    setItems(items);
    let item = localStorage.getItem(id);
    item = JSON.parse(item);
    item.amount = totalAmount;
    item.price = itemPrice;
    item = JSON.stringify(item);
    localStorage.setItem(id, item);
  }

 return (
  <div>
   <NavBar/>
   <h1>Cart:</h1>
   {cartIsEmpty && <h2>Your cart is currently empty.</h2>}
   {items.map((item, index) => {
      return (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <br/>
          <img src={item.image} alt={item.image} height="150px" width="150px"/>
          <br/>
          <br/>
          <div style={{display: "flex", gap: "5px"}}><DecrementBtn onClick={() => decrementAmount(item.amount, item.id, index, item.price)}/>{item.amount} <IncrementBtn onClick={() => incrementAmount(item.amount, item.id, index)}/></div>
          <br/>
          <div>${item.price}</div>
          <br/>
          <br/>
          <button><Link to={`/shop/${item.id}`} style={{textDecoration: "none", color: "black"}}>More Info</Link></button>
          <br/>
          <br/>
          <button onClick={() => removeItem(index, item.id, item.price)} style={{cursor: "pointer"}}>Remove Item</button>
          <br/>
          <br/>
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