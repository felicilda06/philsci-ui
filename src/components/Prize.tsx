import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const Prizes: React.FC = () => {
  const p1 = require(`../assets/images/prize1.png`);
  const p2 = require(`../assets/images/prize2.png`);
  const p3 = require(`../assets/images/prize3.png`);
  const p4 = require(`../assets/images/prize4.png`);
  const width = window.innerWidth;
  const height = window.innerHeight
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
  });

  return (
    <div className={`h-auto w-full px-10 py-10 relative`}>
      <div className={`absolute top-0 left-0`}>
        <Confetti width={width} height={height}/>
      </div>
      <h1
        className={`text-center tracking-wide text-2xl text-primaryBlue mt-4 font-semibold`}
      >
        <i className={`fa fa-sun-o mr-2 text-yellow-700`}></i>
        2022 SMT Fair - Prizes
      </h1>
      <div>
        <Link
          to={`/portal`}
          className={`block text-center w-full mt-10 bg-normalBlue py-1 outline-none text-13px rounded-full duration-150 hover:bg-primaryBlue text-gray-50`}
        >
          <button className={``}>
            <i className={`fa fa-external-link`} /> Back to Portal
          </button>
        </Link>
        <div
          className={`physics mt-10 pb-10 bg-gray-700 text-gray-100 pt-10 overflow-y-auto h-winner w-auto flex justify-center gap-10 pr-4 border border-gray-400 pl-5 md:pl-20 lg:pl-20 xl:pl-20`}
        >
          <div className={`flex flex-col gap-4`}>
            <img src={p1} alt="" />
            <img src={p2} alt="" />
          </div>
          <div className={`flex flex-col gap-4`}>
            <img src={p3} alt="" />
            <img src={p4} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prizes;
