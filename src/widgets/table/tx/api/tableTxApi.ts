import { getTxs } from "../../../../entities/tx/api/txApi";
import { FetchDataOptions, TableElementTx } from "../../types";
import { mapTxToTableElement } from "../../utils/tableUtils";

export async function fetchTableTxData(
  lastTx: bigint,
  options?: FetchDataOptions
): Promise<{ rows: TableElementTx[] }> {
  if (!options) {
    throw new Error("Options are required for fetchData");
  }

  const { pageIndex, pageSize } = options;
  const startTx = lastTx - BigInt(pageIndex * pageSize);
  const limit = pageSize;

  try {
    const data = await getTxs(startTx, limit);
    const rows = data.map((tx) => mapTxToTableElement(tx));
    return { rows };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch blocks"); // Rethrow or handle as needed
  }
}
