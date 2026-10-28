import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const numericCost = parseFloat(item.cost.substring(1));
      total += numericCost * item.quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference (Coming Soon)');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.substring(1));
    return numericCost * item.quantity;
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: 'black', marginBottom: '20px' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '15px 0' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
            <div className="cart-item-details" style={{ flex: 1, marginLeft: '20px', textAlign: 'left' }}>
              <div className="cart-item-name" style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.name}</div>
              <div className="cart-item-cost" style={{ fontSize: '16px', color: '#555', margin: '5px 0' }}>Unit Price: {item.cost}</div>
              <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={{ padding: '5px 12px', fontSize: '16px', cursor: 'pointer' }}>-</button>
                <span className="cart-item-quantity-value" style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={{ padding: '5px 12px', fontSize: '16px', cursor: 'pointer' }}>+</button>
              </div>
              <div className="cart-item-total" style={{ fontSize: '16px', fontWeight: 'bold' }}>Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ marginTop: '10px', padding: '6px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)} style={{ width: '250px' }}>Continue Shopping</button>
        <button className="get-started-button1" onClick={handleCheckoutShopping} style={{ width: '250px', padding: '15px 30px', fontSize: '20px', border: 'none', borderRadius: '5px', backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
