import React from "react";
import { Button, Modal, Container, Row, Col, Card } from "react-bootstrap";

interface AddInvigilatorModalProps {
  show: any;
  handleClose: () => void;
}

export default function ResetPasswordModal(props: AddInvigilatorModalProps) {
  const email = props.show?.email || "";
  const password = props.show?.password || "";

  return (
    <Modal
      show={!!props.show}
      onHide={props.handleClose}
      backdrop="static"
      animation
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100">Credentials</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card className="text-center shadow-sm border-0">
          <Card.Body>
            <Container>
              <Row className="mb-3">
                <Col xs={12}>
                  <strong>Email:</strong>
                  <div className="text-muted">{email}</div>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <strong>Password:</strong>
                  <div className="text-muted">{password}</div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-primary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
