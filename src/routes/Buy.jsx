import React, { useState } from 'react';

const BuyForm = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedOption !== '') {
            const endpoint = `https://casino.z101.alumnes-esliceu.tk/buy/${selectedOption}`;
            console.log('Sending request to:', endpoint);

            const formData = new FormData(event.target);
            const cardNumber = formData.get('cardNumber');
            const expirationDate = formData.get('expirationDate');
            const pin = formData.get('pin');
            const owner = formData.get('owner');
            const billingAddress = formData.get('billingAddress');

            // Perform field validations
            const cvv = pin.toString();
            const cardCode = cardNumber.toString();
            const isValidCVV = cvv.length <= 4;
            const isValidCardCode = cardCode.length === 24;

            if (!isValidCVV) {
                console.log('Invalid CVV. Maximum length is 4.');
                setMessage('Invalid CVV. Maximum length is 4.');
                return;
            }

            if (!isValidCardCode) {
                console.log('Invalid Card Code. Length should be exactly 24.');
                setMessage('Invalid Card Code. Length should be exactly 24.');
                return;
            }

            const requestData = {
                cardNumber,
                expirationDate,
                pin,
                owner,
                billingAddress,
            };

            try {
                const token = sessionStorage.getItem('token');

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(requestData),
                });

                if (response.ok) {
                    console.log('Purchase successful!');
                    setMessage('Compra realizada');
                } else {
                    console.log('Purchase failed. Please try again.');
                    setMessage('Compra Fallida');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            console.log('Please select an option.');
            setMessage('Please select an option.');
        }
    };
    return (
        <div className='divform' id='buy'>
            <h1>Buy Credits</h1>
            <form onSubmit={handleSubmit}>
                {/* Código de opciones de crédito */}
                <div id='precio'>
                    <label htmlFor="option1" className='precio'>4.99€ - 575c
                        <input
                            type="radio"
                            id="option1"
                            name="creditOption"
                            value="575"
                            checked={selectedOption === '575'}
                            onChange={handleOptionChange}
                        />
                    </label>
                </div>
                <div id='precio'>
                    <label htmlFor="option2" className='precio'>10.99€ - 1380c
                        <input
                            type="radio"
                            id="option2"
                            name="creditOption"
                            value="1380"
                            checked={selectedOption === '1380'}
                            onChange={handleOptionChange}
                        />
                    </label>
                </div>
                <div id='precio'>
                    <label htmlFor="option3" className='precio'>21.99€ - 2800c
                        <input
                            type="radio"
                            id="option3"
                            name="creditOption"
                            value="2800"
                            checked={selectedOption === '2800'}
                            onChange={handleOptionChange}
                        />
                    </label>
                </div>
                <div id='precio'>
                    <label htmlFor="option4" className='precio'>49.99€ - 6500c
                        <input
                            type="radio"
                            id="option4"
                            name="creditOption"
                            value="6500"
                            checked={selectedOption === '6500'}
                            onChange={handleOptionChange}
                        />
                    </label>
                </div>
                <div id='precio'>
                    <label htmlFor="option5" className='precio'>99.99€ - 13500c
                        <input
                            type="radio"
                            id="option5"
                            name="creditOption"
                            value="13500"
                            checked={selectedOption === '13500'}
                            onChange={handleOptionChange}
                        />
                    </label>
                </div>
                
                {/* Campo Card Number */}
                <label htmlFor="cardNumber">Card Number:
                    <input type="text" id="cardNumber" name="cardNumber" required />
                </label>
                
                {/* Campo Expiration Date */}
                <label htmlFor="expirationDate">Expiration Date (MM/YYYY):
                    <input type="month" id="expirationDate" name="expirationDate" required />
                </label>
                
                {/* Campo CVV */}
                <label htmlFor="pin">CVV:
                    <input type="password" id="pin" name="pin" required />
                </label>
                
                {/* Campo Owner */}
                <label htmlFor="owner">Owner:
                    <input type="text" id="owner" name="owner" required />
                </label>
                
                {/* Campo Billing Address */}
                <label htmlFor="billingAddress">Billing Address:
                    <textarea id="billingAddress" name="billingAddress" required />
                </label>
    
                <p>{message}</p>
                
                {/* Botón de submit */}
                <button type="submit">Buy Now</button>
            </form>
        </div>
    );
    };
    export default BuyForm;