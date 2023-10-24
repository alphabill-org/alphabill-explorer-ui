import { Route, Routes } from "react-router-dom";
import { HomePage, MainLayout, Page404 } from "../../pages";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        <Route index element={<HomePage />} />

        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
