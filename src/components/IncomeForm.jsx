import React, { useState, useEffect } from "react";
import axios from "axios";

function IncomeForm({ income, setIncome }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        // Fetch income data from the API when the component mounts
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const response = await axios.get("http://localhost:3030/posts");
            setIncome(response.data);
        } catch (error) {
            console.error("Error fetching income data:", error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Post new income data to the API
            await axios.post("http://localhost:3030/posts", {
                description,
                amount,
                type,
                date,
            });

            // Fetch updated income data after submission
            fetchIncomes();

            // Clear form inputs after submission
            setDescription('');
            setAmount('');
            setType('');
            setDate('');
        } catch (error) {
            console.error("Error submitting income:", error);
        }
    };

    const onDelete = async (id) => {
        try {
            // Delete income data from the API
            await axios.delete(`http://localhost:3030/posts/${id}`);

            // Fetch updated income data after deletion
            fetchIncomes();
        } catch (error) {
            console.error("Error deleting income:", error);
        }
    }

    return (
        <div>
            <form className="income-form" onSubmit={onSubmit}>
                <div className="form-inner">
                    <input
                        type="text"
                        value={description}
                        name="description"
                        placeholder="Description..."
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        value={amount}
                        placeholder="Amount..."
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="custom-dropdown">
                        <option value="delect">Select Transaction</option>
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                    </select>

                    <input
                        type="date"
                        value={date}
                        placeholder="Date..."
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input type="submit" value="Add Transaction" />
                </div>
            </form>
            <div>
                <table className="income-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Transaction</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {income.map((item) => (
                            <tr key={item.id}>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>{item.type}</td>
                                <td>{item.date}</td>
                                <td>
                                    <button onClick={() => onDelete(item.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IncomeForm;
