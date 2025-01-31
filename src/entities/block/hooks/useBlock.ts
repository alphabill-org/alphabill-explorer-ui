import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {getSingleBlock, getBlocks} from "../api/blockApi";
import {Block} from "../types/blockTypes";
import {AxiosError} from "axios";
import {isTest} from "../../../app/config";
import {useBlockQueryTest} from "./useBlockTest";

const useBlockQueryReal = (
    partitionID: number,
    blockNumber: string,
): QueryObserverResult<Block, AxiosError> => {
    return useQuery({
        queryKey: ["block", partitionID, blockNumber],
        queryFn: () => getSingleBlock(partitionID, blockNumber),
    });
};

export const useBlockQuery = isTest ? useBlockQueryTest : useBlockQueryReal;

export const useBlocksQuery = (
    partitionID: number,
    startBlock?: string,
    limit?: number
): QueryObserverResult<Block[], AxiosError> => {
    return useQuery({
        queryKey: ["blocks", startBlock, limit],
        queryFn: () => getBlocks(partitionID, startBlock, limit),
    });
};
