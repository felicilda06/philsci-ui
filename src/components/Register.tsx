import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Image, TextField } from ".";
import { v4 as id } from "uuid";
import styled from "styled-components";
import { InputValProps } from "./Login";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../config/config";

const School = require(`../assets/images/philsci.jpg`);

type TypeProps = `text` | `password` | `radio` | `checkbox`;

interface SelectProps {
  value: string;
}

export interface IProps {
  data: Array<SelectProps>;
}

interface RegisterInputValProps extends InputValProps {
  Email?: string;
  Usertype?: `student` | `teacher`;
  Name?: string;
  YearLvl?: string;
  Divistion?: string;
  ConfirmPass?: string;
}

interface ResponseProps {
  email?: string;
  name?: string;
  password?: string;
  confirmPass?: string;
}

export interface ErrorProps {
  status?: number;
  data?: ResponseProps;
}

const Register: React.FC = () => {
  let initialValues: RegisterInputValProps = {
    Name: ``,
    Email: "",
    Password: ``,
    ConfirmPass: ``,
    Usertype: `student`,
  };

  const [loader, setLoader] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>(initialValues);
  const [message, setMessage] = useState<ErrorProps>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passType, setPassType] = useState<TypeProps>(`password`);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 900);
  }, []);

  useEffect(() => {
    console.log(message);
    if (message.status === 422 || message.status === undefined) {
      setMessage(message);
    } else if (message.status === 409 || message.status === undefined) {
      setMessage(message);
    } else {
      setFormValues({
        Name: ``,
        Email: "",
        YearLvl: ``,
        Division: ``,
        Password: ``,
        ConfirmPass: ``,
        Usertype: `student`,
      });

      setTimeout(() => {
        setMessage({});
      }, 2000);
    }
  }, [message]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement & HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const toggleClickIcon = () => {
    if (!showPassword) {
      setShowPassword(true);
      setPassType(`text`);
    } else {
      setShowPassword(false);
      setPassType(`password`);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const { Usertype, Name, Email, Password, YearLvl, Division, ConfirmPass } =
      formValues;

    const register = await axios({
      url: `${serverURL}/signup`,
      method: `POST`,
      data: {
        role: Usertype,
        name: Name,
        yearLvl: YearLvl,
        email: Email,
        division: Division,
        password: Password,
        confirmPass: ConfirmPass,
      },
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        const { status, message } = response.data;

        setMessage({
          status: status,
          data: message,
        });
      })
      .catch((err) => {
        return err;
      });

    const { status, message } = register.response.data;

    setMessage({
      status: status,
      data: message,
    });
  };

  return (
    <div className={`flex relative`}>
      <StyledRegisterForm className="form-register duration-150 h-screen flex flex-col overflow-y-auto py-10 px-14 w-full md:w-resize-form-login lg:w-form-size lg:px-8 md:px-6 xl:w-extra-form-size">
        {loader ? (
          <div className={`w-full h-full flex justify-center items-center`}>
            <HashLoader size={40} color={`#064b86`} loading={loader} />
          </div>
        ) : (
          <>
            <div className={`flex flex-col`}>
              <span
                className={`text-14px text-primaryBlue font-semibold tracking-wide text-center mt-3 lg:mt-4 xl:mt-8`}
              >
                Create an Account
              </span>
              {message.status === 200 && (
                <div
                  className={`flex justify-center text-10px py-1 duration-150 bg-blue-100 mt-6 rounded-md px-6`}
                >
                  <span
                    className={`text-normalBlue font-semibold tracking-wider text-center`}
                  >
                    {message.data}
                  </span>
                </div>
              )}
              {message.status === 409 && (
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
              <form
                className={`flex flex-col gap-6 px-4 mt-10 md:mt-12 lg:mt-12`}
                onSubmit={onSubmit}
              >
                <div
                  className={`form-input flex flex-col relative text-13px duration-200`}
                >
                  <select
                    value={formValues.Usertype}
                    name={`Usertype`}
                    className={`outline-none border-b border-gray-400 py-2 text-13px px-1 bg-white`}
                    onChange={handleChange}
                  >
                    <option value={`student`}>Student</option>
                    <option value={`teacher`}>Teacher</option>
                  </select>
                </div>
                {formValues.Usertype && (
                  <div
                    className={`form-input flex flex-col relative text-13px duration-200`}
                  >
                    <select
                      value={
                        formValues.Usertype === `student`
                          ? formValues.YearLvl
                          : formValues.Division
                      }
                      name={
                        formValues.Usertype === `student`
                          ? `YearLvl`
                          : `Division`
                      }
                      className={`outline-none border-b border-gray-400 py-2 text-13px px-1 bg-white`}
                      onChange={handleChange}
                    >
                      {formValues.Usertype === `student` ? (
                        <>
                          {arrayOfYearLvl.data.map((props) => {
                            return (
                              <option value={props.value}>{props.value}</option>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {arrayOfDivision.data.map((props) => {
                            return (
                              <option value={props.value}>{props.value}</option>
                            );
                          })}
                        </>
                      )}
                    </select>
                  </div>
                )}
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
                    className={`outline-none border-b py-1 text-13px px-2 ${
                      message.data?.email ? `border-red-300` : `border-gray-400`
                    }`}
                    onChange={handleChange}
                  />
                  {message.status === 422 && message.data?.email && (
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
                <div
                  className={`form-input flex flex-col relative text-13px duration-200`}
                >
                  <label
                    className={`absolute ml-2 duration-150 tracking-wide pointer-events-none text-gray-400 ${
                      formValues.Name !== `` ? `-top-3 ml-0 text-10px` : `top-0`
                    }`}
                  >
                    Name
                  </label>
                  <TextField
                    id={id()}
                    type={"text"}
                    name={"Name"}
                    value={formValues.Name}
                    className={`outline-none border-b py-1 text-13px px-2 ${
                      message.data?.name ? `border-red-300` : `border-gray-400`
                    }`}
                    onChange={handleChange}
                  />
                  {message.status === 422 && message.data?.name && (
                    <div
                      className={`flex gap-1 items-center text-10px text-red-500 bg-red-50 pl-2 py-2 mt-2 rounded-md tracking-wider`}
                    >
                      <i className={`fa fa-exclamation`} />
                      <span className={`tracking-wider`}>
                        {message.data?.name}
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
                      message.data?.password
                        ? `border-red-300`
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
                  {message.status === 422 && message.data?.password && (
                    <div
                      className={`flex gap-1 items-center text-10px text-red-500 bg-red-50 pl-2 py-2 mt-2 rounded-md tracking-wider`}
                    >
                      <i className={`fa fa-exclamation`} />
                      <span className={`tracking-wider`}>
                        {message.data.password}
                      </span>
                    </div>
                  )}
                </div>
                <div className={`form-input flex flex-col relative text-13px`}>
                  <label
                    className={`absolute ml-2 duration-150 tracking-wide pointer-events-none text-gray-400 ${
                      formValues.ConfirmPass !== ``
                        ? `-top-3 ml-0 text-10px`
                        : `top-0`
                    }`}
                  >
                    Confirm Password
                  </label>
                  <TextField
                    id={id()}
                    type={passType}
                    name={"ConfirmPass"}
                    value={formValues.ConfirmPass}
                    className={`outline-none border-b py-1 text-13px px-2 ${
                      message.data?.confirmPass
                        ? `border-red-300`
                        : `border-gray-400`
                    }`}
                    onChange={handleChange}
                  />
                  {message.status === 422 && message.data?.confirmPass && (
                    <div
                      className={`flex gap-1 items-center text-10px text-red-500 bg-red-50 pl-2 py-2 mt-2 rounded-md tracking-wider`}
                    >
                      <i className={`fa fa-exclamation`} />
                      <span className={`tracking-wider`}>
                        {message.data.confirmPass}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  type={`submit`}
                  className={`outline-none bg-normalBlue py-1 mt-3 rounded-full text-13px text-gray-50 duration-200 hover:bg-primaryBlue`}
                >
                  Submit
                </button>
                <span className={`text-13px ml-2 mt-2`}>
                  Already have an account?
                  <Link
                    to={`/`}
                    className={`ml-1 underline text-normalBlue outline-none`}
                  >
                    Sign In
                  </Link>
                </span>
              </form>
            </div>
          </>
        )}
      </StyledRegisterForm>
      <Image src={School} />
    </div>
  );
};

export default Register;

const StyledRegisterForm = styled.div`
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #1e81b0;
    border-radius: 10px;
  }
`;

const arrayOfYearLvl: IProps = {
  data: [
    {
      value: `Grade 7`,
    },
    {
      value: `Grade 8`,
    },
    {
      value: `Grade 9`,
    },
    {
      value: `Grade 10`,
    },
    {
      value: `Grade 11`,
    },
    {
      value: `Grade 12`,
    },
  ],
};

const arrayOfDivision: IProps = {
  data: [
    {
      value: `CID`,
    },
    {
      value: `SSD`,
    },
    {
      value: `FAD`,
    },
  ],
};
