import { getBlockTxsByBlockNumber, getTxs } from "../../../../entities/tx/api/txApi";
import { FetchDataOptions, TableElementTx } from "../../types";
import { mapTxToTableElement } from "../../utils/tableUtils";

export async function fetchTableTxsData(
  lastTx: bigint,
  options?: FetchDataOptions
): Promise<{ rows: TableElementTx[] }> {
  if (!options) {
    throw new Error("Options are required for fetchData");
  }

  const { pageIndex, pageSize } = options;
  const startTx = BigInt(lastTx) - BigInt(pageIndex) * BigInt(pageSize);
  const limit = pageSize;

  try {
    const data = await getTxs(startTx.toString(), limit);
    const rows = data.transactions.map((tx) => mapTxToTableElement(tx));
    return { rows };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch txs"); // Rethrow or handle as needed
  }
}

export async function fetchTableBlockTxsData(
  blockNumber: bigint
): Promise<{ rows: TableElementTx[] }> {

  try {
    const data = await getBlockTxsByBlockNumber(blockNumber.toString());
    const rows = data.map((tx) => mapTxToTableElement(tx));
    return { rows };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch txs"); // Rethrow or handle as needed
  }
}