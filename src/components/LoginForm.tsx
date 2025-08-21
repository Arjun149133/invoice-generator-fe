import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className=" flex w-full justify-start items-center space-x-2">
        <img src="/public/logo.svg" alt="logo" width={48} height={48} />
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
            placeholder="Enter the Password"
            type="password"
            className="bg-wb border-border text-whi placeholder:text-muted-foreground h-12"
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button className="bg-ash cursor-pointer font-medium px-8 text-green">
            Login Now
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
