import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import calculatePriceOf from "./Price";

export default function AddToCart() {
 const { id } = useParams();

 useEffect(() => {
  fetchItem();
 }, []);

 const [item, setItem] = useState([]);

 async function fetchItem () {
  const itemData = await fetch(`https://fakestoreapi.com/products/${id}`);

  const item = await itemData.json();
  setItem(item);

 }

 const [stock, setStock] = useState(0);
 let totalPrice = calculatePriceOf(item);

 async function determineStock() {
  if (totalPrice < 100) {
   setStock((item.id * 5) + 40);
  } else if (100 <= totalPrice && totalPrice < 300) {
   setStock((item.id * 4) + 20);
  } else if (300 <= totalPrice && totalPrice < 600) {
   setStock((item.id * 3) + 3);
  } else if (600 <= totalPrice && totalPrice < 900) {
   setStock((item.id * 2) + 2);
  } else {
   setStock((item.id) + 1);
  }
 }

 const max = stock;

 // Come back and work out the logic tomorrow:
 useEffect(() => {
  decrementStock();
 }, [stock]);

 function decrementStock() {
  setStock(stock => stock - 1);
 }

 return (
  <div>
   <h3>{stock} in stock!</h3>
   <br/>
   <input type="number" min="1" max={max} onChange={decrementStock}/>
  </div>
 );
}