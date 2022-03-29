import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { serverURL } from "../config/config";
import _ from "lodash";
// import { Carousel } from "react-responsive-carousel";

const plenary = require(`../assets/images/plenary.jpg`);
const lounge = require(`../assets/images/lounge.jpg`);
const inforDesk = require(`../assets/images/info2.jpg`);
const crest = require(`../assets/images/crest.jpg`);
const gym = require(`../assets/images/gym.jpg`);
const SMT = require(`../assets/images/smt2.png`);
const admin = require(`../assets/images/admin.jpg`);
const unavailable = require(`../assets/images/unavailable.jpg`);

type EventProps =
  | `Programs`
  | `Research Congress`
  | `Research Exhibits`
  | `Interactive Games`
  | `Info Desk`;

type TStatus = `enable` | `disable`;

export interface UserProps {
  id?: string;
  role?: string;
}
interface PopupProps {
  onShow?: boolean;
  image?: string;
  component?: EventProps;
  status?: TStatus;
}

interface EventDataProps {
  data?: any;
  code?: number;
}

interface GetEventProps {
  event?: EventProps;
  status?: TStatus;
}

const Portal: React.FC = () => {
  const [loader, setLoader] = useState<boolean>();
  const [signout, setSignout] = useState<boolean>(false);
  const [dates, setDates] = useState<any>();
  const [user, setUser] = useState<UserProps>({});
  const [popup, setPopup] = useState<PopupProps>({
    onShow: false,
  });

  const [modal, setModal] = useState<boolean | undefined>(popup.onShow);
  const [fetchEvent, setFetchEvent] = useState<EventDataProps>({});

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 900);
  }, []);

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
      const { result } = response.data;
      const { _id, role } = response.data.data;

      setDates(result);
      setUser({
        id: _id,
        role: role,
      });
    });
  }, []);

  useEffect(() => {
    setPopup(popup);
  }, [popup]);

  useEffect(() => {
    setFetchEvent(fetchEvent);
  }, [fetchEvent]);

  const onClickPopup = (props: PopupProps) => {
    const { onShow, component, image, status } = props;

    setModal(onShow);
    setPopup({
      image: image,
      component: component,
    });

    getEvent({
      event: component,
      status: status,
    });
  };

  const getEvent = (props: GetEventProps) => {
    const token = sessionStorage.getItem("token");

    const { status, event } = props;

    axios({
      method: "POST",
      url: `${serverURL}/event/specific`,
      data: {
        status: status,
        event: event,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        cors: "*",
      },
    })
      .then((response) => {
        const { events, status } = response.data;

        setFetchEvent({
          data: events,
          code: status,
        });
      })
      .catch((err) => {
        const { status } = err.response.data;

        setFetchEvent({
          data: null,
          code: status,
        });
      });
  };

  return (
    <>
      {loader ? (
        <div className={`w-full h-screen flex justify-center items-center`}>
          <HashLoader size={40} color={`#064b86`} loading={loader} />
        </div>
      ) : (
        <div
          className={`w-screen h-screen bg-cover bg-no-repeat relative`}
          style={{
            backgroundImage: `url(${SMT})`,
            backgroundPosition: `bottom`,
          }}
        >
          <StyledOverlay
            className={`overlay w-screen h-full absolute flex items-center gap-5 px-10 flex-col overflow-y-auto md:flex-row`}
          >
            <div
              className={`menu flex flex-col items-center gap-10 w-full py-4 md:py-10 lg:py-10 xl:py-10`}
            >
              <StyledMenu
                onClick={() => {
                  onClickPopup({
                    onShow: true,
                    image: plenary,
                    status: `enable`,
                    component: `Programs`,
                  });
                }}
                title={`Auditorium`}
                className={`auditorium duration-150 flex flex-col justify-center bg-white gap-4 pb-4 cursor-pointer rounded-xl`}
              >
                <img
                  src={plenary}
                  alt="Auditorium"
                  className={`w-menu-size h-img-modal rounded-tr-xl rounded-tl-xl object-cover`}
                />
                <h2
                  className={`text-center font-semibold text-primaryBlue tracking-wider uppercase text-14px`}
                >
                  Career Talk / Programs
                </h2>
              </StyledMenu>
              <StyledMenu
                onClick={() => {
                  onClickPopup({
                    onShow: true,
                    image: crest,
                    status: `enable`,
                    component: `Research Exhibits`,
                  });
                }}
                title={`Crest Building`}
                className={`student-lounge duration-150 flex flex-col justify-center bg-white gap-2 pb-4 cursor-pointer rounded-xl`}
              >
                <img
                  src={crest}
                  alt="Student-Lounge"
                  className={`w-menu-size h-img-modal rounded-tr-xl rounded-tl-xl object-cover`}
                />
                <h2
                  className={`text-center font-semibold text-primaryBlue tracking-wider uppercase text-14px`}
                >
                  Research Exhibits
                </h2>
              </StyledMenu>
            </div>
            <div
              className={`menu flex flex-col items-center gap-10 w-full py-4 md:py-10 lg:py-10 xl:py-10`}
            >
              <StyledMenu
                onClick={() => {
                  onClickPopup({
                    onShow: true,
                    image: inforDesk,
                    component: `Info Desk`,
                    status: "enable",
                  });
                }}
                className={`info-desk duration-150 flex flex-col justify-center bg-white gap-4 pb-4 cursor-pointer rounded-xl`}
              >
                <img
                  src={inforDesk}
                  alt="Student-Lounge"
                  className={`w-menu-size border-b border-gray-100 h-img-modal rounded-tr-xl rounded-tl-xl object-contain`}
                />
                <h2
                  className={`text-center font-semibold text-primaryBlue tracking-wider uppercase text-14px`}
                >
                  Information Desk
                </h2>
              </StyledMenu>
              {user.role === `admin` && (
                <StyledMenu
                  onClick={() => navigate(`/admin`)}
                  className={`info-desk duration-150 flex flex-col justify-center bg-white gap-4 pb-4 cursor-pointer rounded-xl`}
                >
                  <img
                    src={admin}
                    alt="Student-Lounge"
                    className={`w-menu-size border-b border-gray-100 h-img-modal rounded-tr-xl rounded-tl-xl object-contain`}
                  />
                  <h2
                    className={`text-center font-semibold text-primaryBlue tracking-wider uppercase text-14px`}
                  >
                    Administrative Tools
                  </h2>
                </StyledMenu>
              )}
            </div>
            <div
              className={`menu flex flex-col items-center gap-10 w-full py-4 md:py-10 lg:py-10 xl:py-10`}
            >
              <StyledMenu
                onClick={() => {
                  onClickPopup({
                    onShow: true,
                    image: lounge,
                    status: `enable`,
                    component: `Research Congress`,
                  });
                }}
                title={`Student Lounge`}
                className={`crest-building duration-150 flex flex-col justify-center bg-white gap-2 pb-4 cursor-pointer rounded-xl`}
              >
                <img
                  src={lounge}
                  alt="Auditorium"
                  className={`w-menu-size h-img-modal rounded-tr-xl rounded-tl-xl object-cover`}
                />
                <h2
                  className={`text-center font-semibold text-primaryBlue tracking-wider uppercase text-14px`}
                >
                  Research Congress
                </h2>
              </StyledMenu>
              <StyledMenu
                onClick={() => {
                  onClickPopup({
                    onShow: true,
                    image: gym,
                    status: `enable`,
                    component: `Interactive Games`,
                  });
                }}
                title={`Gymnasium`}
                className={`gym duration-150 flex flex-col justify-center bg-white gap-4 pb-4 cursor-pointer rounded-xl`}
              >
                <img
                  src={gym}
                  alt="Student-Lounge"
                  className={`w-menu-size h-img-modal rounded-tr-xl rounded-tl-xl object-cover`}
                />
                <div>
                  <h2
                    className={`text-center font-semibold text-primaryBlue tracking-wider uppercase text-14px`}
                  >
                    Interactive Games /
                  </h2>
                  <h2
                    className={`text-center font-semibold text-primaryBlue tracking-wider uppercase text-14px`}
                  >
                    Makers Fest
                  </h2>
                </div>
              </StyledMenu>
            </div>
          </StyledOverlay>
          <div
            onClick={() => setSignout(true)}
            title={`Sign-out`}
            className={`fixed duration-150 cursor-pointer bottom-8 right-8 flex justify-center items-center rounded-full bg-primaryBlue text-gray-50 w-12 h-12 gap-2 shadow-lg shadow-gray-800 hover:right-6`}
          >
            <i className="fa fa-sign-out text-xl" aria-hidden="true"></i>
          </div>
        </div>
      )}
      {
        // Modal Logout Popup
        signout && (
          <div
            className={`h-screen w-screen absolute z-10 top-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center`}
          >
            <div
              className={`modal h-auto w-auto bg-white rounded-xl shadow-xl shadow-gray-700 p-10 relative`}
            >
              <i
                onClick={() => setSignout(false)}
                className={`fa fa-close absolute top-3 right-4 text-gray-700 cursor-pointer duration-150 hover:text-gray-800`}
              />
              <div className={`modal-body flex items-center gap-2 mt-3`}>
                <i className={`fa fa-question-circle text-3xl`} />
                <span
                  className={`tracking-wide text-13px text-gray-800 font-semibold`}
                >
                  Are you sure you want to exit?
                </span>
              </div>
              <div
                className={`modal-footer flex gap-2 justify-center mt-6 text-gray-100 text-13px`}
              >
                <button
                  onClick={() => {
                    sessionStorage.clear();
                    navigate(`/`);
                  }}
                  className={`bg-normalBlue outline-none py-1 text-center px-6 rounded-full duration-150 hover:bg-primaryBlue`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setSignout(false)}
                  className={`bg-red-400 outline-none py-1 text-center px-6 rounded-full duration-150 hover:bg-red-500`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Modal Menu */}
      {modal && (
        <>
          <StyledModal className={`overlay w-screen h-screen absolute top-0`}>
            <div
              className={`relative z-10 w-auto h-full flex justify-center items-center px-10`}
            >
              <div
                className={`bg-gray-50 p-10 relative shadow-lg shadow-gray-700 rounded-xl`}
              >
                <i
                  title={`Close`}
                  className={`fa fa-close absolute right-5 top-4 duration-150 text-gray-700 cursor-pointer hover:text-gray-900`}
                  onClick={() => {
                    onClickPopup({
                      onShow: false,
                    });
                  }}
                />
                <div className={`relative`}>
                  <div className={`flex justify-center`}>
                    {fetchEvent.data &&
                    fetchEvent.data.event === `Info Desk` ? (
                      <div className={` h-auto w-auto`}>
                        <small
                          className={`text-red-400 font-semibold text-lg tracking-wide text-center`}
                        >
                          Sizes of image is too large...
                        </small>
                        <Link
                          to={`/info-desk`}
                          className={`block text-center w-full mt-10 bg-normalBlue py-1 outline-none rounded-full duration-150 hover:bg-primaryBlue text-gray-50`}
                        >
                          <button className={``}>
                            <i className={`fa fa-external-link`} /> Preview
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <img
                        src={popup.image}
                        alt=""
                        className={`w-modal-img-size h-auto mt-4`}
                      />
                    )}
                  </div>
                  <div>
                    {fetchEvent.data &&
                      fetchEvent.data.event === `Research Exhibits` && (
                        <div className={`mt-6`}>
                          <span className={`tedxt-13px text-gray-800`}>
                            For Research Exhibits, please click the button
                            below.
                          </span>
                          <a
                            href={`https://www.facebook.com/pisayevc`}
                            className={`outline-none py-1 text-center bg-normalBlue text-gray-50 mt-10 rounded-full duration-150 hover:bg-primaryBlue block`}
                          >
                            Click here
                          </a>
                        </div>
                      )}
                    {fetchEvent.data &&
                      fetchEvent.code === 200 &&
                      !!fetchEvent.data.link && (
                        <>
                          <h2
                            className={`text-center mt-8 font-semibold text-15px tracking-wide text-normalBlue`}
                          >
                            {fetchEvent.data.topic}
                          </h2>
                          <div
                            className={`text-13px tracking-wide text-gray-900 mt-5 flex flex-col gap-1`}
                          >
                            <h3>Date: {fetchEvent.data.date}</h3>
                            <h3>
                              Time: {fetchEvent.data.startTime} -{" "}
                              {fetchEvent.data.endTime}
                            </h3>
                            <h2 className={`mt-6 text-gray-800 font-semibold`}>
                              Join Zoom Meeting
                            </h2>
                            <span>Meeting ID: {fetchEvent.data.meetingId}</span>
                            <span>Passcode: {fetchEvent.data.passCode}</span>
                            <div>
                              <h2
                                className={`mt-4 font-semibold text-normalBlue`}
                              >
                                Colaborator :
                              </h2>
                              {_.map(fetchEvent.data.participant, (data) => {
                                return <li>{!!data ? data : `None`}</li>;
                              })}
                            </div>
                            <div>
                              {fetchEvent.data.event ===
                                `Interactive Games` && (
                                <div>
                                  <Link
                                    to={`/winners`}
                                    className={`block text-center w-full mt-10  py-1 outline-none rounded-full duration-150 underline text-normalBlue`}
                                  >
                                    See Winners
                                  </Link>
                                  <Link
                                    to={`/prizes`}
                                    className={`block text-center w-full mt-2  py-1 outline-none rounded-full duration-150 underline text-normalBlue`}
                                  >
                                    See Prizes
                                  </Link>
                                </div>
                              )}
                            </div>
                            <a
                              href={fetchEvent.data.link}
                              className={`outline-none py-1 text-center bg-normalBlue text-gray-50 mt-10 rounded-full duration-150 hover:bg-primaryBlue`}
                            >
                              Join Meeting
                            </a>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </StyledModal>
        </>
      )}
    </>
  );
};

export default Portal;

const StyledOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledMenu = styled.div`
  :hover {
    box-shadow: 5px 8px 10px rgba(66, 152, 228, 0.5);
    transform: scale(1.1);
  }
`;

const StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
`;
