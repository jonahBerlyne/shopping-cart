import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { Link } from 'react-router-dom';

export default function Cart(props) {

  const [items, setItems] = useState([]);
  const [cartIsEmpty, setCartIsEmpty] = useState(false);

  // const {arrPassed} = props;
  
  // const [cartProp, setCartProp] = useState([]);
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

//  function removeItem(index, id) {
  //    items.splice(index, 1);
  //    localStorage.removeItem(id);
  //    setItems(items);
  //    console.log(`${index} removed`);
  //  }
  
  // const handleClick = name => {
  //  let index = cartProp.findIndex(prop => prop.name === name);
  //  let tempCartProp = cartProp.slice();
  //  tempCartProp.push({name: cartProp.length});
  //  setCartProp(tempCartProp);
  // }

  // const deleteProp = index => {
  //  let tempCartProp = cartProp.slice();
  //  tempCartProp.splice(index, 1);
  //  setCartProp(tempCartProp);
  // }

 return (
  <div>
   <NavBar/>
   <h1>Cart:</h1>
   {cartIsEmpty && <h2>Your cart is currently empty.</h2>}
   {items.map(item => {
      return (
        <div key={item.id}>
          <p>{item.amount}x {item.name} ${item.price}</p>
          <Link to={`/shop/${item.id}`}>Buy More</Link>
        </div>
      )
    })}
   <br/>
   <br/>
   {/* {cartProp.map((prop, index) => {
     return cartProp.length > 2 ? (<div key={index}>{prop.name} <button onClick={() => {deleteProp(index)}}>x</button></div>) : (<div key={index}>{prop.name} <button onClick={() => {deleteProp(index)}}>x</button></div>)
   })}
   <button onClick={() => handleClick(cartProp.name)}>More</button>  */}
   <br/>
   {!cartIsEmpty && <p>Total Price: ${totalPrice}</p>}
  </div>
 );
}