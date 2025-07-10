import { useEffect, useState } from "react";
import { Badge, Button, Form, Offcanvas } from "react-bootstrap"
import Select from "react-select";
import { useParams } from "react-router-dom";
import { DashboardService } from "../../service/Dashboard.service";
import { InvigilatorService } from "../../service/Invigilator.service";
import toast from "react-hot-toast";

interface IAddInvigilator {
    show: boolean;
    setShow: any;
    data: any;
    reload: any;
}

export default function EditAccessModal({ show, setShow, data, reload }: IAddInvigilator) {

    const params = useParams();
    const [examStudents, setExamStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState<any>([]);

    console.log('selectedStudents', selectedStudents?.length);
    async function getExamStudents() {
        await DashboardService.getMappedUsersLean()
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.data?.users && res.data.data.users.length > 0) {
                        let students = res.data.data.users.map((item: any) => ({
                            value: item.student?._id,
                            label: `${item.student?.name} ${item.student?.last_name} (${item.student?.username})`
                        }));
                        setExamStudents(students);
                    }
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    async function handleSave() {
        if (!selectedStudents || selectedStudents.length === 0) {
            toast.error('Please select students')
            return;
        }

        let payload = {
            students: selectedStudents.map((item: any) => item.value),
        }

        await InvigilatorService.updateAllotedExam(params.invigilatorId, payload)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    if (res.data?.alreadyAssigned?.length > 0) {
                        toast.success(
                            <>
                                <div
                                    className="d-flex flex-column"
                                    style={{ maxWidth: '400px', wordWrap: 'break-word' }} // prevent overflow
                                >
                                    <span className="fw-bold mb-2">
                                        Following students are already assigned to other invigilator
                                    </span>
                                    <div className="d-flex flex-wrap gap-2">
                                        {
                                            res.data?.alreadyAssigned?.map((item: any) =>
                                                <Badge className="" key={item._id} pill>{item?.name}</Badge>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        );
                    } else {
                        toast.success('Access updated successfully');
                    }
                    reload();
                    onModalClose();
                }
            })
            .catch(e => {
                console.log(e);
                toast.error(e.response?.data?.message || e.response?.data);
            })
    }

    function onModalClose() {
        setSelectedStudents([]);
        setExamStudents([]);
        setShow(false);
    }

    useEffect(() => {
        if (show) {
            getExamStudents();
        }
    }, [show]);

    useEffect(() => {
        if (show) {
            if (examStudents?.length > 0) {
                let selectedStudents = examStudents.filter((item: any) => {
                    return data?.students?.some((existingStudent: any) => existingStudent._id === item.value);
                });
                setSelectedStudents(selectedStudents);
            }
        }
    }, [examStudents])



    return (
        <>
            <Offcanvas show={show} onHide={onModalClose} placement="end" animation={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Update Access</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <div className="">
                            <Form.Group className="mb-3">
                                <Form.Label>Students</Form.Label>
                                <Select
                                    options={examStudents}
                                    value={selectedStudents}
                                    onChange={e => setSelectedStudents(e)}
                                    isMulti
                                />
                                {
                                    examStudents.length > 0 &&
                                    <div className="text-end mt-1" style={{ cursor: 'pointer' }}>
                                        <Badge pill bg="secondary" onClick={() => setSelectedStudents(examStudents)} >Select All</Badge>
                                    </div>
                                }
                            </Form.Group>
                        </div>
                        <Button variant="primary" className="w-100" onClick={handleSave}>Save</Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}