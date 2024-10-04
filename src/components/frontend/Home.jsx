import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../services/api';
import { Link } from 'react-router-dom';

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const response = await apiRequest(`${import.meta.env.VITE_API_BASE_URL}/products`);
          setProducts(response.data);
            console.log(response.data);
        
        };
    
        fetchProducts();
      }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {products.map(item => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <Link to={`/products/${item.id}`}>
                            <div className="card">
                                <img src={item.image_path || '/path/to/default/image.jpg'} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text"><strong>${item.price}</strong></p>
                                    <Link to="/cart" className="btn btn-primary">Add to Cart</Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;