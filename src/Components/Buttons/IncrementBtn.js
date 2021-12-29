import React, { useState, useEffect } from 'react';

export default function IncrementBtn(props) {

 const {amount, id, onRefresh} = props;
 const [total, setTotal] = useState(amount);
 const [staticTotal] = useState(amount);

 function incrementTotal(total) {
  setTotal(total => total + 1);
 }

 useEffect(() => {
  let item = localStorage.getItem(id);
  item = JSON.parse(item);
  item.amount = total;
  item = JSON.stringify(item);
  localStorage.setItem(id, item);
  if (total !== staticTotal) onRefresh();
 }, [total]);

 return (
  <div>
   <button onClick={incrementTotal}>+</button>
  </div>
 );
}