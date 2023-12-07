type CourseDataType = {
    id: string
    subjectArea: string
    catalogNumber: string
    title: string
    units: number
    description: string
};

type ColumnDataType = {
    id: string
    title: string
    courseIds: string[]
};

type ScheduleDataType = {
    [key: string]: {
        courses: Record<string, CourseDataType>
        columns: Record<string, ColumnDataType>
        columnOrder: string[]
    }
};

// create schedule data
const scheduleData: ScheduleDataType = {}

// get full course list
const fullCourseList = await fetch('http://127.0.0.1:3000/api/courses')
        .then(response => response.json())

// fetch schedule data from db
async function loadScheduleData(uid: string) {
    // get schedule entries for user using uid
    const scheduleEntries = await fetch(`http://127.0.0.1:3000/api/schedule-entries/${uid}`)
        .then(response => response.json())

    // create course mapping of ids to course info
    type CourseMapType = {
        [key: string]: CourseDataType
    }

    const courseMap: CourseMapType = fullCourseList.reduce((acc: CourseMapType, item: CourseDataType) => {
        acc[item.id] = item
        acc[item.id].id = acc[item.id].id.toString()
        return acc
    }, {})

    const years = ['freshman', 'sophomore', 'junior', 'senior']
    const quarters = ['fall', 'winter', 'spring', 'summer']

    // create skeleton
    years.forEach(year => {
        scheduleData[year] = {
            courses: {},
            columns: {},
            columnOrder: []
        }

        quarters.forEach(quarter => {
            scheduleData[year].columns[quarter] = {
                id: quarter,
                title: quarter.charAt(0).toUpperCase() + quarter.slice(1),
                courseIds: []
            }
            scheduleData[year].columnOrder.push(quarter)
        })
    })

    // add each schedule entry
    type ScheduleEntryType = {
        id: string,
        course_id: string,
        year: string,
        quarter: string
    }

    scheduleEntries.forEach((entry: ScheduleEntryType) => {
        const year = scheduleData[entry.year]
        const course = courseMap[entry.course_id]

        year.courses[course.id] = course
        year.columns[entry.quarter].courseIds.push(course.id)
    })

    return scheduleData
}

// returns whether class is in yearly schedule
function classIsInYearlySchedule(courseId: string, year: string) {
    const yearlySchedule = scheduleData[year]
    const courses = Object.values(yearlySchedule.courses)
    const courseIds = courses.map(course => course.id)
    console.log(courseIds, courseId)
    return courseIds.includes(courseId)
}

// load schedule data
await loadScheduleData('1')

export { type CourseDataType, type ColumnDataType, fullCourseList, scheduleData, loadScheduleData, classIsInYearlySchedule }