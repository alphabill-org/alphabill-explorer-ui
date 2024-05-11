import { useParams } from "react-router-dom";
import { DetailsTransaction } from "../../widgets";

const TransactionDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h3 className="text-white font-bold px-5">Transaction: {id}</h3>
      <DetailsTransaction/>
    </div>
  );
};

export default TransactionDetailsPage;
