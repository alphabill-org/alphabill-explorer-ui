/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

export const BlockNumberCell = (info: any) => {
  const blockNumber = info.getValue().toString();
  return (
    <Link className="text-[#08e8de]" to={`/bills/blocks/${blockNumber}`}>
      {blockNumber}
    </Link>
  );
};

export const TransactionCountCell = (info: any) => {
  const value = info.getValue().toString();
  return (
    <>
      {value == "0" ? (
        0
      ) : (
        <Link
          className="text-[#08e8de]"
          to={`/bills/blocks/${info.row.original.blockNumber}/transactions`}
        >
          {info.getValue()}
        </Link>
      )}
    </>
  );
};
