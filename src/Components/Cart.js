import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import calculatePriceOf from "./Price";

export default function AddToCart() {
 const { id } = useParams();
 
 const [item, setItem] = useState([]);
 
 async function fetchItem () {
  const itemData = await fetch(`https://fakestoreapi.com/products/${id}`);
  
  const item = await itemData.json();
  setItem(item);

 }

 useEffect(() => {
  fetchItem();
  return () => {
    setItem([]);
  } 
 }, []);

 const [prevValue, setPrevValue] = useState(0);
 const [inputValue, setInputValue] = useState(0);
 
 function changeValue(e) {
  setPrevValue(parseInt(inputValue));
  setInputValue(parseInt(e.target.value));
 }
 
 const [buyPrice, setBuyPrice] = useState(0);
 const [initialPrice, setInitialPrice] = useState(0);
 const [totalPrice, setTotalPrice] = useState(0);
 
 function changePrice() {
  const staticTotal = calculatePriceOf(item);
  if (prevValue < inputValue) {
    setTotalPrice(staticTotal * inputValue);
    console.log(totalPrice);
    setBuyPrice(totalPrice);
  }
 }

 useEffect(() => {
  if (inputValue === 2) setInitialPrice(totalPrice); 
  setTotalPrice(inputValue * initialPrice);
  changePrice();
 }, [inputValue]);
 
 return (
  <div>
  <input type="number" min="0" max="15" value={inputValue} onChange={changeValue}/> 
  <p onChange={changePrice}>Total: ${inputValue === 0 ? "0.00" : buyPrice}</p>
  </div>
 );
}