import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Main;
