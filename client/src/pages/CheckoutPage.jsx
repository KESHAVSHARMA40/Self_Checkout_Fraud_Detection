import React, { useState } from "react";
import "./CheckoutPage.css";

const mockProducts = [
  { id: 1, name: "Apple", price: 1.25 },
  { id: 2, name: "Bread", price: 2.75 },
  { id: 3, name: "Milk", price: 3.49 },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const alreadyScanned = cart.find((item) => item.id === product.id);
    if (alreadyScanned) {
      alert("⚠️ This item was already scanned! Possible double scan.");
      return;
    }
    setCart([...cart, product]);
  };

  const handleRemove = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // Checkout button handler
  const handleCheckout = async () => {
    console.log("Checkout clicked!");
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    try {
      const response = await fetch("/api/saveTransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, total }),
      });

      if (response.ok) {
        alert("Transaction saved successfully!");
        setCart([]);
      } else {
        alert("Failed to save transaction.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving transaction.");
    }
  };


  return (
    <div className="container">
      <h1 className="title">🛒 Walmart Self-Checkout</h1>

      <div className="products-grid">
        {mockProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="btn scan-btn" onClick={() => addToCart(product)}>
              Scan
            </button>
          </div>
        ))}
      </div>

      <div className="cart-screen">
        <h2 className="cart-title">🧾 Scanned Items</h2>
        <ul className="cart-items">
          {cart.length === 0 && <p className="empty-text">No items scanned.</p>}
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <button
                className="btn remove-btn"
                onClick={() => handleRemove(index)}
                title="Remove item"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <div className="cart-actions">
          <button onClick={handleCheckout}>Checkout</button>
          <button className="btn clear-btn" onClick={() => setCart([])}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
