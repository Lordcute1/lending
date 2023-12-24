import Navbutton from "./navbutton/navbutton";
import Logo from "./logo/logo";
import { Navigation } from "./navigation/navigation";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 border-b h-20">
      <Logo />
      <Navigation />
      <Navbutton />
    </div>
  );
};

export default Navbar;
