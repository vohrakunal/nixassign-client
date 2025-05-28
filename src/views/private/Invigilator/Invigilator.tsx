import { use, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Dropdown,
  Table,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import AddInvigilatorModal from "../../../components/Modal/AddInvigilator.modal";
import { FaCircleDot, FaEllipsisVertical } from "react-icons/fa6";
import CustomToggle from "../../../components/Menu/CustomMenu";
import { FaEdit, FaExchangeAlt, FaEye, FaKey, FaTrash } from "react-icons/fa";
import { InvigilatorService } from "../../../service/Invigilator.service";
import UpdateInvigilatorModal from "../../../components/Modal/UpdateInvigilator.modal";
import toast from "react-hot-toast";
import ResetPasswordModal from "../../../components/Modal/ResetPassword.modal";

export default function Invigilator() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [pageNumber, setPageNumber] = useState<any>(1);
  const [Total, setTotal] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [logsData, setLogsData] = useState<any>([]);
  const [responseLogs, setResponseLogs] = useState<any>("");

  const [showAddInvigilatorModal, setShowAddInvigilatorModal] = useState<boolean>(false);
  const [invigilatorIndex, setInvigilatorIndex] = useState<number>(-1);
  const [invigilatorData, setInvigilatorData] = useState<any>(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<any>(undefined);

  const getAllInvigilators = async () => {
    await InvigilatorService.getAllInvigilators()
      .then((res) => {
        if (res.status === 200) {
          setInvigilatorData(res.data.invigilators);
        }
      })
      .catch((err) => {
        console.log("Error fetching invigilators:", err);
      });
  };


  const deleteInvigilator = async (id: any) => {
    await InvigilatorService.deleteInvigilator(id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Invigilator deleted successfully");
          getAllInvigilators();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };


  const resetPassword = async (id: any) => {
    await InvigilatorService.resetPassword(id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Reset password successfully");
          setShowResetPasswordModal(res.data.data)
          getAllInvigilators();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };


  const toggleStatus = async (id: any) => {
    await InvigilatorService.toggleStatus(id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("status changed successfully");
          getAllInvigilators();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    getAllInvigilators();
  }, []);

  return (
    <Container>
      <div className="py-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-4">Invigilator</h4>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowAddInvigilatorModal(true);
            }}
            size="sm"
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
                  <th style={{ fontSize: 14 }}>Mobile no.</th>
                  <th style={{ fontSize: 14 }}> UserType</th>
                  <th style={{ fontSize: 14 }}>Status</th>
                  <th style={{ fontSize: 14 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {invigilatorData && invigilatorData?.length > 0
                  ? invigilatorData?.map((invigilator: any, index: number) => {
                    return (
                      <tr>
                        <td style={{ fontSize: 12 }}>{index + 1}</td>
                        <td style={{ fontSize: 12 }}>{invigilator?.name}</td>
                        <td style={{ fontSize: 12 }}>{invigilator?.email}</td>
                        <td style={{ fontSize: 12 }}>
                          {invigilator?.mobile}
                        </td>
                        <td style={{ fontSize: 12 }}>
                          {invigilator?.userType}
                        </td>
                        <td style={{ fontSize: 12 }}>
                          <Badge
                            bg={
                              invigilator?.status === "active"
                                ? "success"
                                : "danger"
                            }
                            className="text-white"
                          >
                            {invigilator?.status}
                          </Badge>
                        </td>
                        <td style={{ fontSize: 12 }}>
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
                                  onClick={() => resetPassword(invigilator?._id)}
                                >
                                  <FaKey className="text-info" />
                                  <span className="fw-bold text-secondary fs-12 ms-2">
                                    Reset Password
                                  </span>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => setInvigilatorIndex(index)}
                                >
                                  <FaEdit className="text-info" />
                                  <span className="fw-bold text-secondary fs-12 ms-2">
                                    Edit
                                  </span>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                  onClick={() => toggleStatus(invigilator?._id)}
                                >
                                  <FaExchangeAlt className="text-secondary" />
                                  <span className="fw-bold text-secondary fs-12 ms-2">
                                    {invigilator?.status === "in-active" ? "Activate" : "Deactivate"}
                                  </span>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                  onClick={() =>
                                    deleteInvigilator(invigilator?._id)
                                  }
                                >
                                  <FaTrash className="text-danger" />
                                  <span className="fw-bold text-danger fs-12 ms-2">
                                    Delete
                                  </span>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </td>
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

      <AddInvigilatorModal
        show={showAddInvigilatorModal}
        handleClose={() => setShowAddInvigilatorModal(false)}
        reloadData={getAllInvigilators}
      />

      <UpdateInvigilatorModal
        show={invigilatorIndex >= 0 ? true : false}
        handleClose={() => setInvigilatorIndex(-1)}
        reloadData={getAllInvigilators}
        invigilatorData={invigilatorData && invigilatorData[invigilatorIndex]}
      />

      <ResetPasswordModal
        show={showResetPasswordModal}
        handleClose={() => setShowResetPasswordModal(undefined)}
      />
    </Container>
  );
}
