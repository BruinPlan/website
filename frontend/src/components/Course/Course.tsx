import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { CourseDataType } from '../YearlySchedule/YearlyScheduleData'
import './Course.css'

type ClassType = {
    key: string,
    course: CourseDataType,
    index: number
}

function Class(props: ClassType) {
    return (
        <Draggable draggableId={props.course.id} index={props.index}>
            {(provided, snapshot) => (
                <div className={ "course-container " + (snapshot.isDragging ? "isDragging" : "") }
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    { props.course.title }
                </div>
            )}
        </Draggable>
    )
}

export default Class;