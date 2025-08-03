import React from "react";

export default function ItemCard({ item, onAddToCart }) {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition cursor-pointer bg-white">
      <h2 className="font-bold text-lg mb-2">{item.name}</h2>
      <p className="text-gray-600 mb-1">Price: ${item.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mb-3">Barcode: {item.barcode}</p>
      <button
        onClick={() => onAddToCart(item)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
