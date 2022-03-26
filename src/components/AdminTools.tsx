import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Renderer } from ".";

const adminImg = require(`../assets/images/user.png`);

interface LinkProps {
  key?: string;
}

const AdminTools: React.FC = () => {
  const [component, setComponent] = useState<string | undefined>();
  const [onHover, setOnHover] = useState<LinkProps>({
    key: `dashboard`,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setOnHover(onHover);
  }, [onHover]);

  return (
    <div className={`flex relative`}>
      {/* <i className={`fa fa-bars absolute`} /> */}
      <div
        className={`h-screen bg-primaryBlue border-r border-gray-400 py-8 duration-150 w-full sm:w-admin-menu-resize md:w-admin-menu-resize lg:w-admin-menu`}
      >
        <div className={`flex flex-col items-center gap-2`}>
          <div
            className={`w-28 h-28 relative bg-contain bg-blend-normal bg-center rounded-full`}
            style={{ backgroundImage: `url(${adminImg})` }}
          >
            <i
              className={`fa fa-camera absolute right-5 bottom-3 text-gray-600 duration-150 cursor-pointer hover:text-gray-700`}
            />
          </div>
          <span
            className={`text-13px text-gray-50 border-b border-gray-50 w-14 text-center tracking-wider cursor-pointer`}
          >
            Profile
          </span>
        </div>
        <div className={`links mt-11 text-14px tracking-wide text-gray-50`}>
          <ul className={`flex flex-col`}>
            {arrayOfLinks.links.map((props) => {
              return (
                <li
                  onClick={() => {
                    props.component === undefined
                      ? navigate(`/portal`)
                      : setComponent(props.component);
                    setOnHover({
                      key: props.component,
                    });
                  }}
                  className={`border-b border-gray-50 py-3 pl-3 cursor-pointer duration-150 relative ${
                    onHover?.key === props.component
                      ? `bg-normalBlue`
                      : `bg-primaryBlue`
                  } hover:bg-normalBlue`}
                >
                  {props.text}
                  <i
                    className={`${props.icon} absolute right-5 text-gray-300 text-13px top-4`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Renderer component={component} className={`hidden lg:block md:block`} />
    </div>
  );
};

export default AdminTools;

const arrayOfLinks = {
  links: [
    {
      text: `Dashboard`,
      icon: `fa fa-home`,
      component: `dashboard`,
    },
    {
      text: `Event`,
      icon: `fa fa-calendar`,
      component: `event`,
    },
    {
      text: `Manage Accounts`,
      icon: `fa fa-user-md`,
      component: `accounts`,
    },
    {
      text: `Portal`,
      icon: `fa fa-product-hunt`,
    },
  ],
};
