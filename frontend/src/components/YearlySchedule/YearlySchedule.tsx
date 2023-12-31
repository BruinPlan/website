import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { loadScheduleData, fullCourseList, YearlyScheduleDataType } from './YearlyScheduleData'
import { postData } from '../../apiUtils'
import Column from '../Column/Column'
import './YearlySchedule.css'

type YearlySchedulePropsType = {
    year: string
}

function YearlySchedule(props: YearlySchedulePropsType) {
    const [schedule, setSchedule] = useState<YearlyScheduleDataType>()
    const [userId, setUserId] = useState<string>("")

    useEffect(() => {
        fetch("/auth/user", { credentials: "include" }).then((res) => {
        if (res.ok)
            return res.json()
        }).then((data) => {setUserId(data.id)
            return data.id
        }
        ).then((userId) => {
            loadScheduleData(userId).then((data) => {
                setSchedule(data[props.year]);
        })})
    }, [props.year]);

    async function reloadSchedule() {
        const newScheduleData = await loadScheduleData(userId)
        setSchedule(newScheduleData[props.year])
    }

    // updates columns once a course has been dragged
    const onDragEnd = async (result: any) => {
        if (!schedule) {
            return
        }
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && 
            destination.index === source.index) {
                return
        }

        /* create new course ID array with new ordering after drag and drop*/

        // get source and destination quarters
        const start = schedule.columns[source.droppableId]
        const finish = schedule.columns[destination.droppableId]

        // if course is dragged within the same quarter
        if (start === finish) {
            const newCourseIds = Array.from(start.courseIds)
            newCourseIds.splice(source.index, 1)
            newCourseIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                courseIds: newCourseIds
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
        
        // course is dragged to different quarter
        const startCourseIds = Array.from(start.courseIds)
        const deletedCourseId = startCourseIds.splice(source.index, 1)[0]
        const newStart = {
            ...start,
            courseIds: startCourseIds
        }

        const finishCourseIds = Array.from(finish.courseIds)
        finishCourseIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            courseIds: finishCourseIds
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

        // update db
        const deletedCourse = schedule.courses[deletedCourseId]
        const scheduleEntryBody = {
            id: deletedCourse.entryId,
            quarter: newFinish.id
        }
        await postData("http://127.0.0.1:3000/api/schedule-entries/update", scheduleEntryBody)
        await reloadSchedule()
    }

    if (!schedule) {
        return <></>
    }
   
    return (
        <div className="yearly-schedule">
            <DragDropContext onDragEnd={onDragEnd} >
                <div className="quarters-container">
                    { 
                        schedule.columnOrder.map(columnId => {
                            const column = schedule.columns[columnId];
                            const courses = column.courseIds.map(courseId => schedule.courses[courseId]);

                            return <Column key={column.id} column={column} courses={courses} fullCourseList={fullCourseList} year={props.year} schedule={schedule} reloadSchedule={reloadSchedule}  />
                        })
                    }
                </div>
            </DragDropContext>
        </div>
    )
}

export default YearlySchedule