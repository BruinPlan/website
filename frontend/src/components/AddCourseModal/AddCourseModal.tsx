import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import CourseDropdown from "../CourseDropdown/CourseDropdown"
import { CourseDataType } from '../YearlySchedule/YearlyScheduleData'
import "./AddCourseModal.css"

type AddCourseModalType = {
    fullCourseList: CourseDataType[]
}

function AddCourseModal(props: AddCourseModalType) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const courseIdsAndNames = props.fullCourseList.map(course => {
        return {
            id: course.id,
            title: course.title
        }    
    })

    return (
        <>
            <button className="add-course-btn" onClick={handleOpen}>+</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="course-modal-box">
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                    >
                        Add a course
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Add a course to your schedule by selecting the subject
                        area and course number.
                    </Typography>
                    <div className="course-modal-divider">
                        {/* <CourseDropdown
                            labelText="Subject Area"
                            options={["COM SCI"]}
                        />
                        <CourseDropdown labelText="Course Number" options={["35L"]} /> */}
                        <CourseDropdown labelText="Title" options={courseIdsAndNames} />
                    </div>
                    <Button variant="contained" className="button">
                        Add
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default AddCourseModal;
