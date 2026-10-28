
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, resetAuth } from "../Log/logSlice";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@mui/material";
import { useTheme } from "../Context/Theme";


export default function Signup() {
  const {darkMode}=useTheme()
const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  useEffect(() => {
    dispatch(resetAuth());

    return () => {
      dispatch(resetAuth());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const inputClass = `
  w-full py-3 px-2 border-b outline-none
  transition-colors duration-300
  ${
    darkMode
      ? "bg-transparent text-white border-gray-600 placeholder:text-gray-400 focus:border-[#DB4444]"
      : "bg-transparent text-black border-gray-300 placeholder:text-gray-500 focus:border-[#DB4444]"
  }
`;

  return (
    <>
  
    <main>
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">

        <h1 className="text-4xl font-medium mb-3">
          Create an account
        </h1>

        <p className="mb-8">
          Enter your details below
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >

          <div>
            <input
              placeholder="Name"
              className={inputClass}
              {...register("userName", {
                required: "Name is required",
              })}
            />
            {errors.userName && (
              <p className="text-red-500 text-xs">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              className={inputClass}
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
     className={`${inputClass} pr-11`}
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Minimum 6 characters",
        },
      })}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff size={19} strokeWidth={1.7} />
      ) : (
        <Eye size={19} strokeWidth={1.7} />
      )}
    </button>
  </div>

<div>
  <div className="relative mt-[10px]">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Confirm Password"
      className={inputClass}
      {...register("confirmPassword", {
        required: "Confirm your password",
        validate: (value) =>
          value === password || "Passwords do not match",
      })}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff size={19} strokeWidth={1.7} />
      ) : (
        <Eye size={19} strokeWidth={1.7} />
      )}
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="text-red-500 text-xs mt-1">
      {errors.confirmPassword.message}
    </p>
  )}
</div>


  {errors.password && (
    <p className="text-red-500 text-xs mt-1">
      {errors.password.message}
    </p>
  )}
</div>

          {error && (
            <p role="alert" className="text-red-500 text-sm">
              {error}
            </p>
          )}

         <Button
  type="submit"
  variant="contained"
  disabled={loading}
  fullWidth
  sx={{
    height: "47px",
    marginTop: "20px",
    backgroundColor: "#DB4444",
    color: "#FFFFFF",
    borderRadius: "3px",
    fontSize: "13px",
    fontWeight: 500,
    textTransform: "none",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: "#c73535",
      boxShadow: "none",
    },
  }}
>
  {loading ? "Creating..." : "Create Account"}
</Button>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black underline"
            >
              Log in
            </Link>
          </p>

        </form>
      </div>
    </section>
    </main>

    </>
  );
}
