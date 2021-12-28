import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { useParams } from 'react-router';
import calculatePriceOf from './Price';
import AddToCart from './AddToCart';
import Cart from './Cart';
import { Link } from 'react-router-dom';

export default function ItemDetail () {

 const { id } = useParams();
//  const [arrProp] = useState([{name: 0}, {name: 1}]);

 useEffect(() => {
  fetchItem();
  return () => {
    setItem([]);
  } 
 }, []);

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

 let itemPrice = calculatePriceOf(item);

 return (
  <div>
   <NavBar/>
   <br/>
   {errorMessage && <h1>{errorMessage}</h1>}
   <h2>{item.title}</h2>
   <img src={item.image} alt={item.title} height="400px" width="400px"/>
   <br/>
   <br/>
   <br/>
   <h3>{item.description}.</h3>
   <br/>
   <br/>
   <br/>
   <h3><label>Price: </label>${itemPrice}</h3>
   <br/>
   {!errorMessage && <AddToCart/>}
  </div>
 );
}