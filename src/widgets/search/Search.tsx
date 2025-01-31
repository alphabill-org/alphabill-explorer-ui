import React, {useState} from "react";
import {useQueries} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {Block, getSingleBlock} from "../../entities/block";
import {getTx, getTxsByUnitID} from "../../entities/tx/api/txApi";
import {Tx} from "../../entities/tx";
import {Button} from "../../shared/ui/button/Button";

type Result = {
    title: string;
    routeTo: string;
};

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [queryKey, setQueryKey] = useState("");

    const queries = useQueries({
        queries: [
            {
                queryKey: ["searchBlock", queryKey],
                queryFn: () => getSingleBlock(queryKey),
                enabled: !!queryKey,
                staleTime: Infinity,
            },
            {
                queryKey: ["searchTx", queryKey],
                queryFn: () => getTx(queryKey),
                enabled: !!queryKey,
                staleTime: Infinity,
            },
            {
                queryKey: ["searchUnit", queryKey],
                queryFn: () => getTxsByUnitID(queryKey),
                enabled: !!queryKey,
                staleTime: Infinity,
            },
        ],
    });

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setQueryKey(searchQuery);
    };

    const newResult = (item: Block | Tx | Tx[] | undefined): Result => {
        if (item && (item as Block).UnicityCertificate.inputRecord.roundNumber) {
            return {
                title: `Block: ${(item as Block).BlockNumber}`,
                routeTo: `/bills/blocks/${(item as Block).BlockNumber}`
            };
        } else if (item && (item as Tx).TxRecordHash) {
            return {
                title: `Transaction: ${(item as Tx).TxRecordHash}`,
                routeTo: `bills/transactions/${(item as Tx).TxRecordHash}`
            };
        } else if (item && (item as Tx[])[0].TxRecordHash) {
            return {title: `Transactions: ${(item as Tx[]).length}`, routeTo: `bills/units/${queryKey}`};
        }
        return {title: "Unknown", routeTo: "#"};
    };

    const combinedResults = queries.flatMap(query => query.data ? [query.data] : []);

    return (
        <div className="w-full flex flex-row justify-center px-5 pb-5">
            <div className="relative">
        <span className="absolute flex inset-y-0 right-0 items-center mx-3 lg:hidden">
          <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
              onClick={handleSearch}
          >
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
                <input
                    type="search"
                    placeholder="Search by Address / Txn Hash / Block"
                    className="w-[70vw] md:w-[65vw] lg:w-[37vw] h-[6.5vh] p-5 focus:outline-none placeholder:lg:text-[0.95vw] placeholder:sm:text-[2vw] placeholder:md:text-[1.6vw] placeholder:text-[2.4vw]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {combinedResults.length > 0 ? (
                    <div
                        className="absolute w-[70vw] md:w-[65vw] lg:w-[37vw] mt-1 px-5 py-5 bg-black bg-opacity-70 text-white">
                        {combinedResults.map((result, index) => (
                            <div key={index}>
                                <Link to={newResult(result).routeTo} className="block p-2 hover:bg-gray-200">
                                    {newResult(result).title}
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    queryKey && (
                        <div
                            className="absolute w-[70vw] md:w-[65vw] lg:w-[37vw] mt-1 px-5 py-5 text-center bg-black bg-opacity-70 text-white">
                            No data found
                        </div>
                    )
                )}
            </div>
            <Button
                type="submit"
                className="button-v2 w-[13vw] h-[6.5vh] ml-[26px] text-[18px] hidden lg:flex"
                onClick={handleSearch}
            >
                Search
            </Button>
        </div>
    );
};

export default Search;
