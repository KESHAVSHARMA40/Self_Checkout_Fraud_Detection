import React from "react";

export default function Cart({ cartItems, onRemove }) {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="border rounded-md p-4 shadow bg-white">
      <h2 className="font-bold text-xl mb-4">Shopping Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            {item.name} - ${item.price.toFixed(2)}
          </div>
          <button
            onClick={() => onRemove(idx)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            Remove
          </button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-4 font-bold text-lg">Total: ${total.toFixed(2)}</div>
      )}
    </div>
  );
}
