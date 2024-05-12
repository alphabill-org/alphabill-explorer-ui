import { Route, Routes } from "react-router-dom";
import {
  BlockDetailsPage,
  BlocksPage,
  HomePage,
  MainLayout,
  Page404,
  TransactionDetailsPage,
  TransactionsPage,
  Bills,
  ComingSoon
} from "../../pages";
import { DetailsBlock, TableBlockTxs } from "../../widgets";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="bills" element={<Bills/>}/>
        <Route path="bills/blocks" element={<BlocksPage />} />
        <Route path="bills/blocks/:id" element={<BlockDetailsPage />}>
          <Route index element={<DetailsBlock />} />
          <Route path="transactions" element={<TableBlockTxs/>} />
        </Route>
        <Route path="bills/transactions" element={<TransactionsPage />} />
        <Route path="bills/transactions/:id" element={<TransactionDetailsPage />} />
        
        <Route path="tokens" element={<ComingSoon/>}/>
        <Route path="tokens/blocks" element={<ComingSoon/>} />
        <Route path="tokens/transactions" element={<ComingSoon/>} />
        <Route path="tokens/transactions/:id" element={<ComingSoon/>}/>

        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
