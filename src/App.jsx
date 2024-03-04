import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import IncomeForm from "./components/IncomeForm";
import axios from "axios";

function App() {
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState('');

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/posts");
      setIncome(response.data);

      // Calculate total income
      const total = response.data.reduce((acc, transaction) => {
        return transaction.type === 'Income' ? acc + parseFloat(transaction.amount) : acc - parseFloat(transaction.amount);
      }, 0); // Initialize acc with 0

      // Initialize totalIncome with the calculated total
      setTotalIncome(total);
      fetchInitialData()

    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };


  const updateTotalIncome = (amount, type) => {
    setTotalIncome((prevTotal) => {
      const numericAmount = parseFloat(amount);
      return type === 'Income' ? prevTotal + numericAmount : prevTotal - numericAmount;
    });
  };


  return (
    <div className="App">
      <Header totalIncome={totalIncome} />
      <IncomeForm income={income} setIncome={setIncome} updateTotalIncome={updateTotalIncome} />
    </div>
  );
}

export default App;
