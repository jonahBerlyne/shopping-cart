import React, { useState, useEffect } from 'react';

export default function ItemDetail ({match}) {

 useEffect(() => {
  fetchItem();
 }, []);

 const [item, setItem] = useState([]);

 const fetchItem = async () => {
  const itemData = await fetch(`https://fakestoreapi.com/products/${match.id}`);

  const item = await itemData.json();
  setItem(item);
 }

 return (
  <div>{item.title}</div>
 );
}