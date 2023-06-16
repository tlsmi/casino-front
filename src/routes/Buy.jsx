import React, { useState } from 'react';

const BuyForm = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedOption !== '') {
            const endpoint = `http://localhost:8080/buy/${selectedOption}`;
            console.log('Sending request to:', endpoint);

            const formData = new FormData(event.target);
            const cardNumber = formData.get('cardNumber');
            const expirationDate = formData.get('expirationDate');
            const pin = formData.get('pin');
            const owner = formData.get('owner');
            const billingAddress = formData.get('billingAddress');

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
                } else {
                    console.log('Purchase failed. Please try again.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            console.log('Please select an option.');
        }
    };

    return (
        <div className='divform' id='buy'>
            <h1>Buy Credits</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="option1">4.99€ - 575c
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
                <div>
                    <label htmlFor="option2">10.99€ - 1380c
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
                <div>
                    <label htmlFor="option3">21.99€ - 2800c
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
                <div>
                    <label htmlFor="option4">49.99€ - 6500c
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
                <div>
                    <label htmlFor="option5">99.99€ - 13500c
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
                <label htmlFor="cardNumber">Card Number:
                    <input type="text" id="cardNumber" name="cardNumber" required />
                </label>
                <label htmlFor="expirationDate">Expiration Date:
                    <input type="date" id="expirationDate" name="expirationDate" required />
                </label>
                <label htmlFor="pin">PIN:
                    <input type="password" id="pin" name="pin" required />
                </label>
                <label htmlFor="owner">Owner:
                    <input type="text" id="owner" name="owner" required />
                </label>
                <label htmlFor="billingAddress">Billing Address:
                    <textarea id="billingAddress" name="billingAddress" required />
                </label>
                <button type="submit">Buy Now</button>
            </form>
        </div>
    );
};

export default BuyForm;
