import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { serverURL } from "../config/config";

const plenary = require(`../assets/images/plenary.jpg`);
const lounge = require(`../assets/images/lounge.jpg`);
const inforDesk = require(`../assets/images/info2.jpg`);
const crest = require(`../assets/images/crest.jpg`);
const gym = require(`../assets/images/gym.jpg`);
const SMT = require(`../assets/images/smt2.png`);
const admin = require(`../assets/images/admin.jpg`);

interface PopoverProps {
  image: string;
  onShow: boolean;
}

export interface UserProps {
  id?: string;
  role?: string;
}

const Portal: React.FC = () => {
  const [loader, setLoader] = useState<boolean>();
  const [signout, setSignout] = useState<boolean>(false);
  const [dates, setDates] = useState<any>();
  const [user, setUser] = useState<UserProps>({});

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
                  Programs
                </h2>
              </StyledMenu>
              <StyledMenu
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
                  Research Congress
                </h2>
              </StyledMenu>
            </div>
            <div
              className={`menu flex flex-col items-center gap-10 w-full py-4 md:py-10 lg:py-10 xl:py-10`}
            >
              <StyledMenu
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
                  Research Exhibits
                </h2>
              </StyledMenu>
              <StyledMenu
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
