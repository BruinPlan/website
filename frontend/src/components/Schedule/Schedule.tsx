import React from 'react'
import YearPanel from '../YearPanel/YearPanel'
import './Schedule.css'

function Schedule() {
    return (
        <>
            <div className="schedule">
                <h1 className="schedule-header">Schedule</h1>
                <YearPanel />
            </div>
        </>
    )
}

export default Schedule