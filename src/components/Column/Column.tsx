import { ClassDataType, ColumnDataType } from '../YearlySchedule/YearlyScheduleData'
import Class from '../Class/Class'
import './Column.css'
import { StrictModeDroppable } from '../StrictModeDroppable/StrictModeDroppable'

type ColumnType = {
    key: string,
    column: ColumnDataType,
    classes: ClassDataType[]
}

function Column(props: ColumnType) {
    return (
        <div className="column-container">
            <h3 className="column-title">{ props.column.title }</h3>
            <StrictModeDroppable droppableId={props.column.id}>
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
            </StrictModeDroppable>
        </div>
    )
}

export default Column