import { useContext } from "react";
import { orderContext } from "../context/orderContext";

const useOrders = () => {
  const context =  useContext(orderContext);

  if(!context) {
    throw new Error ('useOrders must be used inside OrderProvider');
  }
  return context;
};
export default useOrders