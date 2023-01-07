
import {MdOutlineDashboard, MdOutlineMenuBook, MdFormatListBulleted} from "react-icons/md";
import {FaUserFriends} from "react-icons/fa";

import Dashboard from "./views/Dashboard.js";
import Notifications from "./views/Notifications.js";
import Icons from "./views/Shop.js";
import Typography from "./views/Customers.js";
import TableList from "./views/Orders.js";
import Maps from "./views/Map.js";
import UserPage from "./views/User.js";
import UpgradeToPro from "./views/Upgrade.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdOutlineDashboard className="me-2" size={20}/>,
    component: <Dashboard/>,
    layout: "/admin",
  },
  {
    path: "/shop",
    name: "Shop",
    icon: <MdOutlineMenuBook className="me-2" size={20}/>,
    component: <Icons/>,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: <MdFormatListBulleted className="me-2" size={20}/>,
    component: <TableList/>,
    layout: "/admin",
  },
  /*{
    path: "/customers",
    name: "Customers",
    icon:  <FaUserFriends className="me-2" size={20}/>,
    component: <Typography/>,
    layout: "/admin",
  }*/
];

export default routes;
