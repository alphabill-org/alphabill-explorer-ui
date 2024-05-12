import axios from "axios";
import { Block, Header, UnicityCertificate } from "../types/blockTypes";
import { transformObject } from "../../../shared/utils/decode";
import { isTest } from "../../../app/config";
import { getBlocksTest } from "./blockApiTest";

const moneyURL = import.meta.env.VITE_MONEY_BACKEND_URL;

const getBlock = async (blockNumber: string): Promise<Block> => {
  const response = await axios.get(`${moneyURL}/blocks/${blockNumber}`);
  const data = response.data;

  const transformedHeader: Header = transformObject<Header>(data.Header);
  const transformedUnicityCertificate: UnicityCertificate =
    transformObject<UnicityCertificate>(data.UnicityCertificate);

  return {
    Header: transformedHeader,
    TxHashes: data.TxHashes, // Assuming TxHashes needs no transformation
    UnicityCertificate: transformedUnicityCertificate,
  };
};

const getBlocksReal = async (
  startBlock?: string,
  limit?: number
): Promise<Block[]> => {
  const response = await axios.get(`${moneyURL}/blocks/`, {
    params: { startBlock, limit },
  });
  const decodedData = response.data.map((block : Block) => {
    
    const transformedHeader: Header = transformObject<Header>(block.Header);
    const transformedUnicityCertificate: UnicityCertificate =
      transformObject<UnicityCertificate>(block.UnicityCertificate);

    return {
      Header: transformedHeader,
      TxHashes: block.TxHashes,
      UnicityCertificate: transformedUnicityCertificate,
    };
  });
  return decodedData;
};
const getBlocks = isTest ? getBlocksTest : getBlocksReal;
export { getBlock, getBlocks };
