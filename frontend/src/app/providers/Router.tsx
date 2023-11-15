import { Route, Routes } from "react-router-dom";
import { BlocksPage, HomePage, MainLayout, Page404, TransactionsPage } from "../../pages";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        <Route index element={<HomePage />} />
        <Route path="blocks" element={<BlocksPage />} />
        <Route path="transactions" element={<TransactionsPage />} />

        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
