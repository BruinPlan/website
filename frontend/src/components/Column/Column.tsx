import React from 'react'
import { CourseDataType, ColumnDataType } from '../YearlySchedule/YearlyScheduleData'
import Course from '../Course/Course'
import AddCourseModal from '../AddCourseModal/AddCourseModal'
import { Droppable } from 'react-beautiful-dnd'
import './Column.css'

type ColumnProps = {
    key: string,
    column: ColumnDataType,
    courses: CourseDataType[],
    fullCourseList: CourseDataType[],
    year: string,
    reloadSchedule: () => void
}

function Column(props: ColumnProps) {
    return (
        <div className="column-container">

            <h3 className="column-title">{ props.column.title }</h3>
            
            <Droppable droppableId={props.column.id}>
                { (provided, snapshot) => (
                    <div className={ "course-list " + (snapshot.isDraggingOver ? "isDraggingOver" : "") }
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        { props.courses.map((courseName, index) => (
                            <Course key={courseName.id} course={courseName} index={index} />
                        ))}
                        { provided.placeholder }
                    </div>
                )}
            </Droppable>

            <AddCourseModal fullCourseList={props.fullCourseList} year={props.year} quarter={props.column.id} reloadSchedule={props.reloadSchedule} />

        </div>
    )
}

export default Column