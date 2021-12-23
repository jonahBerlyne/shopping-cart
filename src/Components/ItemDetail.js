import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import { useParams } from 'react-router';
import calculatePriceOf from './Price';

export default function ItemDetail () {

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

 let totalPrice = calculatePriceOf(item);

 return (
  <div>
   <NavBar/>
   <br/>
   <h2>{item.title}</h2>
   <img src={item.image} alt={item.title} height="400px" width="400px"/>
   <br/>
   <br/>
   <br/>
   <p><label>Price: </label>${totalPrice}</p>
  </div>
 );
}