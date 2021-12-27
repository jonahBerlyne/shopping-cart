import React, { useState, useEffect, useRef } from 'react';
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
  return () => {
    setItem([]);
  } 
 }, []);

 const [inputValue, setInputValue] = useState(0);
 
 function changeValue(e) {
  setInputValue(parseInt(e.target.value));
 }
 
 const [totalPrice, setTotalPrice] = useState(0);

 useEffect(() => {
  const itemPrice = calculatePriceOf(item);
  setTotalPrice(itemPrice * inputValue);
 }, [inputValue]);

 const [numItems, setNumItems] = useState(0);
 
 function addToCart() {
   if (isNaN(inputValue) || inputValue === 0 || inputValue > 15) return;
   setNumItems(inputValue);
 }

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

 useEffect(() => {
  if (inputValue !== 0) {
    addToLocalStorage(item.id, numItems, item.title, totalPrice);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 5000);
  }
 }, [numItems]);
 
 return (
  <div>
   {errorMessage && <h1>{errorMessage}</h1>}
   <input type="number" min="0" max="15" value={inputValue} onChange={changeValue}/>
   <p>{isNaN(inputValue) ? "Please enter a number." : inputValue > 15 ? "You can only add 15 items maximum." : `Total: $${inputValue === 0 ? "0.00" : totalPrice.toFixed(2)}`}</p> 
   <button onClick={addToCart}>Add to Cart</button>
   {added && <p>Added!</p>}
   <br/>
   <br/>
   <br/>
   <br/>
   <br/>
   <br/>
  </div>
 );
}