import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';
import './Booking.css'

const Booking = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const { id } = useParams();
    const [checkOut, setCheckOut] = useState([]);
    useEffect(() => {
        fetch(`https://dry-sea-66742.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setCheckOut(data));
    }, [id]);

    const { name, price, wight } = checkOut;

    const handleCheckout = () => {
        const bookingDate = new Date().toDateString('dd/MM/yyyy');
        const newOrder = { bookingDate, ...loggedInUser, name, price };
        fetch('https://dry-sea-66742.herokuapp.com/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                alert('You bought this product');
            });
        history.push('/orders')
    }

    return (
        <div className="text-center m-5">
            <div className="p-5 border booking-style">
                <h5>Product name: <b>{name}</b></h5>
                <h5>Wight: <b>{wight}</b></h5>
                <h5>Quantity: <b>1</b></h5>
                <h2>Price: ${price}</h2>
                <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};

export default Booking;