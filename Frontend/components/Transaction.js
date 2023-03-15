import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '₹ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '')
  );
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  // const sign = transaction.Amount < 0 ? '-' : '+';

  return (
    <li className={transaction.Amount < 0 ? 'minus' : 'plus'}>
      {transaction.Title} <span>{moneyFormatter(transaction.Amount)}</span><button onClick={() => deleteTransaction(transaction.Title)} className="delete-btn">x</button>
    </li>
  )
}
