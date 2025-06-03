import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Dropdown, Form, OverlayTrigger, Tab, Table, Tabs, Tooltip } from "react-bootstrap";
import { FaCircleDot, FaEllipsisVertical, FaGears, FaXmark } from "react-icons/fa6";
import TablePagination from "../../../components/Pagination/Table.pagination";
import { DashboardService } from "../../../service/Dashboard.service";
import moment from "moment";
import CustomToggle from "../../../components/Menu/CustomMenu";
import { FaCheck, FaCheckCircle, FaFileExport, FaKey, FaLock, FaPlus, FaPlusCircle, FaUnlock } from "react-icons/fa";
import DropzoneModal from "../../../components/Modal/Dropzone.modal";
import toast from "react-hot-toast";
import ResetPasswordModal from "../../../components/Modal/ResetPassword.modal";
import BooleanIcon from "../../../components/BooleanIcon";
import { CSVLink } from "react-csv";
import { makeParams } from "../../../api/make.request";
import FilterModal from "../../../components/Modal/Filter.modal";

export default function Dashboard() {
  const [key, setKey] = useState<any>("all_candidate");

  const [examDetails, setExamDetails] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [search2, setSearch2] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<any>({});
  const [mappedPageNumber, setMappedPageNumber] = useState<number>(1);
  const [mappedPageSize, setMappedPageSize] = useState<number>(10);
  const [mappedTotalRecords, setMappedTotalRecords] = useState<number>(0);
  const [downloadData, setDownloadData] = useState<any>([]);

  const [unmappedUsers, setUnmappedUsers] = useState<any>([]);
  const [mappedUsers, setMappedUsers] = useState<any>([]);

  const [showUploadCandidateModal, setShowUploadCandidateModal] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<any>([]);
  const [selectedStudentId, setSelectedStudentIds] = useState<string[]>([]);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    await DashboardService.getAllUnmappedUsers(pageNumber, pageSize, search)
      .then((res) => {
        if (res.status === 200) {
          setUnmappedUsers(res.data.unmapped);
          setTotalRecords(res.data.total);
        }
      })
      .catch((err) => {
        console.error("Error fetching unmapped users:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const onDownloadClick = async () => {
    await DashboardService.getAllMappedUsers("")
      .then((res) => {
        if (res.status === 200) {
          setDownloadData(
            res.data.data.users.map((data: any) => {
              return {
                'Mapping Id': data._id,
                'Registration Number': data?.student?.registrationNumber,
                Email: data.student?.email || 'N/A',
                'DOB': moment(data.student && data.student.dob).format('DD-MM-YYYY'),
                'Membership ID': data.student?.membershipId || 'N/A',
                'Invigilator': data.student && data.invigilators?.map((invigilator: any) => invigilator?.invigilatorEmail).join(', '),
                'Student Submission': data.studentSubmitForReview ? 'Yes' : 'No',
                'Invigilator Submission': data.invigilatorSubmitForReview ? 'Yes' : 'No',
                'Completed': data.completionStatus ? 'Yes' : 'No',
                'Certificate Status': data?.certificateStatus,
                'Attempted': data.attemptedCount,
                "Approved": data.approvedCount,
                "Attempted But Unapproved Count": data.attemptedButUnapprovedCount,
                "In Review": data.inReviewCount,
              };
            }),
          );
        }
      })
      .catch((err) => {
        toast.error('Unable to fetch User data');
      });
  };

  useEffect(() => {
    onDownloadClick();
  }, []);

  const getAllMappedUsers = async () => {
    setLoading(true);
    let params = makeParams([
      {
        index: "page",
        value: search2 === "" ? mappedPageNumber : ""
      },
      {
        index: "count",
        value: search2 == '' ? mappedPageSize : ""
      },
      {
        index: "searchText",
        value: search2
      },
      {
        index: "completionStatus",
        value: filterData?.completionStatus,
      },
      {
        index: "invigilatorSubmitForReview",
        value: filterData?.invigilatorSubmitForReview,
      },
      {
        index: "studentSubmitForReview",
        value: filterData?.studentSubmitForReview,
      },
      {
        index: "isGenerated",
        value: filterData?.isGenerated,
      },
      {
        index: "notGenerated",
        value: filterData?.notGenerated,
      },
      {
        index: "readyToBeGenerated",
        value: filterData?.readyToBeGenerated,
      },
    ]);

    await DashboardService.getAllMappedUsers(params)
      .then((res) => {
        if (res.status === 200) {
          setMappedUsers(res.data.data?.users);
          setMappedTotalRecords(res.data?.data?.totalCount);
        }
      })
      .catch((err) => {
        console.error("Error fetching unmapped users:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const getExamInvigilatorStats = async () => {
    await DashboardService.getExamInvigilatorStats().then((res) => {
      if (res.status === 200) {
        setCsvData(res.data.invigilatorsData.map((data: any) => {
          return {
            "Email": data?.invigilator?.email,
            "Name": data?.invigilator?.name,
            "Status": data?.invigilator?.status,
            "Total Exam Mapping": data?.totalExamMappings,
            "Remaining Exam Mapping": data?.totalExamMappings - data?.examMappingsWithCompletionStatus,
            "Completion Status": data?.examMappingsWithCompletionStatus,
            "Invigilator Submitted": data?.examMappingsWithInvigilatorSubmitted,
            "Student Submitted": data?.examMappingsWithStudentSubmitted,
            "Alloted Exam": data?.invigilator?.allottedExams?.length,
          }
        }))
      }
    })
  }

  const handleMapSingleStudent = async (studentId: string) => {
    await DashboardService.mapSingleStudent(studentId)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Student Mapped Successfully.")
          getAllUnmappedUsers();
          getAllMappedUsers();
        }
      })
      .catch((err) => {
        toast.error(err.response.data || err.response.data.message || "Something went wrong")
      });
  }

  const handleMapMultiStudent = async () => {
    await DashboardService.mapMultipleStudents({ students: selectedStudentId })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Students Mapped Successfully.");
          getAllUnmappedUsers();
          getAllMappedUsers();
          setSelectedStudentIds([]);
        }
      })
      .catch((err) => {
        toast.error(err.response.data || err.response.data.message || "Something went wrong")
      });
  }

  const handleResetMappedStudentPassword = async (studentId: string, email: string) => {
    await DashboardService.resetMappedStudentPassword(studentId, { email })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Password reset successfully.");
          setShowResetPasswordModal({ email, password: res.data.password });
        }
      })
      .catch((err) => {
        toast.error(err.response.data || err.response.data.message || "Something went wrong")
      });
  }

  async function handleDisable(studentId: string) {
    await DashboardService.toggleStatus(studentId)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User status updated successfully.");
          getAllMappedUsers();
        }
      })
      .catch((err) => {
        toast.error(err.response.data || err.response.data.message || "Something went wrong")
      });
  }

  async function handleUnmarkCompleted(mappingId: string) {
    await DashboardService.unmarkCompleted(mappingId)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Unmarked as completed successfully.");
          getAllMappedUsers();
        }
      })
      .catch((err) => {
        toast.error(err.response.data || err.response.data.message || "Something went wrong")
      });
  }

  async function handleGenerateCertificate(mappingId: string) {
    toast.promise(
      DashboardService.generateCertificate(mappingId),
      {
        loading: "Generating certificate...",
        success: (res: any) => {
          if (res.status === 200) {
            getAllMappedUsers();
            return "Certificate generated successfully.";
          }
          return "Something went wrong while generating certificate.";
        },
        error: (err) => err.response.data || err.response.data.message || "Something went wrong"
      }
    )
  }

  const handleSelectAllStudents = () => {
    const student_ids = unmappedUsers.map((user: any) => user._id);
    setSelectedStudentIds(student_ids);
  }


  useEffect(() => {
    if (key === "all_candidate") {
      getAllUnmappedUsers();
    }
  }, [key, pageNumber, pageSize, search]);

  useEffect(() => {
    if (key !== "all_candidate") {
      getAllMappedUsers();
    }
  }, [key, mappedPageNumber, mappedPageSize, search2]);

  useEffect(() => {
    getExamDetails();
    getExamInvigilatorStats()
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
              <Button variant="secondary" >
                <CSVLink
                  data={csvData}
                  filename={"Invigilator.csv"}
                  className="text-decoration-none text-white"
                  target="_blank"
                >
                  Export Invigilator CSV
                </CSVLink>
              </Button>
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="form-control w-100"
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form.Group>
                  {selectedStudentId.length > 0 && (
                    <Button
                      variant="danger"
                      onClick={handleMapMultiStudent}
                    >
                      Map Selected Students
                    </Button>
                  )}
                </div>

                <Table striped hover>
                  <thead>
                    <tr>
                      <th>
                        <Form.Check
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleSelectAllStudents();
                            } else {
                              setSelectedStudentIds([]);
                            }
                          }}
                          checked={selectedStudentId.length === unmappedUsers.length && unmappedUsers.length > 0}
                        />
                      </th>
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
                    {
                      loading ? (
                        <tr>
                          <td colSpan={8} className="text-center">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ) :
                        (unmappedUsers && unmappedUsers?.length > 0)
                          ? unmappedUsers?.map((candidate: any, index: number) => {
                            return (
                              <tr>
                                <td style={{ fontSize: 12 }}>
                                  <Form.Check
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedStudentIds([...selectedStudentId, candidate._id]);
                                      } else {
                                        setSelectedStudentIds(selectedStudentId.filter((id) => id !== candidate._id));
                                      }
                                    }}
                                    checked={selectedStudentId.includes(candidate._id)}
                                  />
                                </td>
                                <td style={{ fontSize: 12 }}>{index + 1}</td>
                                <td style={{ fontSize: 12 }}>{candidate?.name}</td>
                                <td style={{ fontSize: 12 }}>{candidate?.email}</td>
                                <td style={{ fontSize: 12 }}>{moment(candidate?.dob).format("DD-MM-YYYY")}</td>
                                <td style={{ fontSize: 12 }}>{candidate?.registrationNumber}</td>
                                <td className="text-capitalize" style={{ fontSize: 12 }}>{candidate?.gender || "--"}</td>
                                <td style={{ fontSize: 12 }}>
                                  <Button size="sm" variant={`${candidate?.isMapped ? "success" : "outline-success"}`} onClick={() => handleMapSingleStudent(candidate._id)} disabled={candidate?.isMapped}>
                                    {candidate?.isMapped ? "Already Mapped" : "Map this user"}
                                  </Button>
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="form-control w-100"
                      type="text"
                      placeholder="Search..."
                      value={search2}
                      onChange={(e) => setSearch2(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">

                    {
                      downloadData && downloadData.length > 0 &&
                      <CSVLink data={downloadData || []}><span className='btn btn-primary'>Export as CSV</span></CSVLink>
                    }

                    <Button onClick={() => setShowFilterModal(true)} variant="secondary">
                      <FaCircleDot className="me-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                <Table striped hover responsive >
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th className='text-nowrap'>Username/Reg. No.</th>
                      {/* <th className='w-auto'>DOB</th> */}
                      <th className='text-center'>Invigilator</th>
                      <th className='text-center'>Student Submission</th>
                      <th className='text-center'>Invigilator Submission</th>
                      <th className='text-center'>Completed</th>
                      <th className='text-center'>Mapping Status</th>
                      <th style={{ fontSize: 10 }}> Attempted / Approved / Attempted but Unapproved / Review</th>
                      <th>Certificate</th>
                      <th className='text-nowrap'>Lock/Un-Lock</th>
                      <th className='text-nowrap'></th>
                    </tr>

                  </thead>
                  <tbody>
                    {
                      loading ? (
                        <tr>
                          <td colSpan={10} className="text-center">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ) :
                        mappedUsers.map((data: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td className="text-secondary">{index + 1}</td>
                              <td>
                                <div className="xrg-text-12 text-primary">
                                  {data?.student && data?.student.registrationNumber}
                                </div>
                                <div className="text-muted xrg-text-10 text-monospace">
                                  {data?.student && data?.student?.email || 'N/A'}
                                </div>
                              </td>
                              <td className="text-muted xrg-text-10 text-monospace ">
                                {data?.invigilators && data?.invigilators[0]?.invigilatorEmail || 'N/A'}
                                <OverlayTrigger
                                  placement="right-start"
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      {data?.student && data?.invigilators?.map((invigilator: any) => invigilator?.invigilatorEmail).join(', ')}
                                    </Tooltip>
                                  }
                                >
                                  <Badge className="ml-2" bg="primary" pill>
                                    +{data?.invigilators?.length > 0 ? data?.invigilators?.length - 1 : 0}
                                  </Badge>
                                  {/* <i className="fa fa-question-circle-o ml-2" aria-hidden="true"></i> */}
                                </OverlayTrigger>
                              </td>
                              <td className="text-center">
                                <BooleanIcon
                                  values={{ true: <FaCheck />, false: <FaXmark /> }}
                                  status={data && data?.studentSubmitForReview}
                                  size="sm"
                                />
                              </td>
                              <td className="text-center">
                                <BooleanIcon
                                  values={{ true: <FaCheck />, false: <FaXmark /> }}
                                  status={data && data?.invigilatorSubmitForReview}
                                  size="sm"
                                />
                              </td>
                              <td className="text-center">
                                <BooleanIcon
                                  values={{ true: <FaCheck />, false: <FaXmark /> }}
                                  status={data && data?.completionStatus}
                                  size="sm"
                                />
                              </td>
                              <td className="text-center">
                                <BooleanIcon
                                  values={{ true: <FaCheck />, false: <FaXmark /> }}
                                  status={data && data?.active}
                                  size="sm"
                                />
                              </td>
                              <td className='text-nowrap'>
                                <div>
                                  {data?.attemptedCount}
                                  /
                                  {data?.approvedCount}
                                  /
                                  {data?.attemptedButUnapprovedCount}
                                  /
                                  {data?.inReviewCount}
                                </div>
                              </td>
                              <td className='text-nowrap'>{data?.certificateStatus || 'N/A'}</td>
                              <td className="text-center">
                                <div>
                                  <BooleanIcon
                                    values={{ true: <FaUnlock />, false: <FaLock /> }}
                                    status={data && data.active}
                                    size="sm"
                                  />
                                </div>
                              </td>
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
                                      onClick={() => handleResetMappedStudentPassword(data?.student?._id, data?.student?.email)}
                                    >
                                      <FaKey className="text-info" />
                                      <span className="text-secondary fs-12 ms-2">
                                        Reset Password
                                      </span>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => handleDisable(data?._id)}
                                    >
                                      {data?.active === true ?
                                        <>
                                          <FaLock className="text-danger" />
                                          <span className="text-secondary fs-12 ms-2">
                                            Disable User
                                          </span>
                                        </> :
                                        <>
                                          <FaGears className="text-success" />
                                          <span className="ext-secondary fs-12 ms-2">
                                            Enable User
                                          </span>
                                        </>
                                      }
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleUnmarkCompleted(data?._id)}>
                                      <FaPlusCircle className="text-info" />
                                      <span className="text-secondary fs-12 ms-2">
                                        Unmark Completed
                                      </span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleGenerateCertificate(data?._id)}>
                                      <FaCheckCircle className="text-success" />
                                      <span className="text-secondary fs-12 ms-2">
                                        Generate Certificate
                                      </span>
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          );
                        })}
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

      <ResetPasswordModal
        show={showResetPasswordModal}
        handleClose={() => setShowResetPasswordModal(null)}
      />

      <FilterModal
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
        reload={getAllMappedUsers}
        filterData={filterData}
        setFilterData={setFilterData}
      />
    </Container>
  );
}
