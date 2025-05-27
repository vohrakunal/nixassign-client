import { MdOutlineSecurity, MdSpaceDashboard } from "react-icons/md";

import Dashboard from "../views/private/Dashboard/Dashboard";
import { FaFingerprint, FaHome } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import type IRouter from "../interface/IRouter";




const mainRoutes: IRouter[] = [

 
  {
    path: "dashboard",
    navbarShow: true,
    element: Dashboard,
    name: "Dashboard",
    icon: <FaHome size={20} />,
  },
 
  
];

export default mainRoutes;
