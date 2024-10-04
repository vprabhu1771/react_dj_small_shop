import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);

    const [message, setMessage] = useState(""); // State for storing messages

    // Function to fetch cart items
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/cart`, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const cartResponse = await response.json();
            setCartItems(cartResponse.data); // Store cart items in state
          } else {
            setMessage('Failed to fetch cart information');
            console.error('Failed to fetch cart information');
          }
        } catch (error) {
          setMessage('Error fetching cart information');
          console.error('Error fetching cart information:', error);
        }
      }
    };

    useEffect(() => {
      fetchCartItems(); // Fetch cart items when the component mounts
    }, []);

    const apiRequest = async (endpoint, method, id, action) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: method,
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: id, // Correctly stringify the body
          action: action
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.statusText}`);
      }
      return response.json();
    };

    const incrementQty = async (item) => {
      try {
        const updatedItem = await apiRequest('/cart/item/', 'PATCH', item.id, "increase");
        // setCartItems((prevItems) =>
        //   prevItems.map((prevItem) => (prevItem.id === item.id ? updatedItem : prevItem))
        // );      
              
        setMessage(updatedItem.message);
        fetchCartItems(); // Refresh cart items after decrement
      } catch (error) {
        setMessage(`Error incrementing quantity: ${error.message}`); // Set error message
        console.error('Error incrementing quantity:', error);
      }
    };
    
    const decrementQty = async (item) => {
      try {
        const updatedItem = await apiRequest('/cart/item/', 'PATCH', item.id, "decrease");
        // setCartItems((prevItems) =>
        //   prevItems.map((prevItem) => (prevItem.id === item.id ? updatedItem : prevItem))
        // );
        setMessage(updatedItem.message);
        
        fetchCartItems(); // Refresh cart items after decrement
      } catch (error) {
        setMessage(`Error decrementing quantity: ${error.message}`); // Set error message
        console.error('Error decrementing quantity:', error);
      }
    };

    const removeProduct = async (item) => {
      try {
        const response = await apiRequest(`/cart/item/`, 'DELETE', item.id);
        
        // setCartItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== item.id));
        setMessage(response.message || "Item removed from your cart."); // Set success message
        fetchCartItems(); // Refresh cart items after decrement
      } catch (error) {
        setMessage(`Error removing product: ${error.message}`); // Set error message
        console.error('Error removing product:', error);
      }
    };

    const clearCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/clear-cart`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          }        
        });
        setMessage(response.message); // Set success message
        fetchCartItems(); // Refresh cart items after decrement
      } catch (error) {
        setMessage(`Error removing product: ${error.message}`); // Set error message
        console.error('Error removing product:', error);
      }
    };

    return (
        <div>
            {message && <p>{message}</p>} {/* Display the message if it exists */}
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                <div key={item.id}>  {/* Ensure item.id is unique */}
                    <button onClick={() => clearCart()}>Clear Cart</button>
                    <h3>{item.product_name}</h3>
                    <p>Quantity: {item.qty}</p>
                    <button onClick={() => incrementQty(item)}>+</button>
                    <button onClick={() => decrementQty(item)}>-</button>
                    <button onClick={() => removeProduct(item)}>Remove</button>
                </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        
        </div>
    );
};

export default Cart;