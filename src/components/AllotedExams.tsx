import React, { useEffect, useState } from 'react';
import { ListGroup, Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { InvigilatorService } from '../service/Invigilator.service';

interface Exam {
    students?: any[];
    _id: string;
    examId: any;
}

interface AllottedExamsProps {
    allottedExam: Exam;
    reload: any;
    onEdit: any;
}

const AllottedExam: React.FC<AllottedExamsProps> = ({ allottedExam, reload, onEdit }) => {

    const { invigilatorId } = useParams();


    async function handleDelete() {
        await InvigilatorService.deleteAllotedExam(invigilatorId)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.data?.message);
                    reload();
                }
            })
            .catch(e => {
                console.log(e);
                toast.error(e.response?.data?.message || 'Failed to delete allotted exam');
            })
    }


    return (
        <div className='mb-3'>
            <Card>
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>
                            <strong>Exam:</strong> {allottedExam?.examId?.examName || 'N/A'}
                        </span>
                        <div className="d-flex gap-2">
                            <Button size="sm" variant="outline-danger" onClick={onEdit}>Edit</Button>
                            <Button size="sm" variant="danger" onClick={() => handleDelete()}>Delete</Button>
                        </div>
                    </div>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Students ({allottedExam?.students?.length})</Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    {
                                        allottedExam?.students?.length > 0 ?
                                            allottedExam?.students?.map((student: any, index: number) => (
                                                <Row key={student?._id}>
                                                    <span>{index + 1}.{student?.name + ' ' + student?.last_name + ' (' + student?.username + ' )'}</span>
                                                </Row>
                                            )) :
                                            <Row>No students allotted</Row>
                                    }
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AllottedExam;
