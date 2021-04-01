import React, { useState } from 'react';
import { useHistory } from 'react-router';

const AllProducts = (props) => {
    const history = useHistory();
    const { name, wight, price, imageURL, _id } = props.product;
    const [order, setOrder] = useState([]);
    const handleOrder = (id) => {
        history.push(`/booking/${id}`)
    }
    return (
        <div className="col-sm-4 mt-3">
            <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top" src={imageURL} alt="Card image cap" />
                    <div className="card-body">
                        <h4 className="card-text">{name} - {wight}</h4>
                        <h1>${price}</h1>
                        <button onClick={() => handleOrder(_id)} className="btn btn-primary">Buy Now</button>
                    </div>
            </div>
        </div>
    );
};

export default AllProducts;