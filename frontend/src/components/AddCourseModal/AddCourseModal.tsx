import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import CourseDropdown from "../CourseDropdown/CourseDropdown"
import { CourseDataType, YearlyScheduleDataType, classIsInYearlySchedule } from '../YearlySchedule/YearlyScheduleData'
import { SelectChangeEvent } from "@mui/material/Select";
import { postData } from '../../apiUtils'
import "./AddCourseModal.css"

type AddCourseModalProps = {
    fullCourseList: CourseDataType[],
    year: string,
    quarter: string,
    schedule: YearlyScheduleDataType,
    reloadSchedule: () => void
}

function AddCourseModal(props: AddCourseModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedCourseId, setSelectedCourseId] = React.useState("")

    const courseIdsAndNames = props.fullCourseList.map(course => {
        return {
            id: course.id,
            title: course.title
        }    
    })

    // handle when class dropdown changes
    function handleDropdownChange(e: SelectChangeEvent) {
        setSelectedCourseId(e.target.value)
    }

    // handle when add course button is clicked
    async function handleClick() {

        // if course is already in schedule, abort
        if (classIsInYearlySchedule(props.schedule, selectedCourseId)) {
            alert("Course is already in schedule")
            return
        }

        // update db and reload schedule
        const scheduleEntryBody = {
            user_id: 1,
            course_id: selectedCourseId,
            year_name: props.year,
            quarter_name: props.quarter
        }

        await postData("http://127.0.0.1:3000/api/schedule-entries", scheduleEntryBody)
        await props.reloadSchedule()

        // close modal
        handleClose()
    }

    return (
        <>
            <button className="open-add-course-modal-btn" onClick={handleOpen}>+</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="add-course-modal-box">
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                    >
                        Add a course
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Add a course to your schedule.
                    </Typography>
                    <div className="add-course-modal-divider">
                        <CourseDropdown labelText="Title" options={courseIdsAndNames} onChange={handleDropdownChange}/>
                    </div>
                    <button className="add-course-btn" onClick={handleClick}>
                        Add
                    </button>
                </Box>
            </Modal>
        </>
    );
}

export default AddCourseModal
