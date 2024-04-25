import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/UIElements/Button/Button";
import Footer from "../../components/UIComponents/Footer/Footer";
import Image from "../../assets/OBJECTS.svg";
import "./signup.css";

const Signup = ({ state }) => {
  const [isSignUp, setIsSignUp] = useState(false || state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const changeSignup = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <>
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
                      <p className="errorMessage">
                        Password must be between 6 and 25 characters
                      </p>
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

            <Button wid="310" type="submit">
              {isSignUp ? "Signup" : "Login"}
            </Button>
          </form>
          <p>
            {isSignUp ? "Already have an account? " : "Create an account? "}
            <span onClick={changeSignup}>{isSignUp ? "Login" : "Signup"}</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
