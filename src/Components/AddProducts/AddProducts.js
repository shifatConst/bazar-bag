import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const AddProducts = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const[products, setProducts] = useState([]);
    // const {name, wight, price} = products;

    useEffect(() => {
        fetch('https://dry-sea-66742.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    },[])

    const onSubmit = data => {
        const productData = {
            name: data.name,
            wight: data.wight,
            price: data.price,
            imageURL: imageURL
        };

        const url = `https://dry-sea-66742.herokuapp.com/addProduct`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res => console.log('server side response', res))
    };

    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '763892cb50d79b3e8919930228c785b3');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDelete = (id) => {
        fetch(`https://dry-sea-66742.herokuapp.com/deleteProduct/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log('delete successfully');
        })
        // console.log('clicked', id);
    }

    return (
        <div>
            <h1>Add your product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue="test" placeholder="name" ref={register} />
                <br />
                <input name="wight" placeholder="wight" ref={register({ required: true })} />
                <br />
                <input name="price" placeholder="price" ref={register({ required: true })} />
                <br />
                <input name="price" type="file" onChange={handleImageUpload} />
                <br />
                <input type="submit" />
            </form>

            {
                products.map(pd => <li>Name: {pd.name}, Wight: {pd.wight}, Price: {pd.price} <button onClick={() => handleDelete(pd._id)}>Delete</button></li>)
            }

        </div>
    );
};

export default AddProducts;