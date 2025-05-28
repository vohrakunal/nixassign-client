import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Button,
    Modal,
    Card,
    Spinner,
    ProgressBar,
    Tabs,
    Tab
} from 'react-bootstrap';
import { FiUpload } from 'react-icons/fi';

interface DropzoneModalProps {
    show: boolean;
    handleClose: () => void;
}

export default function DropzoneModal({ show, handleClose }: DropzoneModalProps) {
    const [activeTab, setActiveTab] = useState<'csv' | 'zip'>('csv');
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [fileName, setFileName] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);

    const simulateUpload = (file: File) => {
        setUploading(true);
        setFileName(file.name);
        let progress = 0;

        const interval = setInterval(() => {
            progress += 5;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setUploading(false);
                }, 1000);
            }
        }, 200);
    };

    const createDropzone = (acceptedType: 'csv' | 'zip') => {
        return useDropzone({
            onDrop: useCallback((acceptedFiles: File[]) => {
                if (acceptedFiles.length > 0) {
                    const file = acceptedFiles[0];
                    const isValid =
                        (acceptedType === 'csv' && file.name.endsWith('.csv')) ||
                        (acceptedType === 'zip' && file.name.endsWith('.zip'));

                    if (isValid) {
                        simulateUpload(file);
                    } else {
                        alert(`Please upload a valid ${acceptedType.toUpperCase()} file.`);
                    }
                }
            }, []),
            accept: acceptedType === 'csv' ? { 'text/csv': ['.csv'] } : { 'application/zip': ['.zip'] },
            multiple: false
        });
    };

    const { getRootProps: getCSVRootProps, getInputProps: getCSVInputProps, isDragActive: isCSVActive } = createDropzone('csv');
    const { getRootProps: getZIPRootProps, getInputProps: getZIPInputProps, isDragActive: isZIPActive } = createDropzone('zip');

    const renderDropzone = (type: 'csv' | 'zip') => {
        const props = type === 'csv'
            ? { getRootProps: getCSVRootProps, getInputProps: getCSVInputProps, isDragActive: isCSVActive }
            : { getRootProps: getZIPRootProps, getInputProps: getZIPInputProps, isDragActive: isZIPActive };

        return (
            <Card
                {...props.getRootProps()}
                className={`d-flex justify-content-center align-items-center gap-3 text-center p-5 border-2 ${props.isDragActive ? 'border-primary bg-light' : 'border-secondary'}`}
                style={{
                    cursor: 'pointer',
                    transition: '0.3s ease',
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                }}
            >
                <FiUpload className="text-center text-secondary" size={50} />
                <input {...props.getInputProps()} />
                <p className="mb-2">Drag & drop a {type.toUpperCase()} file here, or click to select</p>
                <Button variant="outline-primary">Browse Files</Button>
            </Card>
        );
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" animation centered>
            <Modal.Header closeButton>
                <Modal.Title className="w-100">Upload File</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!uploading ? (
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k as 'csv' | 'zip')}
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="csv" title="CSV Upload">
                            {renderDropzone('csv')}
                        </Tab>
                        <Tab eventKey="zip" title="ZIP Upload">
                            {renderDropzone('zip')}
                        </Tab>
                    </Tabs>
                ) : (
                    <div className="text-center p-4">
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ width: '40px', height: '40px', marginBottom: '1rem' }}
                        />
                        <div className="mb-2">Uploading {activeTab.toUpperCase()}… {uploadProgress}%</div>
                        <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>{fileName}</div>
                        <ProgressBar now={uploadProgress} variant="primary" className="mt-3" />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
