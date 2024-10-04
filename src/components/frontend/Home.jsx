import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../services/api';

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
        <div>
            {products.map((row) => (
                <div key={row.id}>
                <h3>{row.name}</h3>
                <p>{row.price}</p>
                <button>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};
export default Home;