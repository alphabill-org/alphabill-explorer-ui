import { useParams } from "react-router-dom";
import { DetailsTransaction } from "../../widgets";

const TransactionDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Transaction Details Page id:{id}</h1>
      <DetailsTransaction/>
    </div>
  );
};

export default TransactionDetailsPage;
