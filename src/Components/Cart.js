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

 const [inputValue, setInputValue] = useState(0);
 
 function changeValue(e) {
  setInputValue(parseInt(e.target.value));
 }
 
 const [buyPrice, setBuyPrice] = useState(0);
 const [totalPrice, setTotalPrice] = useState(0);

 useEffect(() => {
  const staticTotal = calculatePriceOf(item);
  setTotalPrice(staticTotal * inputValue);
 }, [inputValue]);

 useEffect(() => {
  setBuyPrice(totalPrice);
 }, [totalPrice]);
 
 return (
  <div>
  <input type="number" min="0" max="15" value={inputValue} onChange={changeValue}/> 
  <p>Total: ${inputValue === 0 ? "0.00" : buyPrice}</p>
  </div>
 );
}