import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import './AddProducts.css'

const AddProducts = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
    const [manageProduct, setManageProduct] = useState(false);

    useEffect(() => {
        fetch('https://dry-sea-66742.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    const handleAddProduct = () => {
        addProduct ? setAddProduct(false) : setAddProduct(true);
        setManageProduct(false);
    }


    const handleManageProduct = () => {
        manageProduct ? setManageProduct(false) : setManageProduct(true);
        setAddProduct(false);
    }

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
            .then(res => alert('Product Uploaded'))
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
                // console.log('delete successfully');
                alert('Product delete successfully ');
            })
    }

    return (
        <div className="row mt-5">
            <div className="col-sm-4 border side-bar py-5">
                <div className="d-flex flex-column text-center">
                    <h5 className="side-bar-menu"><a onClick={handleAddProduct}>Add Product</a></h5>
                    <h5 className="side-bar-menu"><a onClick={handleManageProduct}>Manage Product</a></h5>
                </div>
            </div>

            {
                addProduct && (
                    <div className="col-sm-8">
                        <div className="text-center m-3">
                            <form className="border p-4 form-style" onSubmit={handleSubmit(onSubmit)}>
                                <input className="m-1" name="name" placeholder="product name" ref={register} />
                                <br />
                                <input className="m-1" name="wight" placeholder="wight" ref={register({ required: true })} />
                                <br />
                                <input className="m-1" name="price" placeholder="price" ref={register({ required: true })} />
                                <br />
                                <input className="m-1" name="price" type="file" onChange={handleImageUpload} />
                                <br />
                                <input className="btn btn-primary" type="submit" />
                            </form>
                        </div>
                    </div>
                )
            }

            {
                manageProduct && (
                    <div className="col-sm-8">
                        <div className="d-flex flex-column text-center bd-highlight mb-3 p-5">
                            {
                                products.map(pd => <div className="p-4 bd-highlight mx-5 my-2 border allProduct-style">Name: <b>{pd.name}</b>, Wight: <b>{pd.wight}</b>, Price: <b>{pd.price}</b> <button className="btn btn-primary" onClick={() => handleDelete(pd._id)}>Delete</button></div>)
                            }
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default AddProducts;