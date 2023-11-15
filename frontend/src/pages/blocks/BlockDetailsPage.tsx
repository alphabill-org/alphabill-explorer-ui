import { useParams } from "react-router-dom";

const BlockDetailsPage = () => {
  const { id } = useParams();
  return <div>BlockDetailsPage id:{id}</div>;
};

export default BlockDetailsPage;
