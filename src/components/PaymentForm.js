import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [account, setAccount] = useState('');
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                try {
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const checksumAddress = web3Instance.utils.toChecksumAddress(accounts[0]);
                    setAccount(checksumAddress);

                    // Listen for account changes
                    window.ethereum.on('accountsChanged', (accounts) => {
                        const checksumAddress = web3Instance.utils.toChecksumAddress(accounts[0]);
                        setAccount(checksumAddress);
                    });
                } catch (error) {
                    console.error("Error fetching accounts:", error);
                }
            } else {
                console.error("MetaMask is not installed or not connected");
            }
        };

        initWeb3();
    }, []);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handlePayment = async () => {
        try {
            if (!web3) {
                console.error("Web3 not initialized");
                return;
            }

            if (!account) {
                console.error("MetaMask account not found");
                return;
            }

            console.log("Sender Account:", account);
            console.log("Amount:", parseInt(amount));

            // Send the transaction details to the backend
            const response = await axios.post('http://0.0.0.0:8000/api/pay_money', {
                sender: account,
                receiver: '0x5de00abBd8151bD9e6e7D05e5dDd5F3ef695307F',  // Replace with actual receiver address
                amt: parseInt(amount)
            });

            console.log("Response:", response.data);
            // Add further handling or display of response data
        } catch (error) {
            console.error('Error:', error.response ? error.response.data.error : error.message);
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
            {account && <p>Transaction will be sent from: {account}</p>}
        </div>
    );
};

export default PaymentForm;
