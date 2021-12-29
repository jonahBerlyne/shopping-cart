import React, { useState, useEffect } from 'react';

export default function IncrementBtn(props) {

 const {onClickFunc, amount} = props;

 // let item = localStorage.getItem(id);
 // item = JSON.parse(item);
 // item.amount = total;
 // item = JSON.stringify(item);
 // localStorage.setItem(id, item);
 // onRefresh();

 return (
  <div>
   <button onClick={() => onClickFunc(amount)}>+</button>
  </div>
 );
}