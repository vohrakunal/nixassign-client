import { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export default function Invigilator() {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const serialNumber: any = searchParams.get("serial_number");

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [pageNumber, setPageNumber] = useState<any>(1);
  const [Total, setTotal] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [logsData, setLogsData] = useState<any>([]);
  const [responseLogs, setResponseLogs] = useState<any>("");

  return (
    <Container>
    <div className = "py-5">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-4">Invigilator</h4>
        <Button
          className="d-flex justify-content-between"
          variant="outline-secondary"
        >
          Add Invigilator
        </Button>
      </div>

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
                <th style={{ fontSize: 14 }}>Name </th>
                <th style={{ fontSize: 14 }}>Email</th>
                <th style={{ fontSize: 14 }}>Role</th>
                <th style={{ fontSize: 14 }}>Mobile no.</th>
                <th style={{ fontSize: 14 }}>Status</th>
                <th style={{ fontSize: 14 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {logsData && logsData?.length > 0
                ? logsData?.map((device: any, index: number) => {
                  return (
                    <tr>
                      <td style={{ fontSize: 12 }}>{index + 1}</td>
                      <td style={{ fontSize: 12 }}>{device?.endpoint}</td>
                      <td style={{ fontSize: 12 }}>{device?.method}</td>
                      <td style={{ fontSize: 12 }}>
                        {device?.responseStatus}
                      </td>
                      <td style={{ fontSize: 12 }}>
                        {device?.executionTime}
                      </td>
                      <td style={{ fontSize: 12 }}>
                        {device?.error || "NA"}
                      </td>
                      <td style={{ fontSize: 12 }}></td>
                    </tr>
                  );
                })
                : "No data found"}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div className="mt-3"></div>
    </div>
    </Container>
  );
}
