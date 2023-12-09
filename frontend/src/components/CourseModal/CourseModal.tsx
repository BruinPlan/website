import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CourseDataType } from '../YearlySchedule/YearlyScheduleData';
import './CourseModal.css'

type CourseModalProps = {
    open: boolean
    onClose: () => void
    course: CourseDataType
}

function CourseModal(props: CourseModalProps) {  
    return (
        <>
            <Modal
                open={props.open} 
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="course-modal-box">
                    <h1 className="course-modal-title">
                        {props.course.title}
                    </h1>

                    <h3><b>Subject Area:</b> {props.course.subjectArea}</h3>
                    <h3><b>Catalog Number:</b> {props.course.catalogNumber}</h3>
                    <h3><b>Units:</b> {props.course.units}</h3>
                    <p><b>Description:</b> {props.course.description}</p>
                   
                </Box>
            </Modal>
        </>
    );
}

export default CourseModal