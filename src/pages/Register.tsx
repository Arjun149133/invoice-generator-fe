import CorouselImages from "@/components/CorouselImages";
import SignupForm from "@/components/SignUpForm";

import mobile from "@/assets/mobile.png";
import hall from "@/assets/hall.png";
import billboard from "@/assets/billboard.png";

const images = [billboard, mobile, hall];

const Register = () => {
  return (
    <div
      className="min-h-screen bg-[#141414] text-white flex items-center justify-center 
  bg-[radial-gradient(circle_at_50%_20%,rgba(204,245,117,0.2),transparent_30%),radial-gradient(circle_at_100%_20%,rgba(79,89,168,0.4),transparent_15%),radial-gradient(circle_at_0%_90%,rgba(204,245,117,0.15),transparent_10%)]"
    >
      <div className=" lg:w-[50%] flex items-center justify-center ">
        <SignupForm />
      </div>
      <div className=" hidden lg:w-[50%] lg:flex items-center justify-end ">
        <CorouselImages images={images} />
      </div>
    </div>
  );
};

export default Register;
