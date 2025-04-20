import { PartitionTypeIdentifier } from '@alphabill/alphabill-js-sdk/lib/PartitionTypeIdentifier';

export function getPartitionName(partitionTypeID: number): string {
  switch (partitionTypeID) {
    case PartitionTypeIdentifier.MONEY:
      return 'Money';
    case PartitionTypeIdentifier.TOKEN:
      return 'Token';
    case PartitionTypeIdentifier.EVM:
      return 'EVM';
    default:
      return `Partition ${partitionTypeID}`;
  }
}
