import axios from "axios";
import { transformObject } from "../../../shared/utils/decode";
import { Bill } from "../types/billTypes";

const moneyURL = import.meta.env.VITE_MONEY_BACKEND_URL;

const getBillsByPubKey = async (pubKey: string): Promise<Bill> => {
  const response = await axios.get(`${moneyURL}/address/${pubKey}/bills`);
  const decodedData = response.data.map((bill: Bill) =>
    transformObject<Bill>(bill)
  );
  return decodedData;
};

export { getBillsByPubKey };
