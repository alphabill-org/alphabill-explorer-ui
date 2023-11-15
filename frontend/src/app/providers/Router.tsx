import { Route, Routes } from "react-router-dom";
import {
  BlockDetailsPage,
  BlocksPage,
  HomePage,
  MainLayout,
  Page404,
  TransactionDetailsPage,
  TransactionsPage,
} from "../../pages";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="blocks" element={<BlocksPage />} />
        <Route path="blocks/:id" element={<BlockDetailsPage />} />

        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="transactions/:id" element={<TransactionDetailsPage />} />

        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
