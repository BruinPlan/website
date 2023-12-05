import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { ClassDataType } from '../YearlySchedule/YearlyScheduleData'
import './Class.css'

type ClassType = {
    key: string,
    class: ClassDataType,
    index: number
}

function Class(props: ClassType) {
    return (
        <Draggable draggableId={props.class.id} index={props.index}>
            {(provided, snapshot) => (
                <div className={ "class-container " + (snapshot.isDragging ? "isDragging" : "") }
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    { props.class.content }
                </div>
            )}
        </Draggable>
    )
}

export default Class;