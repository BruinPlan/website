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
        <>
            <Draggable draggableId={props.class.id} index={props.index}>
                {(provided) => (
                    <div className="class-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        { props.class.content }
                    </div>
                )}
            </Draggable>
        </>
    )
}

export default Class;