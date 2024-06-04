import { fakeTransaction1, fakeTransaction2 } from "../test/fakeTxs";
import { Tx, TxsResponse } from "../types/txTypes";

// Optionally simulate delay to mimic network behavior
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fakeTxs: Tx[] = [
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
  fakeTransaction1,
  fakeTransaction2,
];

const getTxTest = async (): Promise<Tx> => {
  // Optionally simulate a delay to mimic network response times
  await delay(500); // Simulate 500ms network delay

  return fakeTransaction1;
};

const getTxsTest = async (
  startSeqNumber?: string,
  limit?: number
): Promise<TxsResponse> => {
  // Optionally simulate a delay to mimic network response times
  await delay(500); // Simulate 500ms network delay

  // Return the slice of fake blocks array as per calculated indices
  return { transactions: fakeTxs.slice(0, limit), offsetKey: `10` };
};

export { getTxTest, getTxsTest };
