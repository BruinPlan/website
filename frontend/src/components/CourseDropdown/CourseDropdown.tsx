import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type ClassType = {
    id: string,
    title: string
}
interface DropdownProps {
    labelText: string
    options: ClassType[]
    onChange: (e: SelectChangeEvent) => void
}

function CourseDropdown(props: DropdownProps) {
    const [course, setCourse] = React.useState("");

    const handleChange = (e: SelectChangeEvent) => {
        setCourse(e.target.value)
        props.onChange(e)
    };

    return (
        <Box sx={{ minWidth: 120, width: "40%" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    {props.labelText}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={course}
                    label={props.labelText}
                    onChange={handleChange}
                >
                    {props.options.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default CourseDropdown;
