import React, { useState, useEffect } from "react";
import { Image, TextField } from "./";
import { ErrorProps } from "./Register";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { v4 as id } from "uuid";
import styled from "styled-components";
import { serverURL } from "../config/config";
import axios from "axios";

const School = require(`../assets/images/philsci.jpg`);
const Logo = require(`../assets/images/logo.jpg`);

type TypeProps = `text` | `password` | `radio` | `checkbox`;

export interface InputValProps {
  Email?: string;
  Password?: string;
}

export interface LoginErrorProps extends ErrorProps {}

const Login: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  let initialValues: InputValProps = {
    Email: "",
    Password: "",
  };

  const [formValues, setFormValues] = useState<any>(initialValues);
  const [passType, setPassType] = useState<TypeProps>(`password`);
  const [message, setMessage] = useState<LoginErrorProps>();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 900);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    navigate("/portal");
  }, []);

  useEffect(() => {
    if (message?.status === 422 || message?.status === undefined) {
      setMessage(message);
    } else if (message.status === 409 || message.status === undefined) {
      setMessage(message);
    } else {
      setTimeout(() => {
        setMessage({});
      }, 3800);
    }
  }, [message]);

  const toggleClickIcon = () => {
    if (!showPassword) {
      setShowPassword(true);
      setPassType(`text`);
    } else {
      setShowPassword(false);
      setPassType(`password`);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { Email, Password } = formValues;

    if (message !== null) {
      const login = await axios({
        url: `${serverURL}/login`,
        method: `POST`,
        data: {
          email: Email,
          password: Password,
        },
        headers: {
          "Access-Control-Allow-Origin": "XMLHttpRequest",
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          const { status, message } = response.data;

          console.log(status);

          if (status === 200) {
            sessionStorage.setItem(`token`, message);
            navigate(`/portal`);
            return;
          }

          setMessage({
            status: status,
            data: message,
          });
        })
        .catch((err) => {
          return err;
        });

      const { status, message } = login.response.data;

      setMessage({
        status: status,
        data: message,
      });
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={`flex relative`}>
      <StyledLoginForm className="form-login duration-150 h-screen flex flex-col overflow-y-auto py-10 px-14 w-full md:w-resize-form-login lg:w-form-size lg:px-8 md:px-6 xl:w-extra-form-size">
        {loader ? (
          <div className={`w-full h-full flex justify-center items-center`}>
            <HashLoader size={40} color={`#064b86`} loading={loader} />
          </div>
        ) : (
          <>
            <div className={`flex flex-col items-center`}>
              <img
                src={Logo}
                alt=""
                className={`w-10 h-10 object-cover mb-3`}
              />
              <h3
                className={`text-center text-14px text-primaryBlue font-semibold tracking-wide`}
              >
                Philippine Science High School
              </h3>
              <h3
                className={`text-center text-14px text-primaryBlue font-semibold tracking-wide`}
              >
                Eastern Visayas Campus
              </h3>
              <span className={`text-14px mt-10 tracking-wide`}>
                -- Sign In --
              </span>
              {message?.status === 409 && (
                <div
                  className={`flex justify-center text-10px py-2 duration-150 bg-red-100 mt-6 rounded-md px-6`}
                >
                  <span
                    className={`text-red-400 font-semibold tracking-wider text-center`}
                  >
                    {message.data}
                  </span>
                </div>
              )}
            </div>
            <div className={`form-group mt-16`}>
              <form
                className={`flex flex-col gap-6 px-2`}
                onSubmit={handleSubmit}
              >
                <div
                  className={`form-input flex flex-col relative text-13px duration-200`}
                >
                  <label
                    className={`absolute ml-2 duration-150 tracking-wide pointer-events-none text-gray-400 ${
                      formValues.Email !== ``
                        ? `-top-3 ml-0 text-10px`
                        : `top-0`
                    }`}
                  >
                    Email address
                  </label>
                  <TextField
                    id={id()}
                    type={"text"}
                    name={"Email"}
                    value={formValues.Email}
                    autoFocus={true}
                    className={`outline-none border-b py-1 text-13px px-2 ${
                      message?.data?.email
                        ? `border-red-400`
                        : `border-gray-400`
                    }`}
                    onChange={handleChange}
                  />
                  {message?.status === 422 && message.data?.email && (
                    <div
                      className={`flex gap-1 items-center text-10px text-red-500 bg-red-50 pl-2 py-2 mt-2 rounded-md tracking-wider`}
                    >
                      <i className={`fa fa-exclamation`} />
                      <span className={`tracking-wider`}>
                        {message.data?.email}
                      </span>
                    </div>
                  )}
                </div>
                <div className={`form-input flex flex-col relative text-13px`}>
                  <label
                    className={`absolute ml-2 duration-150 tracking-wide pointer-events-none text-gray-400 ${
                      formValues.Password !== ``
                        ? `-top-3 ml-0 text-10px`
                        : `top-0`
                    }`}
                  >
                    Password
                  </label>
                  <TextField
                    id={id()}
                    type={passType}
                    name={"Password"}
                    value={formValues.Password}
                    className={`outline-none border-b py-1 text-13px px-2 ${
                      message?.data?.password
                        ? `border-red-400`
                        : `border-gray-400`
                    }`}
                    onChange={handleChange}
                  />
                  <i
                    className={`absolute right-3 top-1 text-gray-500 cursor-pointer duration-200 ${
                      showPassword ? `fa fa-eye` : `fa fa-eye-slash`
                    } hover:text-gray-700`}
                    onClick={toggleClickIcon}
                  />
                  {message?.status === 422 && message.data?.password && (
                    <div
                      className={`flex gap-1 items-center text-10px text-red-500 bg-red-50 pl-2 py-2 mt-2 rounded-md tracking-wider`}
                    >
                      <i className={`fa fa-exclamation`} />
                      <span className={`tracking-wider`}>
                        {message.data?.password}
                      </span>
                    </div>
                  )}
                </div>
                <span className={`text-13px ml-2`}>
                  Forgot Password?
                  <Link
                    to={`/forgot-password`}
                    className={`ml-1 underline text-normalBlue outline-none`}
                  >
                    Click here
                  </Link>
                </span>
                <button
                  type={`submit`}
                  className={`outline-none bg-normalBlue py-1 mt-3 rounded-full text-13px text-gray-50 duration-200 hover:bg-primaryBlue`}
                >
                  Login
                </button>
                <Link
                  to={`/signup`}
                  className={`mt-8 outline-none border border-normalBlue py-1 rounded-full text-13px text-normalBlue text-center duration-200 hover:border-primaryBlue hover:bg-primaryBlue hover:text-gray-50`}
                >
                  Signup
                </Link>
              </form>
            </div>
          </>
        )}
      </StyledLoginForm>
      <Image src={School} />
    </div>
  );
};

export default Login;

const StyledLoginForm = styled.div`
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #1e81b0;
    border-radius: 10px;
  }
`;
