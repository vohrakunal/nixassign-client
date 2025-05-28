import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

interface AddInvigilatorModalProps {
    show: boolean;
    handleClose: () => void;
    reloadData?: () => void;
}

export default function AddInvigilatorModal(props: AddInvigilatorModalProps) {

    const [data, setData] = useState<any>()

    const handeChangeValue = (e: any) => {
        const { name, value } = e.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));    
    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            animation={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Invigilator</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Invigilator Name</Form.Label>
                    <Form.Control type="text" name = "name" onChange={handeChangeValue} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name = "email" onChange={handeChangeValue} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" name = "mobileNumber" onChange={handeChangeValue} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={props.handleClose}>
                    Add Invigilator
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
