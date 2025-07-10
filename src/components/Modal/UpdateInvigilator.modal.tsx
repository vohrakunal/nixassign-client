import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { InvigilatorService } from '../../service/Invigilator.service';
import toast from 'react-hot-toast';

interface UpdateInvigilatorModalProps {
    show: boolean;
    handleClose: () => void;
    reloadData?: () => void;
    invigilatorData: any
}

export default function UpdateInvigilatorModal(props: UpdateInvigilatorModalProps) {

    const [data, setData] = useState<any>()

    const handeChangeValue = (e: any) => {
        const { name, value } = e.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }


    const handleUpdateInvigilator = async () => {
        const payload = {
            mobile: data.mobile,
            name: data.name,
        }
        await InvigilatorService.updateInvigilator(data._id, payload).then((res) => {
            if (res.status === 200) {
                props.reloadData && props.reloadData();
                props.handleClose();
                toast.success("Invigilator updated successfully");
            }
        }).catch(err => {
            console.log("Error updating invigilator:", err);
            toast.error(err.response?.data?.message || err.response.data || "Failed to update invigilator");
        })
    }


    useEffect(() => {
        setData(props.invigilatorData)
    }, [props.show])

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            animation={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Invigilator</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handeChangeValue} defaultValue={data?.email} disabled={true} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Invigilator Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={handeChangeValue} defaultValue={data?.name} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" name="mobile" onChange={handeChangeValue} defaultValue={data?.mobile} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleUpdateInvigilator}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
