import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Dropdown, Form, Tab, Table, Tabs } from "react-bootstrap";
import { FaCircleDot, FaEllipsisVertical, FaGears } from "react-icons/fa6";
import TablePagination from "../../../components/Pagination/Table.pagination";
import { DashboardService } from "../../../service/Dashboard.service";
import moment from "moment";
import CustomToggle from "../../../components/Menu/CustomMenu";
import { FaKey } from "react-icons/fa";
import DropzoneModal from "../../../components/Modal/Dropzone.modal";

export default function Dashboard() {
  const [key, setKey] = useState<any>("all_candidate");

  const [examDetails, setExamDetails] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const [mappedPageNumber, setMappedPageNumber] = useState<number>(1);
  const [mappedPageSize, setMappedPageSize] = useState<number>(10);
  const [mappedTotalRecords, setMappedTotalRecords] = useState<number>(0);

  const [unmappedUsers, setUnmappedUsers] = useState<any>([]);
  const [mappedUsers, setMappedUsers] = useState<any>([]);

  const [showUploadCandidateModal, setShowUploadCandidateModal] = useState<boolean>(false);

  const getExamDetails = async () => {
    await DashboardService.getExamDetails()
      .then((res) => {
        if (res.status === 200) {
          setExamDetails(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching exam details:", err);
      });
  }

  const getAllUnmappedUsers = async () => {
    await DashboardService.getAllUnmappedUsers(pageNumber, pageSize, search)
      .then((res) => {
        if (res.status === 200) {
          setUnmappedUsers(res.data.unmapped);
          setTotalRecords(res.data.total);
        }
      })
      .catch((err) => {
        console.error("Error fetching unmapped users:", err);
      });
  }

  const getAllMappedUsers = async () => {
    await DashboardService.getAllMappedUsers(mappedPageNumber, mappedPageSize)
      .then((res) => {
        if (res.status === 200) {
          setMappedUsers(res.data.data?.users);
          setMappedTotalRecords(res.data.totalCount);
        }
      })
      .catch((err) => {
        console.error("Error fetching unmapped users:", err);
      });
  }

  const tab_data = [
    {
      label: "All Candidates",
      key: "all_candidates",
    },
    {
      label: "Mapped Candidates",
      key: "mapped_candidates",
    },
  ]


  useEffect(() => {
    getAllUnmappedUsers();
  }, [key, pageNumber, pageSize, search]);

  useEffect(() => {
    getAllMappedUsers();
  }, [key, mappedPageNumber, mappedPageSize]);

  useEffect(() => {
    getExamDetails();
  }, [])

  return (
    <Container>
      <div className="py-5">
        <Card
          className="mt-2"
          style={{
            backgroundColor: "#D0D5DD30",
            border: "none",
            outline: "none",
          }}
        >
          <Card.Body>
            <div className="d-flex justify-content-end"></div>
            <div className="d-flex justify-content-between mt-2">
              <div>
                <div className="d-flex justify-content-start align-items-center">
                  <span>
                    Name: <b>{examDetails?.examName}</b>
                  </span>
                </div>
                <div>
                  <span>
                    Subject: <b>{examDetails?.subject}</b>
                  </span>
                </div>
              </div>

              <div>
                <div>
                  <span>
                    Created at: <b>{moment(examDetails?.createdAt).format("DD-MMM-YYYY")}</b>
                  </span>
                </div>

                <div>
                  <span>
                    Last updated at : <b>{moment(examDetails?.updatedAt).format("DD-MMM-YYYY")}</b>
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
                  <span className="text-danger text-uppercase">
                    {examDetails?.status}
                  </span>
                </b>
              </span>
            </div>
            <div className="mt-1"></div>
          </Card.Body>
        </Card>
        <Card
          className="mt-2"
          style={{
            backgroundColor: "#D0D5DD30",
            border: "none",
            outline: "none",
          }}
        >
          <Card.Body>
            <Card.Title>Settings</Card.Title>
            <div className="d-flex justify-content-end gap-3">
              <Button variant="secondary" onClick={() => setShowUploadCandidateModal(true)}>Upload Candidate CSV</Button>
            </div>
          </Card.Body>
        </Card>

        <Card
          className="mt-2"
          style={{
            backgroundColor: "#D0D5DD30",
            border: "none",
            outline: "none",
          }}
        >
          <Card.Body>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey={"all_candidate"} title={"All Candidates"}>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="form-control w-25"
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Group>
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
                  <tbody>
                    {unmappedUsers && unmappedUsers?.length > 0
                      ? unmappedUsers?.map((candidate: any, index: number) => {
                        return (
                          <tr>
                            <td style={{ fontSize: 12 }}>{index + 1}</td>
                            <td style={{ fontSize: 12 }}>{candidate?.name}</td>
                            <td style={{ fontSize: 12 }}>{candidate?.email}</td>
                            <td style={{ fontSize: 12 }}>{moment(candidate?.dob).format("DD-MM-YYYY")}</td>
                            <td style={{ fontSize: 12 }}>{candidate?.registrationNumber}</td>
                            <td style={{ fontSize: 12 }}>{candidate?.gender || "--"}</td>
                            <td style={{ fontSize: 12 }}>
                              <Button size="sm" variant="outline-success">Map this user</Button>
                            </td>
                          </tr>
                        );
                      }) : "No data found"}
                  </tbody>
                </Table>
                <div className="mt-3">
                  <TablePagination
                    currentPage={pageNumber}
                    total={totalRecords}
                    perPage={pageSize}
                    handlePageChange={(page: any) => setPageNumber(page)}
                    setPerPage={(size: any) => setPageSize(size)}
                  />
                </div>
              </Tab>
              <Tab eventKey={"mapped_candidate"} title={"Mapped Candidates"}>
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
                  <tbody>
                    {mappedUsers && mappedUsers?.length > 0
                      ? mappedUsers?.map((candidate: any, index: number) => {
                        return (
                          <tr>
                            <td style={{ fontSize: 12 }}>{index + 1}</td>
                            <td style={{ fontSize: 12 }}>{candidate?.student?.name}</td>
                            <td style={{ fontSize: 12 }}>{candidate?.student?.email}</td>
                            <td style={{ fontSize: 12 }}>{moment(candidate?.student?.dob).format("DD-MM-YYYY")}</td>
                            <td style={{ fontSize: 12 }}>{candidate?.student?.registrationNumber}</td>
                            <td style={{ fontSize: 12 }}>{candidate?.student?.gender || "--"}</td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="dropdown-custom-components"
                                >
                                  <FaEllipsisVertical
                                    style={{ cursor: "pointer" }}
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                  // onClick={() => resetPassword(invigilator?._id)}
                                  >
                                    <FaKey className="text-info" />
                                    <span className="text-secondary fs-12 ms-2">
                                      Reset Password
                                    </span>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                  // onClick={() => resetPassword(invigilator?._id)}
                                  >
                                    <FaGears className="text-success" />
                                    <span className="ext-secondary fs-12 ms-2">
                                      Disabled Users
                                    </span>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      }) : "No data found"}
                  </tbody>
                </Table>
                <div className="mt-3">
                  <TablePagination
                    currentPage={mappedPageNumber}
                    total={mappedTotalRecords}
                    perPage={mappedPageSize}
                    handlePageChange={(page: any) => setMappedPageNumber(page)}
                    setPerPage={(size: any) => setMappedPageSize(size)}
                  />
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>

      <DropzoneModal
        show={showUploadCandidateModal}
        handleClose={() => setShowUploadCandidateModal(false)}
      />
    </Container>
  );
}
