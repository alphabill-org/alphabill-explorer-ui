import { Block } from "../../../entities/block";
import { Tx } from "../../../entities/tx";
import { convertTimeToTimeAgo } from "../../../shared/utils/time";
import { TableElementBlock, TableElementTx } from "../types";

export function mapBlockToTableElement(block: Block): TableElementBlock {
  const blockCreationTime = block.UnicityCertificate.unicity_seal.timestamp; // timestamp is in seconds
  return {
    id: block.UnicityCertificate.input_record.round_number,
    blockNumber: block.UnicityCertificate.input_record.round_number,
    timeAgo: convertTimeToTimeAgo(blockCreationTime),
    proposerID: block.Header.ProposerID,
    txCount: block.TxHashes.length,
    shardId: block.Header.ShardID,
    summaryValue: block.UnicityCertificate.input_record.summary_value,
    blockHash: block.UnicityCertificate.input_record.block_hash,
    previousBlockHash: block.Header.PreviousBlockHash,
  };
}

export function mapTxToTableElement(tx: Tx): TableElementTx {
  return {
      txRecordHash: tx.TxRecordHash,
      txOrderHash: tx.TxOrderHash,
      blockNumber: BigInt(tx.BlockNumber),
      systemID: tx.Transaction.TransactionOrder.Payload.SystemID,
      transactionType: tx.Transaction.TransactionOrder.Payload.Type,
      unitID: tx.Transaction.ServerMetadata.TargetUnits,
      timeout: tx.Transaction.TransactionOrder.Payload.ClientMetadata.Timeout,
      actualFee: tx.Transaction.ServerMetadata.ActualFee,
      successIndicator: tx.Transaction.ServerMetadata.SuccessIndicator
  };
}

export function calculateTotalPages(
  dataCount: bigint | number,
  pageSize: number
): number | null {
  const dataCountBigInt = BigInt(dataCount); // Convert dataCount to BigInt if it's not already
  const pageSizeBigInt = BigInt(pageSize);

  const pageCount = dataCountBigInt / pageSizeBigInt;
  const totalPages =
    dataCountBigInt % pageSizeBigInt !== BigInt(0)
      ? pageCount + BigInt(1)
      : pageCount;

  // Check if the total pages are within the safe integer limit for JavaScript
  if (totalPages <= BigInt(Number.MAX_SAFE_INTEGER)) {
    return Number(totalPages); // Safe to convert and return as number
  } else {
    return null; // Indicate that the calculation exceeds the safe limit
  }
}
