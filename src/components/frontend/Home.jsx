import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../services/api';
import { Link } from 'react-router-dom';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
          const response = await apiRequest(`${import.meta.env.VITE_API_BASE_URL}/products`);
          setProducts(response.data);
            console.log(response.data);
        
        };
    
        fetchProducts();
    }, []);

    // Add to Cart function
    const addToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token'); // Replace with your actual token retrieval method
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_id: productId })
            });

            const result = await response.json();
            console.log(result);
            
            if (response.ok) {
                setMessage(result.message);
            } else {
                setMessage('Failed to add product to cart.');
            }
        } catch (error) {
            setMessage(`An error occurred. Please try again. ${error}`);
        }
    };

    return (
        <div className="container mt-4">
            {message && <div className="alert alert-info">{message}</div>}
            <div className="row">
                {products.map(item => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        
                            <div className="card">
                                <img src={item.image_path || '/path/to/default/image.jpg'} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text"><strong>${item.price}</strong></p>
                                    <button onClick={() => addToCart(item.id)} className="btn btn-primary">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;