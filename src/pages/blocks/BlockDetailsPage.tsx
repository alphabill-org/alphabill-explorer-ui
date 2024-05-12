import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

const BlockDetailsPage = () => {
  const { id } = useParams();
  const [back, setBack] = useState(true);
  return (
    <div className="px-4">
      <div className=" divide-y divide-white divide-opacity-10">
        <h2 className="text-white font-bold pb-2">Block {id}</h2>
        <div className="pt-4 mb-2 space-x-3">
          <NavLink
            onClick={() => setBack(true)}
            className={({ isActive }) => isActive ? "link-active" : "link"}
            to={""}
            end
          >Overview</NavLink>

          <NavLink
            onClick={() => setBack(false)}
            className={({ isActive }) =>
              isActive
                ? "text-[#08e8de] font-medium"
                : "text-white hover:text-[#08e8de] transition-colors duration-300"
            }
            to={"transactions"}
            end
          >
            Transactions
          </NavLink>
        </div>
      </div>

      <div className={back ? "bg-black bg-opacity-50" : ""}>
        <Outlet />
      </div>
    </div>
  );
};

export default BlockDetailsPage;
