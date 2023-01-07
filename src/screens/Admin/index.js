
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/paper-dashboard.css";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "./layouts/Admin.js";

export default function Main({setFooterOpen, user}){
  const navigate = useNavigate();

  useEffect(() => {

    if (!user){
      navigate("/login");
    }

    setFooterOpen(false);
    return () => setFooterOpen(true);
  }, []);

  return <AdminLayout />
}
