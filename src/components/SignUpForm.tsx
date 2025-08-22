import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { backendURL } from "@/api/auth";
import Spinner from "./Spinner";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/auth/register`, formData);

      console.log("register form", res.data);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(
        "Registration failed."
        // (error as unknown as AxiosError)?.response?.data?.error || ""
      );
      console.error(
        "Registration failed:",
        (error as unknown as AxiosError)?.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Sign up to begin journey</h2>
        <p className="text-whi">
          This is basic signup page which is used for levitation assignment
          purpose.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="font-medium">
            Enter your username
          </Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Enter your username"
            className="bg-wb border-border text-whi placeholder:text-h-12"
          />
          <p className="text-whi">
            This username will be displayed with your inquiry
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium">
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
            className="bg-wb border-border text-whi placeholder:text-h-12"
          />
          <p className="text-whi">
            This email will be displayed with your inquiry
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="font-medium">
            Password
          </Label>
          <Input
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter the Password"
            type="password"
            className="bg-wb border-border text-whi placeholder:text-h-12"
          />
          <p className="text-whi">
            Any further updates will be forwarded on this Email ID
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button
            onClick={handleRegister}
            className="bg-ash cursor-pointer hover:bg-ash/90 font-medium px-8 text-green"
            disabled={loading}
          >
            {loading ? (
              <>
                Registering...
                <Spinner />
              </>
            ) : (
              "Register"
            )}
          </Button>
          <Button
            variant={"ghost"}
            className="text-whi cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have account ?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
