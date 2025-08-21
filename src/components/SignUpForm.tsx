import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupForm = () => {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold ">Sign up to begin journey</h2>
        <p className=" text-whi">
          This is basic signup page which is used for levitation assignment
          purpose.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-medium">
            Enter your name
          </Label>
          <Input
            id="name"
            placeholder="Enter Email ID"
            className="bg-wb border-border text-whi placeholder:text-h-12"
          />
          <p className="text-whi">
            This name will be displayed with your inquiry
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium">
            Email Address
          </Label>
          <Input
            id="email"
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
            placeholder="Enter the Password"
            type="password"
            className="bg-wb border-border text-whi placeholder:text-h-12"
          />
          <p className="text-whi">
            Any further updates will be forwarded on this Email ID
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button className="bg-ash cursor-pointer hover:bg-accent/90 font-medium px-8 text-green">
            Register
          </Button>
          <Button variant={"ghost"} className="text-whi cursor-pointer">
            Already have account ?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
