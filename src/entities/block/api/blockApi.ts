import axios from 'axios';
import { Block } from '../types/blockTypes';

const moneyURL = import.meta.env.VITE_MONEY_BACKEND_URL;

const getBlock = async (blockNumber: string) : Promise<Block> => {
    const response = await axios.get(`${moneyURL}/blocks/${blockNumber}`);
    return response.data;
  }
const getBlocks = async (startBlock?: number, limit?: number) : Promise<Block[]> => {
  const response = await axios.get(`${moneyURL}/blocks`, {
    params: { startBlock, limit }
  });
  return response.data;
};

export { getBlock, getBlocks };