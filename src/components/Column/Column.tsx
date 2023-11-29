import { Droppable } from 'react-beautiful-dnd'
import { ClassDataType, ColumnDataType } from '../YearlySchedule/YearlyScheduleData'
import Class from '../Class/Class'
import './Column.css'

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
                { provided => (
                    <div className="class-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        { props.classes.map((className, index) => <Class key={className.id} class={className} index={index} />) }
                        { provided.placeholder }
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column