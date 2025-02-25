import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SpinnerIcon from '../../assets/spinner-ico.svg?react';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { shortenHash } from '../../utils/helpers';
import { getPartitionName } from '../../utils/partitionUtils';

export const Search: React.FC = () => {
  const [searchKey, setSearchKey] = useState('');

  const {
    data: searchData,
    isLoading,
    isError,
    error,
    refetch,
  } = useSearchQuery(searchKey);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmed = searchKey.trim();
    if (!trimmed) {
      return;
    }
    refetch();
  };

  return (
    <div className="flex flex-col items-center my-4">
      <div className="relative w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            className="flex-1 text-primary bg-white hover:bg-grey p-2 focus:outline-none placeholder:text-primary/50"
            placeholder="Search by block # or tx hash"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button
            type="submit"
            className={`button flex min-w-[87px] justify-center ${isLoading && 'pointer-events-none'}`}
            disabled={isLoading}
          >
            {isLoading ? <SpinnerIcon className="text-white" /> : 'Search'}
          </button>
        </form>

        {isError && (
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2">
            <p className="text-red-500">Error: {error?.message}</p>
          </div>
        )}
      </div>

      {searchData && !isLoading && !isError && (
        <div className="relative w-full max-w-md">
          {((): React.ReactNode => {
            const blockCount = searchData.blocks
              ? Object.keys(searchData.blocks).length
              : 0;
            const txCount = searchData.txs ? searchData.txs.length : 0;

            if (blockCount === 0 && txCount === 0) {
              return <p className="mt-2 text-gray-500">No matches found.</p>;
            }

            return (
              <ul className="absolute bg-white shadow w-full mt-2 z-10">
                {Object.entries(searchData.blocks).map(([num, block]) => (
                  <li key={num}>
                    <Link
                      to={`/${block.PartitionID}/blocks/${block.BlockNumber}`}
                      className="block p-2 text-primary hover:text-secondary"
                    >
                      Block #{block.BlockNumber} (
                      {((): string => {
                        const partitionName = getPartitionName(
                          block.PartitionID,
                        );

                        return partitionName.startsWith('Partition')
                          ? partitionName
                          : `${partitionName} Partition`;
                      })()}
                      )
                    </Link>
                  </li>
                ))}
                {searchData.txs.map((tx) => (
                  <li key={tx.TxRecordHash}>
                    <Link
                      to={`/${tx.PartitionID}/transactions/${tx.TxRecordHash}`}
                      className="block p-2 text-primary hover:text-secondary"
                    >
                      {shortenHash(tx.TxRecordHash)}
                    </Link>
                  </li>
                ))}
              </ul>
            );
          })()}
        </div>
      )}
    </div>
  );
};
