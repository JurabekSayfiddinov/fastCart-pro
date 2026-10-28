
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

import { loginUser } from "../Log/logSlice";
import type { AppDispatch, RootState } from "../app/store";
import { useTheme } from "../Context/Theme";

type LoginForm = {
  userName: string;
  password: string;
};

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { darkMode } = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginForm) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const inputClass = `
    w-full h-[48px] px-3
    border rounded-[3px]
    outline-none transition-colors
    ${
      darkMode
        ? "bg-[#111827] text-white border-gray-600 placeholder:text-gray-400 focus:border-[#DB4444]"
        : "bg-white text-black border-gray-300 placeholder:text-gray-500 focus:border-[#DB4444]"
    }
  `;

  return (
    <section
      className={`
        min-h-[675px]
        flex items-center justify-center
        px-4 py-16
        ${
          darkMode
            ? "bg-[#0B1120] text-white"
            : "bg-white text-black"
        }
      `}
    >
      <div className="w-full max-w-[350px]">


        <h1 className="text-[30px] font-medium tracking-[1px]">
          Log in to Exclusive
        </h1>

        <p className="text-[13px] mt-2 mb-[32px]">
          Enter your details below
        </p>

  
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >

     
       <div>
  <label
    htmlFor="login-username"
    className="block text-[11px] mb-1"
  >
    Username
  </label>

  <input
    id="login-username"
    type="text"
    placeholder="Username"
    autoComplete="username"
    className={inputClass}
    {...register("userName", {
      required: "Username is required",
    })}
  />

  {errors.userName && (
    <p className="text-red-500 text-xs mt-1">
      {errors.userName.message}
    </p>
  )}
</div>
   
          <div>
            <label
              htmlFor="login-password"
              className="block text-[11px] mb-1"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                className={`${inputClass} pr-11`}
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#DB4444]"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

   
          <div className="flex justify-end mt-1">
            <Link
              to="/forgot-password"
              className="text-[#DB4444] text-[13px] hover:underline"
            >
              Forget Password?
            </Link>
          </div>

 
          {error && (
            <p role="alert" className="text-red-500 text-sm">
              {String(error)}
            </p>
          )}


          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              height: "47px",
              backgroundColor: "#DB4444",
              color: "#FFFFFF",
              borderRadius: "3px",
              fontSize: "13px",
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "none",
              marginTop: "3px",

              "&:hover": {
                backgroundColor: "#c73535",
                boxShadow: "none",
              },
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>

        </form>
      </div>
    </section>
  );
}
