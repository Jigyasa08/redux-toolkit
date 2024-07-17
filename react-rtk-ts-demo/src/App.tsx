import "./App.css";
import { CakeView } from "./features/cake/CakeView";
import { IcecreamView } from "./features/icecream/IceCreamView";
import { UserView } from "./features/user/UserView";

function App() {
  return (
    <>
      <CakeView />
      <IcecreamView />
      <UserView />
    </>
  );
}

export default App;
