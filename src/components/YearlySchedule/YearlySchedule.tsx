import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ScheduleDataType, scheduleData } from './YearlyScheduleData';
import Column from '../Column/Column';
import './YearlySchedule.css'

function YearlySchedule() {
    const [schedule, setSchedule] = React.useState(scheduleData);

    return (
        <>
            <div className="yearly-schedule">
                { getSchedule(schedule) }
            </div>
        </>
    )
}

function getSchedule(schedule: ScheduleDataType) {
    return (
        <DragDropContext onDragEnd={onDragEnd} >
            { 
                schedule.columnOrder.map(columnId => {
                    const column = schedule.columns[columnId];
                    const classes = column.classIds.map(classId => schedule.classes[classId]);

                    return <Column key={column.id} column={column} classes={classes} />
                })
            }
        </DragDropContext>
    )
}

function onDragEnd(result: string) {
    
}

export default YearlySchedule