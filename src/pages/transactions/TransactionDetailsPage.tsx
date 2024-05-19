import { useParams } from "react-router-dom";
import { DetailsTransaction } from "../../widgets";
import Page404 from "../404/Page404";

const TransactionDetailsPage = () => {
  const { id } = useParams();
  if (id === undefined) {
    return <Page404 />;
  } else {
    return (
      <div>
        <h3 className="text-white font-bold px-5">Transaction: {id}</h3>
        <DetailsTransaction id={id} />
      </div>
    );
  }
};

export default TransactionDetailsPage;
