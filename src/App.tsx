import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import { BlockDetails } from './routes/BlockDetails';
import { Home } from './routes/Home';
import { Page404 } from './routes/Page404';
import { Partition } from './routes/Partition';
import { PartitionBlocks } from './routes/PartitionBlocks';
import { PartitionTxs } from './routes/PartitionTxs';
import { TxDetails } from './routes/TxDetails';
import { UnitTxs } from './routes/UnitTxs';

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
        <Route path=":partitionID/blocks" element={<PartitionBlocks />} />
        <Route path=":partitionID/units/:unitID" element={<UnitTxs />} />
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
