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
        <div className="container text-center mt-5">
            {
                products.length === 0 && <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            }

            <div className="row">
                {
                    products.map(product => <AllProducts product={product} />)
                }
            </div>
        </div>
    );
};

export default Home;