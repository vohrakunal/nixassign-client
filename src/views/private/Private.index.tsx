import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";



export default function PrivateIndex() {
  return (
    <div className="private-layout">
      <div className="main-content">
        <Container fluid className="content-container">
          <Outlet />
        </Container>
      </div>
    </div>
  );
}
