import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { scheduleData } from './YearlyScheduleData'
import Column from '../Column/Column'
import './YearlySchedule.css'

function YearlySchedule() {
    const [schedule, setSchedule] = useState(scheduleData);

    // updates columns once a class has been dragged
    const onDragEnd = (result: any) => {
        console.log(typeof result)
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && 
            destination.index === source.index) {
                return
        }

        /* create new class ID array with new ordering after drag and drop*/

        // get source and destination quarters
        const start = schedule.columns[source.droppableId]
        const finish = schedule.columns[destination.droppableId]

        // if class is dragged within the same quarter
        if (start === finish) {
            const newClassIds = Array.from(start.classIds)
            newClassIds.splice(source.index, 1)
            newClassIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                classIds: newClassIds
            }

            const newSchedule = {
                ...schedule,
                columns: {
                    ...schedule.columns,
                    [newColumn.id]: newColumn,
                }
            }

            setSchedule(newSchedule)
            return
        }
        
        // class is dragged to different quarter
        const startClassIds = Array.from(start.classIds)
        startClassIds.splice(source.index, 1)
        const newStart = {
            ...start,
            classIds: startClassIds
        }

        const finishClassIds = Array.from(finish.classIds)
        finishClassIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            classIds: finishClassIds
        }

        const newSchedule = {
            ...schedule,
            columns: {
                ...schedule.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        setSchedule(newSchedule)
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/users`)
            .then(response =>response.json())
            .then(data => console.log(data))
    }, [])

    return (
        <div className="yearly-schedule">
            <DragDropContext onDragEnd={onDragEnd} >
                <div className="quarters-container">
                    { 
                        schedule.columnOrder.map(columnId => {
                            const column = schedule.columns[columnId];
                            const classes = column.classIds.map(classId => schedule.classes[classId]);

                            return <Column key={column.id} column={column} classes={classes} />
                        })
                    }
                </div>
            </DragDropContext>
        </div>
    )
}

export default YearlySchedule