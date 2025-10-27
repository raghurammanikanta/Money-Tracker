// import React from 'react';
// import "./App.css"
// import { useState,useEffect } from 'react';
// import { response } from 'express';
// // const ul=import.meta.env.REACT_APP_URL;
// const API_URL = "http://localhost:4040/api"; 


// const App = () => {
//   const[name,setName]=useState("")
//   const[datetime,setDatetime]=useState("")
//   const[description,setDescription]=useState("")
//   const[transactions,setTransactions]=useState([])
//   const url = `${API_URL}/transaction`
//   useEffect(()=>{
//     getTransactions().then(transactions=>{
//       setTransactions(transactions)

//     })
    
//   })
//      async function getTransactions() {
//       const response = await fetch(url);
//       return await response.json();
      
//      } 
  
//     const addNewTransaction = async (e) => {
//     e.preventDefault();

//     // Example API URL — you can move this to .env later
    

//     // Optional: Validate input
//     if (!name || !datetime) {
//       alert('Please fill out all required fields');
//       return;
//     }

//     try {
//       const [normalprice, nameFromInput] = name.split(' ', 2);
//       const price=parseFloat(normalprice)
//       const response =await fetch(url,{
//         method:'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nameFromInput, price, datetime, description }),
//       });
      
//      await response.json(); 
//      setName('');
//      setDatetime('')
//      setDescription('')
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//    <main>
//     <h1> $400 <span>.00</span></h1>
//     <form onSubmit={addNewTransaction}>
//       <div className="basic">
//       <input type="text" placeholder='+200 televisiom'
//        id="transaction-name"
//       value={name}
//          onChange={e=>setName(e.target.value)} />
//       <input type="datetime-local"
//       value={datetime}
//       onChange={e=>setDatetime(e.target.value)} />
//       </div>
//       <div className="description">
      
//          <input type="text" placeholder='description'
//          name='description'
//          value={description}
//          onChange={e=>setDescription(e.target.value)} 
//          />
//       </div>
//       <button type="submit">Add a new transaction</button>
     
//     </form>
//    <div className="transactions">
//         {transactions.length > 0 && transactions.map((t) => (
//           <div className="transaction" key={t._id}>
//             <div className="left">
//               <div className="name">{t.nameFromInput}</div>
//               <div className="description">{t.description}</div>
//             </div>
//             <div className="right">
//               <div className="price">{t.price}</div>
//               <div className="datetime">{t.datetime}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//    </main>
//   )
// }

// export default App
import React from 'react';
import "./App.css";
import { useState, useEffect } from 'react';

const API_URL = "http://localhost:4040/api";

const App = () => {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Good: Initialize transactions as an empty array
  const [transactions, setTransactions] = useState([]);

  const url = `${API_URL}/transaction`;

  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions);
    });
  }, []); // ✅ Fixed: Add empty dependency array

  async function getTransactions() {
    try {
      const response = await fetch(url);
      
      // ✅ Check if response is OK before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return []; // Return empty array on error to prevent crash
    }
  }

  const addNewTransaction = async (e) => {
    e.preventDefault();

    if (!name || !datetime) {
      alert('Please fill out all required fields');
      return;
    }

    try {
      const [normalprice, nameFromInput] = name.split(' ', 2);
      const price = parseFloat(normalprice);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameFromInput, price, datetime, description }),
      });

      await response.json();

      setName('');
      setDatetime('');
      setDescription('');

      const updatedTransactions = await getTransactions();
      setTransactions(updatedTransactions);

    } catch (error) {
      console.error("Error:", error);
    }
  };
  let balance=0;
  for ( const trans of transactions){
    balance+=trans.price;
  }

  return (
    <main>
      <h1> {balance} <span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            placeholder='+200 television'
            id="transaction-name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={e => setDatetime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder='description'
            name='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add a new transaction</button>
      </form>
      {transactions.length}
      {/* ✅ Display fetched transactions */}
      <div className="transactions">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <div className="transaction" key={t._id || Math.random()}>
              <div className="left">
                <div className="name">{t.nameFromInput}</div>
                <div className="description">{t.description}</div>
              </div>
              <div className="right">
               <div className={`price bold ${t.price < 0 ? 'red' : 'green'}`}>{t.price}</div>
                <div className="datetime">{t.datetime}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No transactions found.</p> // ✅ Show fallback message
        )}
      </div>
    </main>
  );
};

export default App;