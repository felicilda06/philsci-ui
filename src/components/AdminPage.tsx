import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdminTools } from ".";
import { serverURL } from "../config/config";
import { useNavigate } from "react-router-dom";
import { UserProps } from "./Portal";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps>({});

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
      const { _id, role } = response.data.data;

      setUser({
        id: _id,
        role: role,
      });
    });
  }, []);

  return <>{user.role !== `admin` ? navigate(`/portal`) : <AdminTools />}</>;
};

export default AdminPage;
