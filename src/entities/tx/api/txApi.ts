import axios from "axios";
import { Tx } from "../types/txTypes";
import { transformObject } from "../../../shared/utils/decode";
import { isTest } from "../../../app/config";
import { getTxsTest } from "./txApiTest";

const moneyURL = import.meta.env.VITE_MONEY_BACKEND_URL;

const getTx = async (txHash: string): Promise<Tx> => {
  const response = await axios.get(`${moneyURL}/txs/${txHash}`);
  const decodedData = transformObject<Tx>(response.data);
  return decodedData;
};
const getTxsReal = async (startTxHash?: bigint, limit?: number): Promise<Tx[]> => {
  const response = await axios.get(`${moneyURL}/txs`, {
    params: { startTxHash, limit },
  });
  const decodedData = response.data.map((tx: Tx) => transformObject<Tx>(tx));
  return decodedData;
};

const getTxs = isTest? getTxsTest : getTxsReal;

const getBlockTxsByBlockNumber = async (blockNumber: number): Promise<Tx[]> => {
  const response = await axios.get(`${moneyURL}/blocks/${blockNumber}/txs`);
  const decodedData = response.data.map((tx: Tx) => transformObject<Tx>(tx));
  return decodedData;
};

const getTxsByUnitID = async (unitID: string): Promise<Tx[]> => {
  const response = await axios.get(`${moneyURL}/units/${unitID}/txs`);
  const decodedData = response.data.map((tx: Tx) => transformObject<Tx>(tx));
  return decodedData;
};

export { getTx, getTxs, getBlockTxsByBlockNumber, getTxsByUnitID };
