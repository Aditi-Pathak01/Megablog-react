import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
/**React Hook Form:-
 * (1)syntax :- const {register,handleSubmit} = useForm()
 * (2)register is a way of handling form,handleSubmit() is a method/keyword/event which takes in our method reference(async fx)
 * (3){...register("keyVal",{object having options})}
 * (4)options :- required : true,validate : {matchPattern:(val)=>{regEx.text(val)||"Enter Correct Email Address"}}
 * (4)navigate vs Link = navigate => programatically other place! link => click
 */

function loginForm() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.meassage);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => {
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please Enter A Valid Email Address";
                },
              },
            })}
          />

          <Input
            label="password"
            type="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" className="w-full">
            SignIn
          </Button>
        </form>
      </div>
    </div>
  );
}
export default loginForm;
