import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://dry-sea-66742.herokuapp.com/order?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrders(data));
    },[])
    return (
        <div>
            <h2>Email: {orders.email}</h2>
            <h5>You have {orders.length} orders</h5>
            {
                orders.map(order => <li>Product name: {order.name}, Order date: {order.bookingDate}, Price: {order.price}</li>)
            }
        </div>
    );
};

export default Order;