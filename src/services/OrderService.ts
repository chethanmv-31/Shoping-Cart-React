import axios from "axios";
import constants from "../constants";
import StorageService from "./StorageService";

const createOrder = (amount: number, productId: number) => {
  const url = `${constants.BASE_URL}/order`;
  return StorageService.getData("token").then((token) =>
    axios.post(
      url,
      { amount, productId },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );
};

const createPayment = (paymentAmount:any, paymentMode:any) => {
  const url = `${constants.BASE_URL}/order`;
  return StorageService.getData("token").then((token) =>
    axios.post(
      url,
      { paymentAmount,paymentMode },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );
};
export default { createOrder, createPayment };