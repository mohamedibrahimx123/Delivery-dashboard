import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useReducer, useCallback, useMemo } from "react";
import { orderContext } from "./orderContext";
import { fetchOrders } from "../services/orderServices";

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE':
      return state.filter(order => order.id !== action.payload);
    case 'UPDATE':
      return state.map(order =>
        order.id === action.payload.id ? action.payload : order
      );
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

const OrderProvider = ({ children }) => {
  const [orders, dispatch] = useReducer(orderReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddOrder = useCallback((newOrder) => {  
    dispatch({ type: 'ADD', payload: newOrder });
    toast.success('Order Added Successfully ✅');
  }, [dispatch]);

  const handleDeleteOrder = useCallback((orderId) => {
    dispatch({ type: "DELETE", payload: orderId });
    toast.error("Order Deleted ❌");
  }, [dispatch]);

  const handleEditOrder = useCallback((updatedOrder) => {  
    dispatch({ type: 'UPDATE', payload: updatedOrder });
    toast.info('Order Updated ✏️');
  }, [dispatch]);

  useEffect(() => {
    fetchOrders()
      .then(data => dispatch({ type: 'SET', payload: data }))
      .catch(() => setError('Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      orders,
      loading,
      error,
      handleAddOrder,
      handleDeleteOrder,
      handleEditOrder,
    }),
    [orders, loading, error, handleAddOrder, handleDeleteOrder, handleEditOrder]
  )

  return (
    <>
      <ToastContainer />
      <orderContext.Provider value={value}>{children}</orderContext.Provider>
    </>
  )
};

export default OrderProvider;