import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { serverURL } from "../config/config";
import { TextField } from ".";
import { v4 as id } from "uuid";
import { IProps } from "./Register";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";

interface DateProps {
  exclusiveDates?: Array<string>;
  status?: string;
}

interface EventInputValProps {
  Zoom?: string;
  Starttime?: string;
  Endtime: string;
}

interface TodoProps {
  id: string;
}

interface TodoEventsProps {
  todo: Array<TodoProps>;
}

const Events: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);

  let initialValues: EventInputValProps = {
    Zoom: "",
    Starttime: "",
    Endtime: "",
  };

  const navigate = useNavigate();
  const [dates, setDates] = useState<DateProps>({});
  const [formValues, setFormValues] = useState<any>(initialValues);
  const [areas, setAreas] = useState<any>();
  const currectTime = new Date().getTime();

  const todoEvents: TodoEventsProps = {
    todo: [
      {
        id: `1`,
      },
      {
        id: `2`,
      },
      {
        id: `3`,
      },
      {
        id: `4`,
      },
    ],
  };

  const [todos, setTodos] = useState<any>(todoEvents);

  useEffect(() => {
    setDates(dates);
  }, [dates]);

  useEffect(() => {
    setAreas(areas);
  }, [areas]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");

      return;
    }

    axios({
      method: "GET",
      url: `${serverURL}/date`,
      headers: {
        Authorization: `Bearer ${token}`,
        cors: "*",
      },
    }).then((response) => {
      const [{ exclusiveDates, status }] = response.data.result;

      setDates({
        exclusiveDates: exclusiveDates,
        status: status,
      });
    });

    setTimeout(() => {
      getDates(token);
    }, 700);
  }, []);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 900);
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  //To Create New Todo Event

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  const getDates = (token: string) => {
    axios({
      method: "GET",
      url: `${serverURL}/area`,
      headers: {
        Authorization: `Bearer ${token}`,
        cors: "*",
      },
    }).then((response) => {
      const { result } = response.data;

      setAreas(result);
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      {loader ? (
        <div
          className={`w-admin-page h-screen flex justify-center items-center`}
        >
          <HashLoader size={40} color={`#064b86`} loading={loader} />
        </div>
      ) : (
        <StyledEvent
          className={`w-admin-page h-screen text-14px p-6 overflow-y-auto`}
        >
          <div
            className={`text-13px flex pb-1 cursor-pointer tracking-wide font-semibold border-b border-normalBlue`}
          >
            <div
              className={`flex items-center justify-center gap-1 text-normalBlue duration-150 hover:text-primaryBlue mr-2 border-r-2 border-normalBlue w-32`}
            >
              <i className={`fa fa-plus`} />
              <span>Add New Dates</span>
            </div>
            <div
              className={`flex items-center justify-center gap-1 text-normalBlue duration-150 hover:text-primaryBlue mr-2 border-r-2 border-normalBlue w-32`}
            >
              <i className={`fa fa-plus`} />
              <span>Add New Area</span>
            </div>
            <div
              className={`flex items-center ml-1 gap-1 text-normalBlue duration-150 hover:text-primaryBlue w-32`}
            >
              <i className={`fa fa-pencil`} />
              <span>Update Events</span>
            </div>
          </div>
          <div className={`event-body`}>
            <div className={`relative`}>
              <div className={`absolute w-full`}>
                <form onSubmit={onSubmit}>
                  <div className={`form-group text-14px pt-10 px-6 flex gap-6`}>
                    <div className={`form-input w-auto`}>
                      <select
                        name=""
                        className={`outline-none py-1 px-2 w-40 bg-white border-b border-gray-400`}
                        onChange={(e) => console.log(e.currentTarget.value)}
                      >
                        {dates.exclusiveDates?.map((props) => {
                          return <option value={props}>{props}</option>;
                        })}
                      </select>
                      <label
                        className={`block text-11px tracking-wide mt-1 text-center`}
                      >
                        Exclusive Dates
                      </label>
                    </div>
                    <div
                      className={`form-input flex flex-col relative text-13px duration-200 w-full`}
                    >
                      <label
                        className={`absolute ml-2 duration-150 text-13px tracking-wide pointer-events-none text-gray-400 ${
                          formValues.Zoom !== ``
                            ? `-top-3 ml-0 text-10px`
                            : `top-0`
                        }`}
                      >
                        Zoom link
                      </label>
                      <TextField
                        id={id()}
                        type={"text"}
                        name={"Zoom"}
                        value={formValues.Zoom}
                        autoFocus={true}
                        className={`outline-none border-b py-1 text-13px px-2 border-gray-400`}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={`flex flex-col`}>
                    <div
                      className={`my-6 h-auto w-full border-b border-gray-400 px-6 pb-3 pt-6`}
                    >
                      <li
                        className={`font-semibold text-13px text-normalBlue tracking-wide mb-6`}
                      >
                        Create Event
                      </li>
                      <div className={`options flex gap-10 w-full`}>
                        <div className={`form-input w-auto`}>
                          <select
                            name=""
                            className={`outline-none py-1 px-2 w-64 bg-white border-b border-gray-400`}
                            onChange={(e) => console.log(e.currentTarget.value)}
                          >
                            {_.map(areas, (data) => {
                              return (
                                <option key={data.id} value={data.area}>
                                  {data.area}
                                </option>
                              );
                            })}
                          </select>
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Select Area
                          </label>
                        </div>
                        <div className={`form-input w-auto`}>
                          <select
                            name=""
                            className={`outline-none py-1 px-2 w-56 bg-white border-b border-gray-400`}
                            onChange={(e) => console.log(e.currentTarget.value)}
                          >
                            {arrayOfYearLvl.data.map((props) => {
                              return (
                                <option value={props.value}>
                                  {props.value}
                                </option>
                              );
                            })}
                            ;
                          </select>
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Host of Event
                          </label>
                        </div>
                        <div
                          className={`form-input flex flex-col relative text-13px duration-200`}
                        >
                          <TextField
                            id={id()}
                            type={"time"}
                            name={"StartTime"}
                            value={formValues.StartTime}
                            className={`outline-none border-b py-1 text-13px px-2 border-gray-400 w-48 bg-white`}
                            onChange={handleChange}
                            // min={moment().min(new Date())}
                          />
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Start time
                          </label>
                        </div>
                        <div
                          className={`form-input flex flex-col relative text-13px duration-200`}
                        >
                          <TextField
                            id={id()}
                            type={"time"}
                            name={"Endtime"}
                            value={formValues.Endtime}
                            className={`outline-none border-b py-1 text-13px px-2 border-gray-400 w-48 bg-white`}
                            onChange={handleChange}
                          />
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            End time
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Research Congress */}

                    <div
                      className={`my-6 h-auto w-full border-b border-gray-400 px-6 pb-3 pt-6`}
                    >
                      <li
                        className={`font-semibold text-13px text-normalBlue tracking-wide mb-6`}
                      >
                        Create Event
                      </li>
                      <div className={`options flex gap-10 w-full`}>
                        <div className={`form-input w-auto`}>
                          <select
                            name=""
                            className={`outline-none py-1 px-2 w-64 bg-white border-b border-gray-400`}
                            onChange={(e) => console.log(e.currentTarget.value)}
                          >
                            {_.map(areas, (data) => {
                              return (
                                <option key={data.id} value={data.area}>
                                  {data.area}
                                </option>
                              );
                            })}
                          </select>
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Select Area
                          </label>
                        </div>
                        <div className={`form-input w-auto`}>
                          <select
                            name=""
                            className={`outline-none py-1 px-2 w-56 bg-white border-b border-gray-400`}
                            onChange={(e) => console.log(e.currentTarget.value)}
                          >
                            {arrayOfYearLvl.data.map((props) => {
                              return (
                                <option value={props.value}>
                                  {props.value}
                                </option>
                              );
                            })}
                            ;
                          </select>
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Host of Event
                          </label>
                        </div>
                        <div
                          className={`form-input flex flex-col relative text-13px duration-200`}
                        >
                          <TextField
                            id={id()}
                            type={"time"}
                            name={"StartTime"}
                            value={formValues.StartTime}
                            className={`outline-none border-b py-1 text-13px px-2 border-gray-400 w-48 bg-white`}
                            onChange={handleChange}
                            // min={moment().min(new Date())}
                          />
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Start time
                          </label>
                        </div>
                        <div
                          className={`form-input flex flex-col relative text-13px duration-200`}
                        >
                          <TextField
                            id={id()}
                            type={"time"}
                            name={"Endtime"}
                            value={formValues.Endtime}
                            className={`outline-none border-b py-1 text-13px px-2 border-gray-400 w-48 bg-white mr-6`}
                            onChange={handleChange}
                          />
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            End time
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Research Exhibits */}

                    <div
                      className={`my-6 h-auto w-full border-b border-gray-400 px-6 pb-3 pt-6`}
                    >
                      <li
                        className={`font-semibold text-13px text-normalBlue tracking-wide mb-6`}
                      >
                        Create Event
                      </li>
                      <div className={`options flex gap-10 w-full`}>
                        <div className={`form-input w-auto`}>
                          <select
                            name=""
                            className={`outline-none py-1 px-2 w-64 bg-white border-b border-gray-400`}
                            onChange={(e) => console.log(e.currentTarget.value)}
                          >
                            {_.map(areas, (data) => {
                              return (
                                <option key={data.id} value={data.area}>
                                  {data.area}
                                </option>
                              );
                            })}
                          </select>
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Select Area
                          </label>
                        </div>
                        <div className={`form-input w-auto`}>
                          <select
                            name=""
                            className={`outline-none py-1 px-2 w-56 bg-white border-b border-gray-400`}
                            onChange={(e) => console.log(e.currentTarget.value)}
                          >
                            {arrayOfYearLvl.data.map((props) => {
                              return (
                                <option value={props.value}>
                                  {props.value}
                                </option>
                              );
                            })}
                            ;
                          </select>
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Host of Event
                          </label>
                        </div>
                        <div
                          className={`form-input flex flex-col relative text-13px duration-200`}
                        >
                          <TextField
                            id={id()}
                            type={"time"}
                            name={"StartTime"}
                            value={formValues.StartTime}
                            className={`outline-none border-b py-1 text-13px px-2 border-gray-400 w-48 bg-white`}
                            onChange={handleChange}
                            // min={moment().min(new Date())}
                          />
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Start time
                          </label>
                        </div>
                        <div
                          className={`form-input flex flex-col relative text-13px duration-200`}
                        >
                          <TextField
                            id={id()}
                            type={"time"}
                            name={"Endtime"}
                            value={formValues.Endtime}
                            className={`outline-none border-b py-1 text-13px px-2 border-gray-400 w-48 bg-white`}
                            onChange={handleChange}
                          />
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            End time
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Makers Fest */}

                    <div
                      className={`my-6 h-auto w-full border-b border-gray-400 px-6 pb-3 pt-6`}
                    >
                      <li
                        className={`font-semibold text-13px text-normalBlue tracking-wide mb-6`}
                      >
                        Create Event
                      </li>
                      <div className={`options flex gap-10 w-full`}>
                        <div className={`form-input w-auto`}>
                          <select
                            name=""
                            className={`outline-none py-1 px-2 w-64 bg-white border-b border-gray-400`}
                            onChange={(e) => console.log(e.currentTarget.value)}
                          >
                            {_.map(areas, (data) => {
                              return (
                                <option key={data.id} value={data.area}>
                                  {data.area}
                                </option>
                              );
                            })}
                          </select>
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Select Area
                          </label>
                        </div>
                        <div className={`form-input w-auto`}>
                          <select
                            name=""
                            className={`outline-none py-1 px-2 w-56 bg-white border-b border-gray-400`}
                            onChange={(e) => console.log(e.currentTarget.value)}
                          >
                            {arrayOfYearLvl.data.map((props) => {
                              return (
                                <option value={props.value}>
                                  {props.value}
                                </option>
                              );
                            })}
                            ;
                          </select>
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Host of Event
                          </label>
                        </div>
                        <div
                          className={`form-input flex flex-col relative text-13px duration-200`}
                        >
                          <TextField
                            id={id()}
                            type={"time"}
                            name={"StartTime"}
                            value={formValues.StartTime}
                            className={`outline-none border-b py-1 text-13px px-2 border-gray-400 w-48 bg-white`}
                            onChange={handleChange}
                            // min={moment().min(new Date())}
                          />
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            Start time
                          </label>
                        </div>
                        <div
                          className={`form-input flex flex-col relative text-13px duration-200`}
                        >
                          <TextField
                            id={id()}
                            type={"time"}
                            name={"Endtime"}
                            value={formValues.Endtime}
                            className={`outline-none border-b py-1 text-13px px-2 border-gray-400 w-48 bg-white`}
                            onChange={handleChange}
                          />
                          <label
                            className={`block text-11px tracking-wide mt-1 text-center`}
                          >
                            End time
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`w-full flex justify-end`}>
                    <button
                      type={`submit`}
                      className={`outline-none bg-normalBlue py-1 mt-3 rounded-md text-13px text-gray-50 duration-200 hover:bg-primaryBlue w-48 mb-10`}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </StyledEvent>
      )}
    </>
  );
};

export default Events;

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

const StyledEvent = styled.div`
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #1e81b0;
    border-radius: 10px;
  }
`;
