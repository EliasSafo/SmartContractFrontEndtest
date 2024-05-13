import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handlePayment = async () => {
        try {
            console.log("amt:", parseInt(amount))
            const response = await axios.post('http://127.0.0.1:8000/api/pay_money', {
                amt: parseInt(amount)
            });
            console.log("response:",response.data);
            // Add further handling or display of response data
        } catch (error) {
            console.error('Error:', error.response.data.error);
            // Add error handling/display
        }
    };

    return (
        <div>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
            />
            <button onClick={handlePayment}>Send</button>
        </div>
    );
};

export default PaymentForm;
