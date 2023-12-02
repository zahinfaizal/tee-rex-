
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch store items using Axios
    axios.get('https://fakestoreapi.com/products')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const addToWishlist = (item) => {
    setWishlist([...wishlist, item]);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  const moveFromWishlistToCart = (item) => {
    setWishlist(wishlist.filter(wishItem => wishItem.id !== item.id));
    setCart([...cart, item]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>TeeRex TShirt Store</h1>
      <input type="text" placeholder="Search" onChange={handleSearch} />

      <div className="item-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="item">
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>${item.id}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
            <button onClick={() => addToWishlist(item)}>Add to Wishlist</button>
          </div>
        ))}
      </div>

     <div className='cart-container'>
        <div className="cart">
          <h2>Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.title}</p>
              <p>${item.id}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </div>
          ))}
        </div>
  
        <div className="wishlist">
          <h2>Wishlist</h2>
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <p>{item.title}</p>
              <p>${item.id}</p>
              <button onClick={() => moveFromWishlistToCart(item)}>Move to Cart</button>
            </div>
          ))}
        </div>
     </div>
    </div>
  );
};

export default App;
