import { loginUser } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSuccess } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Spinner from "./Spinner";
import logo from "@/assets/logo.svg";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(loginSuccess({ token: data.token }));
      toast.success("Logged in successfully!");
      navigate("/add-product");
    },
    onError: () => {
      toast.error("Login failed. Please check credentials.");
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className=" flex w-full justify-start items-center space-x-2">
        <img src={logo} alt="logo" width={48} height={48} />
        <div className=" flex flex-col">
          <h2 className=" text-xl font-raleway">levitation</h2>
          <span className=" text-sm text-whi">infotech</span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Let the Journey Begin</h2>
        <p className=" text-whi">
          This is basic login page which is used for levitation assignment
          purpose.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className=" font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter Email ID"
            type="email"
            className="bg-wb text-whi border-border  placeholder:text-muted-foreground h-12"
          />
          <p className="text-whi">
            This email will be displayed with your inquiry
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className=" font-medium">
            Current Password
          </Label>
          <Input
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter the Password"
            type="password"
            className="bg-wb border-border text-whi placeholder:text-muted-foreground h-12"
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button
            onClick={handleSubmit}
            className="bg-ash cursor-pointer font-medium px-8 text-green"
          >
            {mutation.isPending ? (
              <>
                Logging in...
                <Spinner />
              </>
            ) : (
              "Login Now"
            )}
          </Button>
          <Button variant={"ghost"} className="text-whi cursor-pointer">
            Forgot Password ?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
