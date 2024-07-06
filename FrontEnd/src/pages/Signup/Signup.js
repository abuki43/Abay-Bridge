import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify-modernize";
import { useForm } from "react-hook-form";
import useHttp from "../../utils/hooks/http-hook";
import { AuthContext } from "../../utils/context-API";
import Button from "../../components/UIElements/Button/Button";
import Footer from "../../components/UIComponents/Footer/Footer";
import Image from "../../assets/OBJECTS.svg";
import Loader from "../../components/UIElements/Loader/Loader";

import "./signup.css";

const Signup = ({ state }) => {
  const [isSignUp, setIsSignUp] = useState(false || state);
  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("clicked on signuup/login page");
    if (isSignUp) {
      if (data.password !== data.confirmPassword) {
        console.log("confirm password mismatched");
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      try {
        console.log(data);
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify(data),
          { "Content-Type": "application/json" }
        );

        if (error) {
          throw new Error(error);
        }
        navigate("/questions");
        toast("Signed up!");
      } catch (e) {
        // toast(e.message);
        console.log(error);
      }
    } else {
      const LoginData = { email: data.email, password: data.password };
      console.log(JSON.stringify(LoginData));
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify(LoginData),
          { "Content-Type": "application/json" }
        );

        if (error) {
          throw new Error(error);
        }

        navigate("/questions");
        toast.success("Logged in!");
        authContext.login(response.userId, response.token, response.profile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => clearError(),
      });
    }
  }, [error, clearError]);

  const changeSignup = () => {
    setIsSignUp((prev) => !prev);
  };

  const guestLogin = () => {
    navigate("/questions");
    toast.success("Logged in as guest!");
  };

  return (
    <>
      <div className="bg-gradient"></div>
      {isLoading && <Loader color="#007ef2" />}
      <div className="signupPage">
        <div className="signupImage">
          <img src={Image} alt="" />
        </div>
        <div className="formContainer">
          <h2>{isSignUp ? "Join Abay-Bridge today!" : "Welcome back !"}</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {isSignUp && (
              <>
                <div className="formGroup">
                  <label htmlFor="firstName">First name</label>
                  <input
                    placeholder="Abebe"
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                      required: true,
                      maxLength: 80,
                    })}
                    className={errors.firstName ? "error" : ""}
                  />
                  {errors.firstName && (
                    <p className="errorMessage">First name is required</p>
                  )}
                </div>

                <div className="formGroup">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Kebede"
                    {...register("lastName", {
                      required: true,
                      maxLength: 100,
                    })}
                    className={errors.lastName ? "error" : ""}
                  />
                  {errors.lastName && (
                    <p className="errorMessage">Last name is required</p>
                  )}
                </div>

                <div className="formGroup">
                  <label htmlFor="mobileNumber">Mobile number</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    placeholder="0943109147"
                    {...register("mobileNumber", {
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                    className={errors.mobileNumber ? "error" : ""}
                  />
                  {errors.mobileNumber && (
                    <p className="errorMessage">
                      Mobile number must be between 6 and 12 digits
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="abebekebede@email.com"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <p className="errorMessage">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <div className="passwordInput">
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  {...register("password", {
                    required: true,
                    maxLength: 25,
                    minLength: 6,
                  })}
                  className={errors.password ? "error" : ""}
                />
                {errors.password && (
                  <p className="errorMessage">
                    Password must be between 6 and 25 characters
                  </p>
                )}
              </div>
            </div>

            {isSignUp && (
              <>
                <div className="formGroup">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <div className="passwordInput">
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="********"
                      {...register("confirmPassword", {
                        required: true,
                        maxLength: 25,
                        minLength: 6,
                      })}
                      className={errors.confirmPassword ? "error" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="errorMessage">Passwords do not match</p>
                    )}
                  </div>
                </div>

                <div className="formGroup">
                  <label htmlFor="level">Level</label>
                  <select {...register("level")} id="level">
                    <option value="Primary School">Primary School</option>
                    <option value="Secondary School">Secondary School</option>
                    <option value="University/College">
                      University/College
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            )}
            <div className="signupBtnContainer">
              <Button wid="300" type="submit">
                {isSignUp ? "Signup" : "Login"}
              </Button>
            </div>
          </form>
          <p>
            {isSignUp ? "Already have an account? " : "Create an account? "}
            <span onClick={changeSignup}>{isSignUp ? "Login" : "Signup"}</span>
          </p>
          <p>
            Don't want to {isSignUp ? "Signup" : "Login"}?{" "}
            <span onClick={guestLogin} className="guestMode">
              Continue as guest
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
