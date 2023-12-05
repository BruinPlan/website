import React from 'react'
import { ClassDataType, ColumnDataType } from '../YearlySchedule/YearlyScheduleData'
import Class from '../Class/Class'
import './Column.css'
import { Droppable } from 'react-beautiful-dnd'

type ColumnType = {
    key: string,
    column: ColumnDataType,
    classes: ClassDataType[]
}

function Column(props: ColumnType) {
    return (
        <div className="column-container">

            <h3 className="column-title">{ props.column.title }</h3>
            
            <Droppable droppableId={props.column.id}>
                { (provided, snapshot) => (
                    <div className={ "class-list " + (snapshot.isDraggingOver ? "isDraggingOver" : "") }
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        { props.classes.map((className, index) => (
                            <Class key={className.id} class={className} index={index} />
                        ))}
                        { provided.placeholder }
                    </div>
                )}
            </Droppable>

            <button className="add-class-btn">+</button>

        </div>
    )
}

export default Column