import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Order.css'

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://dry-sea-66742.herokuapp.com/order?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [])
    return (
        <div className="text-center mt-5">
            {
                orders.length === 0 && <div>
                    <div class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            }
            <h5>You have {orders.length} orders</h5>
            <div className="d-flex flex-column text-center bd-highlight mb-3 p-5">
                {
                    orders.map(order => <div className="p-4 bd-highlight mx-5 my-2 border order-style">Product name: <b>{order.name}</b>, Order date: <b>{order.bookingDate}</b>, Price: <b>{order.price}</b></div>)
                }
            </div>
        </div>
    );
};

export default Order;