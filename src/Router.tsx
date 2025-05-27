import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Auth/auth";
import PrivateIndex from "./views/private/Private.index";

import mainRoutes from "./routes/routes";
import Login from "./views/public/Login";
import type IRouter from "./interface/IRouter";
function PrivateRouter({ children }: any) {
  const auth = Auth.checkAuth();
  // const auth = true;
  auth ? <PrivateIndex /> : <Navigate to="/login" />;
  return <PrivateIndex />;
}

export default function MainRouter() {
  return (
    <Routes>
      <Route element={<PrivateRouter />}>
        {mainRoutes.map((data: IRouter) => {
          return <Route path={data.path + "/*"} element={<data.element />} />;
        })}
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
