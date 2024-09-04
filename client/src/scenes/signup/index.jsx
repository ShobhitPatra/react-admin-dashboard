import { Link } from "react-router-dom";

import React, { useState } from "react";
import useSignup from "../../hooks/useSignup";
import Loading from "../../components/Loading";

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: " ",
  });

  const { signup, loading } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    // signup(inputs);
    signup(inputs);
  };
  if (loading) return <Loading />;
  return (
    <>
      <div className="h-screen flex  justify-center items-center bg-slate-900">
        <div className="flex flex-col justify-center items-center min-w-96 rounded-md hover:shadow-inner shadow-2xl  ">
          <div className="p-6 h-full w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-slate-50 border-opacity-10">
            <h1 className="text-3xl font-semibold text-center text-white ">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="label p-2">
                  <span className="text-white text-base ">email</span>
                </label>
                <input
                  type="text"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                  placeholder="email"
                  className="input input-bordered w-full h-10"
                ></input>
              </div>
              <div>
                <label className="label p-2">
                  <span className="text-base text-white">name</span>
                </label>
                <input
                  type="text"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                  placeholder="name"
                  className="input h-10 w-full input-bordered"
                ></input>
              </div>
              <div>
                <label className="label p-2">
                  <span className="text-base text-white">password</span>
                </label>
                <input
                  type="text"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  placeholder="password"
                  className="input h-10 w-full input-bordered"
                ></input>
              </div>
              <div>
                <label className="label p-2">
                  <span className="text-base text-white">confirm password</span>
                </label>
                <input
                  type="text"
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmPassword: e.target.value })
                  }
                  placeholder="confirm password"
                  className="input h-10 w-full input-bordered"
                ></input>
              </div>

              <Link to={"/login"}>
                <span className="text-base text-slate-300 p-2 hover:underline hover:text-blue-400 ">
                  Existing user ?{" "}
                </span>
              </Link>
              <div className="flex justify-center ">
                <button className="bg-green-500 w-full p-2 rounded-md m-2 hover:bg-green-400 hover:shadow-md hover:shadow-green-400/50">
                  <span className="text-xl font-semibold text-slate-800 hover:text-slate-700">
                    Sign up
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
