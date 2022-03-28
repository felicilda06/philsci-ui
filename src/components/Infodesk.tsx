import React from "react";
import { Link } from "react-router-dom";

const info1 = require(`../assets/images/infodesk1.png`);
const info2 = require(`../assets/images/infodesk2.png`);
const info3 = require(`../assets/images/infodesk3.png`);
const info4 = require(`../assets/images/infodesk4.png`);
const info5 = require(`../assets/images/infodesk5.png`);
const info6 = require(`../assets/images/infodesk6.png`);

const Infodesk: React.FC = () => {
  return (
    <div className={`relative p-10 bg-gray-600`}>
      <Link
          to={`/portal`}
          className={`block text-center bg-normalBlue py-2 outline-none rounded-full duration-150 hover:bg-primaryBlue text-gray-50 mb-10`}
        >
          <button className={``}>
            <i className={`fa fa-external-link`} /> Back to Portal
          </button>
        </Link>
      <div className={`h-auto w-auto overscroll-auto`}>
        <div className={`flex justify-center items-center w-full gap-10`}>
          <div className={`flex flex-col gap-5`}>
            <img src={info1} className={`w-full h-full`} />
            <img src={info2} className={`w-full h-full`} />
            <img src={info3} className={`w-full h-full`} />
          </div>
          <div className={`flex flex-col gap-5`}>
            <img src={info4} className={`w-full h-full`} />
            <img src={info5} className={`w-full h-full`} />
            <img src={info6} className={`w-full h-full`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infodesk;
