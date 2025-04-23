import { FeeCreditTransactionType } from '@alphabill/alphabill-js-sdk/lib/fees/FeeCreditTransactionType';
import { MoneyPartitionTransactionType } from '@alphabill/alphabill-js-sdk/lib/money/MoneyPartitionTransactionType';
import { PartitionTypeIdentifier } from '@alphabill/alphabill-js-sdk/lib/PartitionTypeIdentifier';
import { TokenPartitionTransactionType } from '@alphabill/alphabill-js-sdk/lib/tokens/TokenPartitionTransactionType';
import { type ITransactionPayloadAttributes } from '@alphabill/alphabill-js-sdk/lib/transaction/ITransactionPayloadAttributes';
import { type ITransactionOrderProof } from '@alphabill/alphabill-js-sdk/lib/transaction/proofs/ITransactionOrderProof';
import { TransactionOrder } from '@alphabill/alphabill-js-sdk/lib/transaction/TransactionOrder';
import { Base16Converter } from '@alphabill/alphabill-js-sdk/lib/util/Base16Converter';

export const parseTransactionOrder = (
  txOrderHex?: string,
): {
  authProof: string;
  clientMetadata: string;
  feeProof: string;
  networkID: string | number;
  partitionID: string | number;
  stateLock: string;
  timeout: number;
  transactionType: string | number;
  unitID: string;
  version: string;
} => {
  if (!txOrderHex) {
    return {
      authProof: 'N/A',
      clientMetadata: 'N/A',
      feeProof: 'N/A',
      networkID: 'N/A',
      partitionID: 'N/A',
      stateLock: 'N/A',
      timeout: 0,
      transactionType: 'N/A',
      unitID: 'N/A',
      version: 'N/A',
    };
  }

  try {
    const txOrderCborHex = txOrderHex.startsWith('0x')
      ? txOrderHex.slice(2)
      : txOrderHex;

    const rawTxOrder = Base16Converter.decode(txOrderCborHex);

    const transactionOrder = TransactionOrder.fromCbor<
      ITransactionPayloadAttributes,
      ITransactionOrderProof | null
    >(
      rawTxOrder,
      {
        fromCbor: (): ITransactionPayloadAttributes => ({
          encode: (): Uint8Array => new Uint8Array(),
        }),
      },
      { fromCbor: (): ITransactionOrderProof | null => null },
    );

    return {
      authProof:
        transactionOrder.authProof !== null
          ? (transactionOrder.authProof as ITransactionOrderProof).toString()
          : 'N/A',
      clientMetadata: transactionOrder.payload.clientMetadata.toString(),
      feeProof: transactionOrder.feeProof
        ? Base16Converter.encode(transactionOrder.feeProof)
        : 'N/A',
      networkID: transactionOrder.payload.networkIdentifier,
      partitionID: transactionOrder.payload.partitionIdentifier,
      stateLock: transactionOrder.payload.stateLock?.toString() ?? 'N/A',
      timeout: Number(transactionOrder.payload.clientMetadata.timeout) || 0,
      transactionType: transactionOrder.payload.type,
      unitID: transactionOrder.payload.unitId.toString(),
      version: transactionOrder.version.toString(),
    };
  } catch (error) {
    console.error('Error decoding transaction order:', error);
    return {
      authProof: 'Error',
      clientMetadata: 'Error',
      feeProof: 'Error',
      networkID: 'Error',
      partitionID: 'Error',
      stateLock: 'Error',
      timeout: 0,
      transactionType: 'Error',
      unitID: 'Error',
      version: 'Error',
    };
  }
};

function formatEnumKey(key: string): string {
  const enumKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
  return enumKey.charAt(0).toUpperCase() + enumKey.slice(1);
}

function tryEnumLookup(
  txType: number,
  enumList: Record<number, string>[],
  fallback: string,
): string {
  for (const enumObj of enumList) {
    const enumKey = enumObj[txType];
    if (enumKey) {
      return formatEnumKey(enumKey);
    }
  }
  return fallback;
}

export function mapTransactionType(
  partitionTypeID: number | undefined,
  txType: number,
): string {
  switch (partitionTypeID) {
    case PartitionTypeIdentifier.MONEY:
      return tryEnumLookup(
        txType,
        [MoneyPartitionTransactionType, FeeCreditTransactionType],
        `Unknown Money TxType #${txType}`,
      );
    case PartitionTypeIdentifier.TOKEN:
      return tryEnumLookup(
        txType,
        [TokenPartitionTransactionType, FeeCreditTransactionType],
        `Unknown Token TxType #${txType}`,
      );
    case PartitionTypeIdentifier.EVM:
      return `EVM TxType #${txType}`;
    default:
      return `Unknown Partition ${partitionTypeID} TxType #${txType}`;
  }
}
