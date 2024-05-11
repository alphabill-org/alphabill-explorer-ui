import { getBlocks } from "../../../../entities/block";
import { TableElementBlock } from "../../types";
import { mapBlockToTableElement } from "../../utils/tableUtils";

type FetchDataOptions = {
  pageIndex: number;
  pageSize: number;
};

export async function fetchTableBlockData(
  lastBlock: bigint,
  options?: FetchDataOptions
): Promise<{ rows: TableElementBlock[] }> {
  if (!options) {
    throw new Error("Options are required for fetchData");
  }

  const { pageIndex, pageSize } = options;
  const startBlock = lastBlock - BigInt(pageIndex * pageSize);
  const limit = pageSize;

  try {
    const data = await getBlocks(startBlock, limit);
    const rows = data.map((block) => mapBlockToTableElement(block));
    return { rows };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch blocks"); // Rethrow or handle as needed
  }
}
