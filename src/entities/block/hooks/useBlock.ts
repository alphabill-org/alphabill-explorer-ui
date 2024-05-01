import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getBlock, getBlocks } from "../api/blockApi";
import { Block } from "../types/blockTypes";
import { AxiosError } from "axios";

export const useBlockQuery = (
  blockNumber: string
): QueryObserverResult<Block, AxiosError> => {
  return useQuery({
    queryKey: ["block", blockNumber],
    queryFn: () => getBlock(blockNumber),
  });
};

export const useBlocksQuery = (
  startBlock?: number,
  limit?: number
): QueryObserverResult<Block[], AxiosError> => {
  return useQuery({
    queryKey: ["blocks", startBlock, limit],
    queryFn: () => getBlocks(startBlock, limit),
  });
};
