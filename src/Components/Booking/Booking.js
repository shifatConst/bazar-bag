import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';

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

    const  {name, price, wight} = checkOut;

    const handleCheckout = () => {
        const bookingDate = new Date().toDateString('dd/MM/yyyy');
        const newOrder = { bookingDate, ...loggedInUser, name, price };
        fetch('https://dry-sea-66742.herokuapp.com/checkout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrder)
        })
        .then(res => res.json())
        .then( data => {
            console.log(data);
        });
        history.push('/orders')      
    }

    return (
        <div>
            <h5>Product name: {name}</h5>
            <h5>Wight: {wight}</h5>
            <h3>Price: {price}</h3>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Booking;