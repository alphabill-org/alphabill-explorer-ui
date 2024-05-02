import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getBillsByPubKey } from "../api/billApi";
import { Bill } from "../types/billTypes";

export const useBillsByPubKeyQuery = (
  pubKey: string
): QueryObserverResult<Bill, AxiosError> => {
  return useQuery({
    queryKey: ["billsByPubKey", pubKey],
    queryFn: () => getBillsByPubKey(pubKey),
  });
};
