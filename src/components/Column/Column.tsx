import React from 'react'
import { ClassDataType, ColumnDataType } from '../YearlySchedule/YearlyScheduleData'
import './Column.css'

type ColumnType = {
    key: string,
    column: ColumnDataType,
    classes: ClassDataType[]
}

function Column(props: ColumnType) {
    const key = props.key
    const column = props.column
    const classes = props.classes

    return (
        <h1>{ column.title }</h1>
    )
}

export default Column