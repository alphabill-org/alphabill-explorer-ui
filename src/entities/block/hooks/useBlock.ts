import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getBlock, getBlocks } from "../api/blockApi";
import { Block } from "../types/blockTypes";
import { AxiosError } from "axios";
import { isTest } from "../../../app/config";
import { useBlockQueryTest } from "./useBlockTest";

const useBlockQueryReal = (
  blockNumber: string
): QueryObserverResult<Block, AxiosError> => {
  return useQuery({
    queryKey: ["block", blockNumber],
    queryFn: () => getBlock(blockNumber),
  });
};

export const useBlockQuery = isTest ? useBlockQueryTest : useBlockQueryReal;

export const useBlocksQuery = (
  startBlock?: string,
  limit?: number
): QueryObserverResult<Block[], AxiosError> => {
  return useQuery({
    queryKey: ["blocks", startBlock, limit],
    queryFn: () => getBlocks(startBlock, limit),
  });
};
