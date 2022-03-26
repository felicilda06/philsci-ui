import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Accounts: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 900);
  }, []);

  return (
    <>
      {loader ? (
        <div className={`w-admin-page h-screen flex justify-center items-center`}>
          <HashLoader size={40} color={`#064b86`} loading={loader} />
        </div>
      ) : (
        <div className={`w-admin-page h-screen`}>Accounts</div>
      )}
    </>
  );
};

export default Accounts;
