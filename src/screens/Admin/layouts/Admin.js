
import React from "react";
import {
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import {Card} from "react-bootstrap";

import PerfectScrollbar from "perfect-scrollbar";
import {useLocation, Outlet} from "react-router-dom";

import DemoNavbar from "../components/Navbars/DemoNavbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";

import routes from "../routes.js";

var ps;

function Admin(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("danger");
  const mainPanel = React.useRef();
  const location = useLocation();
  
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <div className="content">
          <div className="admin-card">
            <Outlet/>
          </div>
        </div>
      </div>
      {/**<FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */}
    </div>
  );
}

export default Admin;
