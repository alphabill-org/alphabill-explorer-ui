import { NavLink, Outlet, useParams } from "react-router-dom";
import { useBlockQuery } from "../../entities/block";

const BlockDetailsPage = () => {
  const { id } = useParams();
  const { data } = useBlockQuery(id ? id : "latest");

  return (
    <div className="px-4">
      <div className=" divide-y divide-white divide-opacity-10">
        <h2 className="text-white font-bold pb-2">Block {id}</h2>
        <div className="pt-4 mb-2 space-x-3">
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            to={""}
            end
          >
            Overview
          </NavLink>

          {data?.TxHashes.length != 0 && (
            <NavLink
              className={({ isActive }) => (isActive ? "link-active" : "link")}
              to={"transactions"}
              end
            >
              Transactions
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default BlockDetailsPage;
