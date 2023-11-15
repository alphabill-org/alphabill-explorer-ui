import { NavLink, Outlet, useParams } from "react-router-dom";

const BlockDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>BLOCK DETAILS #{id}</h1>
      <div>
        <NavLink
          className={({ isActive }) =>
           [isActive
              ? "text-[#08e8de] font-medium"
              : "text-white hover:text-[#08e8de] transition-colors duration-300", " mx-2"].join(" ")
          }
          to={""}
          end
        >Overview</NavLink>

        <NavLink
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

      <Outlet />
    </div>
  );
};

export default BlockDetailsPage;
