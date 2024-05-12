/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

export const BlockNumberCell = (info: any) => {
  const blockNumber = info.getValue().toString();
  return <Link className="text-[#08e8de]" to={`/bills/blocks/${blockNumber}`}>{blockNumber}</Link>;
};

export const TransactionCountCell = (info: any) => (
  <Link className="text-[#08e8de]" to={`/bills/blocks/${info.row.original.blockNumber}/transactions`}>
    {info.getValue()}
  </Link>
);

export const EarnedFeesCell = (info: any) => info.getValue().toString();