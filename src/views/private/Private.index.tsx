import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Topbar from "../../components/Topbar/Topbar";



export default function PrivateIndex() {
  return (
    <div className="private-layout">
      <Topbar />
      <div className="main-content">
        <Container fluid className="content-container">
          <Outlet />
        </Container>
      </div>
    </div>
  );
}
