import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormData } from "./types";
import { useLoginMutation } from "@/integration/api/authApi";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useStorage } from "@/utils";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      }).unwrap();

      if (response.token) {
        useStorage.setCredentials({ token: response.token });
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login failed", err);
      toast.error(`Tizimga kirishda xatolik !`);
    }
  };

  return (
    <div className="text-center px-4 ">
      <Toaster />
      <p className="text-white text-2xl font-bold mt-5">Nonvoyxona</p>
      <img
        src="/logo 1.png"
        alt="logo"
        className="mx-auto w-1/2 pt-2.5"
        loading="lazy"
      />
      <p className="text-white text-2xl font-bold mt-5">Tizimga kirish</p>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5 space-y-5">
        <Controller
          name="username"
          control={control}
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                type="username"
                placeholder="Username..."
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-red-500 text-left text-sm">
                  {String(errors.username.message)}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Password..."
                className={errors.password ? "border-red-500" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-left text-sm">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
          )}
        />
        {error && (
          <p className="text-red-500">
            Xatolik yuz berdi, Iltimos qaytadan urining !
          </p>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-xl text-[#1C2C57] font-bold bg-yellow-400"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
