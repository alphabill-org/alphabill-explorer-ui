import {Block} from "../../../entities/block";
import {Tx} from "../../../entities/tx";
import {convertTimeToTimeAgo} from "../../../shared/utils/time";
import {TableElementBlock, TableElementTx} from "../types";
import {TxDTO} from "../../../entities/tx/types/txTypes.ts";

export function mapBlockToTableElement(block: Block): TableElementBlock {
    const blockCreationTime: bigint = block.UnicityCertificate.unicitySeal.timestamp; // timestamp is in seconds
    return {
        id: block.UnicityCertificate.inputRecord.roundNumber,
        blockNumber: block.UnicityCertificate.inputRecord.roundNumber,
        timeAgo: convertTimeToTimeAgo(blockCreationTime),
        proposerID: block.Header.ProposerID,
        txCount: block.TxHashes.length,
        shardId: block.Header.ShardID,
        summaryValue: block.UnicityCertificate.inputRecord.summaryValue,
        blockHash: block.UnicityCertificate.inputRecord.blockHash,
        previousBlockHash: block.Header.PreviousBlockHash,
    };
}

export function mapTxToTableElement(tx: TxDTO): TableElementTx {
    console.log("tx: ", tx);
    return {
        txRecordHash: tx.TxRecordHash,
        txOrderHash: tx.TxOrderHash,
        blockNumber: BigInt(tx.BlockNumber),
        systemID: tx.PartitionID,//Transaction.TransactionOrder.Payload.SystemID,
        transactionType: "todo",//tx.Transaction.TransactionOrder.Payload.Type,
        unitID: tx.Transaction.ServerMetadata.TargetUnits,
        timeout: 0, //tx.Transaction.TransactionOrder.Payload.ClientMetadata.Timeout,
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
