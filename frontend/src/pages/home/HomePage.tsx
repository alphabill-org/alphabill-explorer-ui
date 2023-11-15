// import { Button } from "../../shared/ui/button/Button";
// import { IconNotificationNew} from "../../shared/ui/icons";
import { Button } from "../../shared/ui/button/Button";

const HomePage = () => {
  return (
    <>
      <div className="w-full flex justify-center py-20">
        <h1 className="text-[#08e8de]">The Alphabill Blockchain Explorer ...</h1>
      </div>

      <div className="w-full flex flex-row justify-center">
        <input placeholder="Search by Address / Txn Hash / Block / Token " className="w-[650px] h-[60px] p-5"/>
        <Button className="w-[248px] h-[60px] ml-[26px] text-white font-bold text-[18px] bg-[#4e3fb6] hover:text-[#0c0a3e] hover:bg-[#08e8de]">Search</Button>
      </div>
    </>
  );
};

export default HomePage;
