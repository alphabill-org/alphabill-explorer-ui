import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

const BlockDetailsPage = () => {
  const { id } = useParams();
  const [back, setBack] = useState(true);
  return (
    <div>
      <h4 className="text-white font-normal px-5">Block {id}</h4>
      <hr className="my-2"/>
      <div className="px-2">
        <NavLink
          onClick={() => setBack(true)}
          className={({ isActive }) =>
            [isActive
              ? "text-[#08e8de] font-medium"
              : "text-white hover:text-[#08e8de] transition-colors duration-300", " mx-2"].join(" ")
          }
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
      <div className={back ? "bg-black bg-opacity-50 mt-2" : ""}>
        <Outlet />
      </div>
    </div>
  );
};

export default BlockDetailsPage;
