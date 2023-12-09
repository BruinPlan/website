type CourseDataType = {
    id: string
    entryId: string
    subjectArea: string
    catalogNumber: string
    title: string
    units: number
    description: string
}

type ColumnDataType = {
    id: string
    title: string
    courseIds: string[]
}

type YearlyScheduleDataType = {
    courses: Record<string, CourseDataType>
    columns: Record<string, ColumnDataType>
    columnOrder: string[]
}

type ScheduleDataType = {
    [key: string]: YearlyScheduleDataType
}

// fetch schedule data from db
async function loadScheduleData(uid: string) {
    const schedule: ScheduleDataType = {}

    // create skeleton
    const years = ['freshman', 'sophomore', 'junior', 'senior']
    const quarters = ['fall', 'winter', 'spring', 'summer']

    years.forEach(year => {
        schedule[year] = {
            courses: {},
            columns: {},
            columnOrder: []
        }

        quarters.forEach(quarter => {
            schedule[year].columns[quarter] = {
                id: quarter,
                title: quarter.charAt(0).toUpperCase() + quarter.slice(1),
                courseIds: []
            }
            schedule[year].columnOrder.push(quarter)
        })
    })

    // get schedule entries for user using uid
    type ScheduleEntryType = {
        id: string,
        course_id: string,
        year: string,
        quarter: string
    }
    const scheduleEntries: ScheduleEntryType[] = await fetch(`http://127.0.0.1:3000/api/schedule-entries/${uid}`)
        .then(response => response.json())

    // add each schedule entry
    for (const entry of scheduleEntries) {
        const year = schedule[entry.year]
        const course = JSON.parse(JSON.stringify(courseMap[entry.course_id]))
        course.entryId = entry.id

        year.courses[course.id] = course
        year.columns[entry.quarter].courseIds.push(course.id)
    }

    return schedule
}

// returns whether class is in yearly schedule
function classIsInYearlySchedule(schedule: YearlyScheduleDataType, courseId: string) {
    const courses = Object.values(schedule.courses)
    const courseIds = courses.map(course => course.id)

    return courseIds.includes(courseId)
}

// get full course list
const fullCourseList = await fetch('http://127.0.0.1:3000/api/courses')
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

export { type CourseDataType, type ColumnDataType, type YearlyScheduleDataType, fullCourseList, loadScheduleData, classIsInYearlySchedule }