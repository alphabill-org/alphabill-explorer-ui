/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { shortenHash } from "../../../../shared/utils/helpers";

export const TxHashCell = (info: any) => {
  const txHash = info.getValue().toString();
  return (
    <Link className="text-[#08e8de]" to={`/bills/transactions/${txHash}`}>
      {shortenHash(txHash)}
    </Link>
  );
};

export const TxOrderHashCell = (info: any) => {
  const txHash = info.getValue().toString();
  return <div>{shortenHash(txHash)}</div>;
};

export const UnitCell = (info: any) => {
    const unit = info.getValue().toString();
    return <div>{shortenHash(unit)}</div>;
  };