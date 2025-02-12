import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Home } from './routes/Home';
import { Partition } from './routes/Partition';
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
      </Route>
    </Routes>
  );
};

export default App;
