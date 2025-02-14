import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import { BlockDetails } from './routes/BlockDetails';
import { Home } from './routes/Home';
import { Partition } from './routes/Partition';
import { PartitionBlocks } from './routes/PartitionBlocks';
import { PartitionTxs } from './routes/PartitionTxs';
import { TxDetails } from './routes/TxDetails';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":partitionID" element={<Partition />} />
        <Route path=":partitionID/transactions" element={<PartitionTxs />} />
        <Route
          path=":partitionID/transactions/:txHash"
          element={<TxDetails />}
        />
        <Route
          path=":partitionID/blocks/:blockNumber"
          element={<BlockDetails />}
        />
      </Route>
      <Route path=":partitionID/blocks" element={<PartitionBlocks />} />
    </Routes>
  );
};

export default App;
