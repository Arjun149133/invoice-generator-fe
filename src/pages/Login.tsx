import CorouselImages from "@/components/CorouselImages";
import LoginForm from "@/components/LoginForm";

const images = [
  "/public/mobile.png",
  "/public/billboard.png",
  "/public/hall.png",
];

const Login = () => {
  return (
    <div
      className="min-h-screen bg-[#141414] text-white flex items-center justify-center 
  bg-[radial-gradient(circle_at_90%_20%,rgba(79,89,168,0.4),transparent_25%),radial-gradient(circle_at_0%_90%,rgba(204,245,117,0.25),transparent_30%)]"
    >
      <div className=" hidden lg:w-[50%] lg:flex items-center justify-end ">
        <CorouselImages images={images} />
      </div>
      <div className=" lg:w-[50%] flex items-center justify-center ">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
