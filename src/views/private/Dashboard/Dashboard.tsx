import React, { useState } from "react";
import { Badge, Button, Card, Tab, Table, Tabs } from "react-bootstrap";
import { FaCircleDot } from "react-icons/fa6";
import TablePagination from "../../../components/Pagination/Table.pagination";

export default function Dashboard() {
  const [key, setKey] = useState("home");
  return (
    <div>
      <Card
        className="mt-2"
        style={{
          backgroundColor: "#dde5f0",
        }}
      >
        <>
          <div className="d-flex justify-content-end"></div>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <div className="d-flex justify-content-start align-items-center">
                <span>
                  Name: <b>Exam name</b>
                </span>
              </div>
              <div>
                <span>
                  Subject: <b>subject name </b>
                </span>
              </div>
            </div>

            <div>
              <div>
                <span>
                  Created at : <b>date </b>
                </span>
              </div>

              <div>
                <span>
                  Last updated at : <b>last date </b>
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center mt-3 mb-3">
            <>
              <Badge bg="secondary" className="me-2">
                {""}
              </Badge>
            </>
          </div>
          <div>
            <span>
              Status:{" "}
              <b>
                {" "}
                <span className="text-danger">
                  LIVE <FaCircleDot className="ms-1" />
                </span>
              </b>
              <b>
                {" "}
                <span className="text-success">
                  COMPLETED <FaCircleDot className="ms-1" />
                </span>
              </b>
              <b>
                {" "}
                <span className="text-info">
                  UPCOMING <FaCircleDot className="ms-1" />
                </span>
              </b>
            </span>
          </div>
          <div className="mt-1"></div>
        </>
      </Card>
      <br />
      <Card
        className="mt-2"
        style={{
          backgroundColor: "#dde5f0",
        }}
      >
        <Card.Body>
          <div className="d-flex justify-content-leftend gap-3">
            <Button variant="secondary"> Make Exam Live</Button>
            <Button variant="secondary">Mark as Completed </Button>
            <Button variant="secondary"> Check Live Exam </Button>
            <Button variant="secondary">User Response </Button>
            <Button variant="secondary">Results</Button>
          </div>
        </Card.Body>
      </Card>
      <br />

      <Card
        className="mt-2"
        style={{
          backgroundColor: "#dde5f0",
        }}
      >
        <Card.Body>
          <Card.Title>Setting</Card.Title>
          <div className="d-flex justify-content-end gap-3">
            <Button variant="secondary"> Upload Csv </Button>
            <Button variant="secondary">Explore Invigilator Csv </Button>
          </div>
        </Card.Body>
      </Card>
      <div className="mt-3">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab title="All Candidates">Tab content for All Candidates</Tab>
          <Tab title="Mapped Candidates">Tab content for Mapped Candidates</Tab>
        </Tabs>
        <Card
          className="mt-3"
          style={{
            backgroundColor: "#D0D5DD30",
            border: "none",
            outline: "none",
          }}
        >
          <Card.Body>
            <Table striped hover>
              <thead>
                <tr>
                  <th style={{ fontSize: 14 }}>Sr. No</th>
                  <th style={{ fontSize: 14 }}>Name</th>
                  <th style={{ fontSize: 14 }}>Email</th>
                  <th style={{ fontSize: 14 }}>DOB</th>
                  <th style={{ fontSize: 14 }}>Reg. No.</th>
                  <th style={{ fontSize: 14 }}>Gender</th>
                  <th style={{ fontSize: 14 }}>Action</th>
                </tr>
              </thead>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
