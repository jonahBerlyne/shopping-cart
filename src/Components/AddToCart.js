import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import calculatePriceOf from "./Price";

export default function AddToCart() {

 const { id } = useParams();
 
 const [item, setItem] = useState([]);
 const [error, setError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 
 async function fetchItem () {
  try {
   const itemData = await fetch(`https://fakestoreapi.com/products/${id}`);
   console.log("fetched");
   const item = await itemData.json();
   setItem(item);
   setError('');
  } catch (err) {
    setError(err);
    setErrorMessage("Sorry! You have an error: " + err);
  }
 }

 useEffect(() => {
  if (error == '') setErrorMessage('');
 });

 useEffect(() => {
  fetchItem();
  let stor = localStorage.getItem(id);
  stor = JSON.parse(stor);
  if (stor !== null) setNumItems(parseInt(stor.amount));
  return () => {
    setItem([]);
  } 
 }, []);
 
 const [totalPrice, setTotalPrice] = useState(0);

 const [numItems, setNumItems] = useState(0);
 
 function addToCart() {
  setNumItems(numItems + 1);
}

useEffect(() => {
  if (numItems !== 0) {
   const itemPrice = calculatePriceOf(item);
   setTotalPrice(itemPrice * numItems);
  }
}, [numItems]);

useEffect(() => {
  if (totalPrice > 0) {
   addToLocalStorage(item.id, numItems, item.title, totalPrice);
   setAdded(true);
   setTimeout(() => {
     setAdded(false);
   }, 1000);
  }
 }, [totalPrice]);

 function addToLocalStorage(idNum, numItems,itemTitle, itemPrice) {
   let data = localStorage.getItem(idNum);
   data = data ? JSON.parse(data) : {};
   const id = "id";
   data[id] = idNum;
   const amount = "amount";
   data[amount] = numItems;
   const name = "name";
   data[name] = itemTitle;
   const price = "price";
   data[price] = itemPrice.toFixed(2);
   localStorage.setItem(idNum, JSON.stringify(data));
 }

 const [added, setAdded] = useState(false);
 
 return (
  <div>
   {errorMessage && <h1>{errorMessage}</h1>}
   <div style={{display: "flex", gap: "100px"}}>
    <button onClick={addToCart}>Add to Cart</button>
   </div> 
   <br/>
   {added && <p>Added!</p>}
   <br/>
   <br/>
  </div>
 );
}