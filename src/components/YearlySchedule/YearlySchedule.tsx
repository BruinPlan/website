import React from 'react';
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
    return schedule.columnOrder.map(columnId => {
        const column = schedule.columns[columnId];
        const classes = column.classIds.map(classId => schedule.classes[classId]);

        return <Column key={column.id} column={column} classes={classes} />
    })
}

export default YearlySchedule