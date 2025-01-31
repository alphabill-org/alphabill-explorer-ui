import axios from "axios";
import {BlockDTO, Block} from "../types/blockTypes";
import {transformObject} from "../../../shared/utils/decode";
import {isTest} from "../../../app/config";
import {getBlocksTest} from "./blockApiTest";
import {UnicityCertificate} from "@alphabill/alphabill-js-sdk/lib/unit/UnicityCertificate";
import {Base16Converter} from "@alphabill/alphabill-js-sdk/lib/util/Base16Converter";

const moneyURL = import.meta.env.VITE_MONEY_BACKEND_URL;

const getSingleBlock = async (partitionID: number, blockNumber: string): Promise<Block> => {

    const response = await axios.get(`${moneyURL}/blocks/${blockNumber}`, {
        params: {partitionID: `${partitionID}`},
    });
    const data = response.data;
    if (!data || data.length === 0) {
        throw new Error("Block data not found");
    }
    for (const key in data) {
        if (key === `${partitionID}`) {
            return transformBlock(transformObject<BlockDTO>(data[key]));
        } else
            console.log("key not equal to given partitionID:", key);
    }
    throw new Error("Block data not found");
};

const getBlocksRange = async (
    partitionID: number,
    startBlock?: string,
    limit?: number
): Promise<Block[]> => {
    startBlock = startBlock === "latest" || startBlock === "-1" ? "" : `${startBlock}`;
    const response = await axios.get(`${moneyURL}/partitions/${partitionID}/blocks`, {
        params: {startBlock: startBlock, limit: limit, includeEmpty: false},
    });
    return response.data.map(transformBlock);
};
const getBlocks = isTest ? getBlocksTest : getBlocksRange;
export {getSingleBlock, getBlocks};

// create a function to transform BlockDTO to Block:
const transformBlock = (block: BlockDTO): Block => {
    // console.log("transforming block: ", block);
    // console.log("encoded UC: ", block.UnicityCertificate);
    const uc: UnicityCertificate = UnicityCertificate.fromCbor(Base16Converter.decode(block.UnicityCertificate));
    const b: Block = {
        Header: {
            ShardID: block.ShardID,
            SystemID: block.PartitionID,
            ProposerID: block.ProposerID,
            PreviousBlockHash: block.PreviousBlockHash,
        },
        BlockNumber: block.BlockNumber,
        TxHashes: block.TxHashes,
        UnicityCertificate: uc,
    };
    // console.log("into block: ", b);

    return b;
}