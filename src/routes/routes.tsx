import { MdOutlineSecurity, MdSpaceDashboard } from "react-icons/md";
import { FaFingerprint, FaHome } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import type IRouter from "../interface/IRouter";
import Dashboard from "../views/private/Dashboard/Dashboard";
import Invigilator from "../views/private/Invigilator/Invigilator";




const mainRoutes: IRouter[] = [

 
  {
    path: "dashboard",
    navbarShow: true,
    element: Dashboard,
    name: "Dashboard",
    icon: <FaHome size={20} />,
  },
  {
    path: "invigilator",
    navbarShow: true,
    element: Invigilator,
    name: "Invigilator",
    icon: <FaHome size={20} />,
  },
 
  
];

export default mainRoutes;
