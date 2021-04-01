import React, { useEffect, useState } from 'react';
import AllProducts from '../AllProducts/AllProducts';

const Home = () => {
    const [products, setProducts] = useState([]);
    const api = "https://dry-sea-66742.herokuapp.com/products";
    useEffect(() => {
        fetch(api)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])
    return (
        <div className="container">
            <h3>Total Products: {products.length}</h3>
            <div className="row">
                {
                    products.map(product => <AllProducts product={product} />)
                }
            </div>
        </div>
    );
};

export default Home;