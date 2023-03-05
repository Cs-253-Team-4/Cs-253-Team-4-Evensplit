import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('₹');

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-control align-center justify-center flex m-2">
          {/* <label htmlFor="text" className='mr-3'>Text</label> */}
          <input className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-5 mb-2" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add new expense...." />
        </div>
        <div className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-5 mb-4 form-control">
          <label htmlFor="amount" className='pr-4'>
            Amount
          </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="₹ Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}
