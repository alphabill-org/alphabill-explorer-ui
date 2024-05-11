import { fakeBlock1 } from "../test/fakeBlocks";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useBlockQueryTest = (blockNumber: string) => {
  return {
    data: {
      ...fakeBlock1
    },
    isFetching: false,
  };
};
