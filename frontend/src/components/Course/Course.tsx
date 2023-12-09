import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { CourseDataType } from '../YearlySchedule/YearlyScheduleData'
import CourseModal from '../CourseModal/CourseModal'
import './Course.css'

type ClassProps = {
    key: string,
    course: CourseDataType,
    index: number
}

function Class(props: ClassProps) {
    const [modalOpen, setModalOpen] = useState(false)
    
    const handleOpen = () => {
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
    }

    return (
        <Draggable draggableId={props.course.id} index={props.index}>
            {(provided, snapshot) => (
                <>
                    <div className={ "course-container " + (snapshot.isDragging ? "isDragging" : "") }
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={handleOpen}
                    >
                        { props.course.title }
                    </div>
                    <CourseModal open={modalOpen} onClose={handleClose} course={props.course}/>
                </>
            )}
        </Draggable>
    )
}

export default Class;