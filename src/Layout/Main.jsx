import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
