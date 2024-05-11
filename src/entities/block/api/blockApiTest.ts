/* eslint-disable @typescript-eslint/no-unused-vars */
import { fakeBlock1, fakeBlock2 } from "../test/fakeBlocks";
import { Block } from "../types/blockTypes";

// Optionally simulate delay to mimic network behavior
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fakeBlocks: Block[] = [
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
  fakeBlock1,
  fakeBlock2,
];

const getBlocksTest = async (
  startBlock?: bigint,
  limit?: number
): Promise<Block[]> => {
  // Optionally simulate a delay to mimic network response times
  await delay(500); // Simulate 500ms network delay

  // Return the slice of fake blocks array as per calculated indices
  return fakeBlocks.slice(0, limit);
};


export { getBlocksTest };
