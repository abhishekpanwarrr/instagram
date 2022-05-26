import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInValid = password === "" || emailAddress === "";
  let navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, emailAddress, password)
      .then((response) => navigate(ROUTES.DASHBOARD))
      .catch((err) => {
        setEmailAddress("");
        setPassword("");
        setError(err.message);
      });
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <>
      <div className="text-center bg-black-faded text-sm p-5">
        <p>
          Email -
          <span
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText("abhi@gmail.com");
            }}
          >
            abhi@gmail.com
          </span>
        </p>
        <p>
          Password -
          <span
            className="cursor-pointer"
            onClick={() => navigator.clipboard.writeText("abhishek")}
          >
            abhishek
          </span>
        </p>
      </div>
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-3/5">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="iphone with instagram"
          />
        </div>
        <div className="flex flex-col w-2/5">
          <div className="flex flex-col items-center p-4 bg-white border border-gray-primary mb-4 rounded">
            <h1 className="flex justify-center w-full">
              <img
                src="/images/logo.png"
                alt="instagram"
                className="mt-2 w-6/12 mb-4"
              />
            </h1>
            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
            <form onSubmit={handleLogin}>
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Enter your email address"
                className="text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                value={emailAddress}
                onChange={({ target }) => setEmailAddress(target.value)}
              />
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Enter your password"
                autoComplete="off"
                className="text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <button
                disabled={isInValid}
                type="submit"
                className={`bg-blue-medium w-full rounded h-8 font-bold text-white ${
                  isInValid && `opacity-50`
                }`}
              >
                Log in
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
            <p className="text-sm">
              Don't have an account?{` `}
              <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
