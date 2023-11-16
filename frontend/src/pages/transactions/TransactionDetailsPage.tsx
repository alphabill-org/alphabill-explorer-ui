import { useParams } from "react-router-dom";
import { DetailsTransaction } from "../../widgets";

const TransactionDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h4 className="text-white font-normal px-5">Transaction {id}</h4>
      <DetailsTransaction/>
    </div>
  );
};

export default TransactionDetailsPage;
