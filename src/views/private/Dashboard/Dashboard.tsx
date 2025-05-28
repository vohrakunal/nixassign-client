import React from "react";
import { Badge, Card } from "react-bootstrap";
import { FaCircleDot } from "react-icons/fa6";

export default function Dashboard() {
  return (
    <div>
      <Card
        className="mt-2"
        style={{
          backgroundColor: "#feffff",
          
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
                  Created at <b>date </b>
                </span>
              </div>

              <div>
                <span>
                  Last updated at <b>last date </b>
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
    </div>
  );
}
