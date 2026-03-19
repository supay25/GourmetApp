import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i._id === product._id)
      if (existing) {
        return prev.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i._id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id)
    setItems(prev => prev.map(i => i._id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}