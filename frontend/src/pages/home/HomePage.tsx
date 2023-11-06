import { Button } from "../../shared/ui/button/Button";
import { IconNotificationNew} from "../../shared/ui/icons";

const HomePage = () => {
  return (
    <>
      <Button isRounded={true} className="px-5 w-20 h-20">
        <IconNotificationNew className=" stroke-blue-950" />
      </Button>
      <IconNotificationNew className="" />
      <h1>Hello world!</h1>
      <h2>Hello world!</h2>
      <h1>Hello world!</h1>
      <h1>Hello world!</h1>
      <h1>Hello world!</h1>
      <h1>Hello world!</h1>
      <h1>Hello world!</h1>
      <h1>Hello world!</h1>
    </>
  );
};

export default HomePage;
