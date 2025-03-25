import { PartitionIdentifier } from '@alphabill/alphabill-js-sdk/lib/PartitionIdentifier';

export function getPartitionName(partitionTypeID: number): string {
  switch (partitionTypeID) {
    case PartitionIdentifier.MONEY:
      return 'Money';
    case PartitionIdentifier.TOKEN:
      return 'Token';
    case PartitionIdentifier.EVM:
      return 'EVM';
    default:
      return `Partition ${partitionTypeID}`;
  }
}
