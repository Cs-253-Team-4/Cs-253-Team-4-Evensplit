import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '₹ ' + (p[0].split('')[0]=== '-' ? '-' : '') +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '')
  );
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <>
    <div className='flex justify-center text-xl font-semibold text-gray-500'>
      <h1>Your Balance {moneyFormatter(total)}</h1>
    </div>
    </>
  )
}
