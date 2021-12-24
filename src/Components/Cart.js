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
 
 return (
  <div>
   {errorMessage && <h1>{errorMessage}</h1>}
   <input type="number" min="0" max="15" value={inputValue} onChange={changeValue}/> 
   <p>Total: ${inputValue === 0 ? "0.00" : totalPrice.toFixed(2)}</p> 
   {/* Conditional to avoid NaN display on render */}
  </div>
 );
}