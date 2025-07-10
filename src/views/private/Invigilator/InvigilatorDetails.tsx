import { useEffect, useState } from "react";
import { Badge, Button, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { InvigilatorService } from "../../../service/Invigilator.service";
import EditAccessModal from "../../../components/Modal/EditAccessModal";
import AllottedExam from "../../../components/AllotedExams";

export default function InvigilatorDetails() {

    const [invigilator, setInvigilator] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [editExam, setEditExam] = useState<any>(null);
    const params = useParams();

    async function getDetails() {
        if (params.invigilatorId && params.invigilatorId !== "") {
            setLoading(true);
            await InvigilatorService.getInvigilatorById(params.invigilatorId)
                .then((res) => {
                    if (res.status === 200) {
                        setInvigilator(res.data.data?.invigilator);
                    }
                })
                .catch(e => {
                    console.log(e);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }

    useEffect(() => {
        getDetails();
    }, [params.invigilatorId]);


    return (
        <>
            <div className="container">

                {
                    loading ?
                        <div className="text-center p-3 mt-5">
                            <span className="fs-4">
                                Loading... <Spinner animation="border" role="status" />
                            </span>
                        </div> :

                        <div className="mt-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>Invigilator Details</h5>
                            </div>
                            <Card className="mt-3">
                                <Card.Body>
                                    <span>Name: <span className="fw-bold">{invigilator?.name}</span></span> <br />
                                    <span>E-mail: <span className="fw-bold">{invigilator?.email}</span></span> <br />
                                    <span>Mobile: <span className="fw-bold">{invigilator?.mobile}</span></span> <br />
                                    {
                                        invigilator?.status === 'active' ?
                                            <Badge pill bg='success'>Active</Badge> :
                                            <Badge pill bg='secondary'>In-active</Badge>
                                    }
                                    {
                                        invigilator?.isSuspended &&
                                        <Badge pill bg='danger'>Suspended</Badge>
                                    }
                                </Card.Body>
                            </Card>

                            <h5 className="mt-3">Alloted Exams</h5>
                            {
                                invigilator?.allottedExams?.length > 0 ?
                                    invigilator?.allottedExams?.map((exam: any, index: number) => {
                                        return (
                                            <div key={exam?._id}>
                                                <AllottedExam allottedExam={exam} reload={getDetails} onEdit={() => setEditExam(exam)} />
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="text-center card mt-5 p-3">
                                        No exams alloted
                                    </div>
                            }
                        </div>
                }
            </div>

            <EditAccessModal
                show={(editExam && editExam?.examId !== "")}
                setShow={() => setEditExam(null)}
                data={editExam}
                reload={getDetails}
            />
        </>
    )
}