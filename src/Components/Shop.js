import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./Navbar";
import calculatePriceOf from './Price';
import Cart from './Cart';

export default function Shop () {

 useEffect(() => {
  console.log("mounted");
  fetchItems();
  return () => {
    console.log("unmounted");
    setItems([]);
  } 
 }, []);
 
 const [items, setItems] = useState([]);
 const [error, setError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 
 const fetchItems = async () => {
  try {
    const data = await fetch("https://fakestoreapi.com/products");
    console.log("fetched");
    const items = await data.json();
    console.log(items);
    setItems(items);
    setError('');
  } catch (err) {
    setError(err);
    setErrorMessage("Sorry! You have an error: " + err);
  }
 };

 useEffect(() => {
  if (error == '') setErrorMessage('');
 });

 return (
  <div>
   <NavBar/>
   <br/>
   {errorMessage && <h1>{errorMessage}</h1>}
   {/* {!errorMessage && <Cart/>} */}
   <br/>
   <br/>
   {!errorMessage && <h1>Buy:</h1>}
   {items.map(item => { 
    let itemPrice = calculatePriceOf(item); 
    
    return (<div key={item.id}>
     <h4>{item.title}</h4> 
     <Link to={`/shop/${item.id}`}><img src={item.image} alt={item.title} height="150px" width="150px"/></Link>
     <br/>
     <br/>
     <br/>
     <p><label>Price: </label>${itemPrice}</p>
   </div>)}
   )}
  </div>
 );
}