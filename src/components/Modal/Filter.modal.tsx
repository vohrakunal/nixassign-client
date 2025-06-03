import { Button, Form, Modal } from "react-bootstrap";

interface IFilterModal {
    show: any,
    handleClose: any,
    reload?: any,
    filterData: any
    setFilterData: any
}

export default function FilterModal(props: IFilterModal) {

    const handleSwitchChange = (e: any) => {
        props.setFilterData({ ...props.filterData, [e.target.name]: e.target.checked })
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                animation={true}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label className="flex-shrink-0" style={{ fontWeight: "500", width: "200px" }}>Completed</Form.Label>
                        <Form.Switch className="mb-1 flex-grow-1" name="completionStatus" checked={props.filterData?.completionStatus} onChange={handleSwitchChange} />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label className="flex-shrink-0" style={{ fontWeight: "500", width: "200px" }}>Student Submission</Form.Label>
                        <Form.Switch className="mb-1 flex-grow-1" name="studentSubmitForReview" checked={props.filterData?.studentSubmitForReview} onChange={handleSwitchChange} />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label className="flex-shrink-0" style={{ fontWeight: "500", width: "200px" }}>Invigilator Submission</Form.Label>
                        <Form.Switch className="mb-1 flex-grow-1" name="invigilatorSubmitForReview" checked={props.filterData?.invigilatorSubmitForReview} onChange={handleSwitchChange} />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label className="flex-shrink-0" style={{ fontWeight: "500", width: "200px" }}>Generated</Form.Label>
                        <Form.Switch className="mb-1 flex-grow-1" name="isGenerated" checked={props.filterData?.isGenerated} onChange={handleSwitchChange} />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label className="flex-shrink-0" style={{ fontWeight: "500", width: "200px" }}>Not generated</Form.Label>
                        <Form.Switch className="mb-1 flex-grow-1" name="notGenerated" checked={props.filterData?.notGenerated} onChange={handleSwitchChange} />
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center mb-3">
                        <Form.Label className="flex-shrink-0" style={{ fontWeight: "500", width: "200px" }}>Ready to be generated</Form.Label>
                        <Form.Switch className="mb-1 flex-grow-1" name="readyToBeGenerated" checked={props.filterData?.readyToBeGenerated} onChange={handleSwitchChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { props.reload(); props.handleClose() }}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}