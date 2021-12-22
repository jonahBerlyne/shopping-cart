import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./Navbar";

export default function Shop () {

 useEffect(() => {
  fetchItems();
 }, []);

 const [items, setItems] = useState([]);

 const fetchItems = async () => {
  const data = await fetch("https://fakestoreapi.com/products");

  const items = await data.json();
  console.log(items);
  setItems(items);
 };

 return (
  <div>
   <NavBar/>
   <br/>
   {items.map(item => 
   <div key={item.id}>
     <h4>{item.title}</h4> 
     <Link to={`/shop/${item.id}`}><img src={item.image} alt={item.title} height="150px" width="150px"/></Link>
     <br/>
     <br/>
     <br/>
     <p><label>Price: </label>${item.price.toFixed(2)}</p>
   </div>)}
  </div>
 );
}