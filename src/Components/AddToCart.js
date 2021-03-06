import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function AddToCart( {initialPrice} ) {

 const { id } = useParams();
 
 const [item, setItem] = useState([]);
 const [error, setError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 
 const fetchItem = async () => {
  try {
   const itemData = await fetch(`https://fakestoreapi.com/products/${id}`);
   const item = await itemData.json();
   setItem(item);
   setError('');
  } catch (err) {
    setError(err);
    setErrorMessage(`Sorry! You have an error: ${err}`);
  }
 }

 useEffect(() => {
  if (error == '') setErrorMessage('');
 });

 useEffect(() => {
  fetchItem();
  let storedItem = localStorage.getItem(id);
  storedItem = JSON.parse(storedItem);
  if (storedItem !== null) setNumItems(parseInt(storedItem.amount));
  return () => {
    setItem([]);
  } 
 }, []);
 
 const [numItems, setNumItems] = useState(0);
 const [totalPrice, setTotalPrice] = useState(0);

 
 const addToCart = () => setNumItems(numItems + 1);

 useEffect(() => {
  if (numItems !== 0) setTotalPrice(initialPrice * numItems);
 }, [numItems]);

 useEffect(() => {
  if (totalPrice > 0) addToLocalStorage(item.id, item.image, numItems, item.title, totalPrice);
 }, [totalPrice]);

 const addToLocalStorage = (idNum, itemImage, numItems,itemTitle, itemPrice) => {
   if (idNum === undefined) return;
   let data = localStorage.getItem(idNum);
   data = data ? JSON.parse(data) : {};
   const id = "id";
   data[id] = idNum;
   const amount = "amount";
   data[amount] = numItems;
   const image = "image";
   data[image] = itemImage;
   const initial = "initial";
   data[initial] = initialPrice;
   const name = "name";
   data[name] = itemTitle;
   const price = "price";
   data[price] = itemPrice.toFixed(2);
   localStorage.setItem(idNum, JSON.stringify(data));
   setAdded(true);
   setTimeout(() => {
     setAdded(false);
   }, 1000);
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