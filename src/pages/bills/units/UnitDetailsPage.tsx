import { useParams } from "react-router-dom";
import { DetailsUnit } from "../../../widgets";
import Page404 from "../../404/Page404";

const UnitDetailsPage = () => {
  const { id } = useParams();
  if (id === undefined) {
    return <Page404 />;
  } else {
    return (
      <div>
        <h3 className="text-white font-bold px-5">Unit: {id}</h3>
        <DetailsUnit id={id} />
      </div>
    );
  }
};

export default UnitDetailsPage;
