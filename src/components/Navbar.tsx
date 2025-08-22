import { useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    if (path.pathname === "/") {
      navigate("/register");
      console.log("Redirecting to /register");
    }
  }, [path]);

  if (path.pathname === "/") {
    return null;
  }

  return (
    <div className=" w-full sticky top-0 left-0 text-white flex justify-between items-center bg-wierd p-2">
      <div className=" flex space-x-2 ml-10">
        <img src="/public/logo.svg" alt="logo" width={32} height={32} />
        <div className=" flex flex-col">
          <h2 className=" text-md">Levitation</h2>
          <span className=" text-xs text-whi">infotech</span>
        </div>
      </div>
      <div className=" mr-10">
        {path.pathname === "/register" && (
          <Button className=" bg-green hover:bg-green/80 text-black lg:p-2 rounded lg:px-6">
            Login
          </Button>
        )}

        {path.pathname === "/login" && (
          <Button
            variant={"ghost"}
            className="  text-green border-2 border-green lg:p-2 text-sm lg:text-md rounded lg:px-6"
          >
            Connecting People With Technology
          </Button>
        )}

        {path.pathname === "/add-product" && (
          <Button
            onClick={handleLogout}
            className=" bg-green hover:bg-green/80 text-black p-1 text-sm lg:text-md lg:p-2 rounded lg:px-6"
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
