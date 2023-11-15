import { useParams } from "react-router-dom";

const TransactionDetailsPage = () => {
  const { id } = useParams();
  return <div>TransactionDetailsPage id:{id}</div>;
};

export default TransactionDetailsPage;
