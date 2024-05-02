import axios from 'axios';
import { Block } from '../types/blockTypes';
import { transformObject } from '../../../shared/utils/decode';

const moneyURL = import.meta.env.VITE_MONEY_BACKEND_URL;

const getBlock = async (blockNumber: string) : Promise<Block> => {
    const response = await axios.get(`${moneyURL}/blocks/${blockNumber}`);
    const decodedData = transformObject<Block>(response.data)
    return decodedData;
  }
const getBlocks = async (startBlock?: number, limit?: number) : Promise<Block[]> => {
  const response = await axios.get(`${moneyURL}/blocks`, {
    params: { startBlock, limit }
  });
  const decodedData = response.data.map((block: Block) => transformObject<Block>(block));
  return decodedData;
};

export { getBlock, getBlocks };