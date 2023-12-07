export type CourseDataType = {
    id: string
    subjectArea: string
    catalogNumber: string
    title: string
    units: number
    description: string
};

export type ColumnDataType = {
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

// const uid = '1'

export const scheduleData: ScheduleDataType = {
    'freshman': {
        courses: {
            '1': { id: '1', subjectArea: 'A', catalogNumber: 'B', title: 'CS 1', units: 4, description: 'Fall 1' },
            '2': { id: '2', subjectArea: 'A', catalogNumber: 'B', title: 'CS 2', units: 4, description: 'Fall 2' },
            '3': { id: '3', subjectArea: 'A', catalogNumber: 'B', title: 'CS 3', units: 4, description: 'Fall 3' },
            '4': { id: '4', subjectArea: 'A', catalogNumber: 'B', title: 'CS 4', units: 4, description: 'Fall 4' }
        },
        columns: {
            'fall': {
                id: 'fall',
                title: 'Fall',
                courseIds: ['1', '2', '3']
            },
            'winter': {
                id: 'winter',
                title: 'Winter',
                courseIds: ['4']
            },
            'spring': {
                id: 'spring',
                title: 'Spring',
                courseIds: []
            },
            'summer': {
                id: 'summer',
                title: 'Summer',
                courseIds: []
            }
        },
        columnOrder: ['fall', 'winter', 'spring', 'summer']
    },
    'sophomore': {
        courses: {
            '1': { id: '1', subjectArea: 'A', catalogNumber: 'B', title: 'CS 1', units: 4, description: 'Fall 1' },
            '2': { id: '2', subjectArea: 'A', catalogNumber: 'B', title: 'CS 2', units: 4, description: 'Fall 2' },
            '3': { id: '3', subjectArea: 'A', catalogNumber: 'B', title: 'CS 3', units: 4, description: 'Fall 3' },
            '4': { id: '4', subjectArea: 'A', catalogNumber: 'B', title: 'CS 4', units: 4, description: 'Fall 4' }
        },
        columns: {
            'fall': {
                id: 'fall',
                title: 'Fall',
                courseIds: ['1', '2']
            },
            'winter': {
                id: 'winter',
                title: 'Winter',
                courseIds: ['3']
            },
            'spring': {
                id: 'spring',
                title: 'Spring',
                courseIds: ['4']
            },
            'summer': {
                id: 'summer',
                title: 'Summer',
                courseIds: []
            }
        },
        columnOrder: ['fall', 'winter', 'spring', 'summer']
    },
    'junior': {
        courses: {
            '1': { id: '1', subjectArea: 'A', catalogNumber: 'B', title: 'CS 1', units: 4, description: 'Fall 1' },
            '2': { id: '2', subjectArea: 'A', catalogNumber: 'B', title: 'CS 2', units: 4, description: 'Fall 2' },
            '3': { id: '3', subjectArea: 'A', catalogNumber: 'B', title: 'CS 3', units: 4, description: 'Fall 3' },
            '4': { id: '4', subjectArea: 'A', catalogNumber: 'B', title: 'CS 4', units: 4, description: 'Fall 4' }
        },
        columns: {
            'fall': {
                id: 'fall',
                title: 'Fall',
                courseIds: ['1']
            },
            'winter': {
                id: 'winter',
                title: 'Winter',
                courseIds: ['2', '3']
            },
            'spring': {
                id: 'spring',
                title: 'Spring',
                courseIds: ['4']
            },
            'summer': {
                id: 'summer',
                title: 'Summer',
                courseIds: []
            }
        },
        columnOrder: ['fall', 'winter', 'spring', 'summer']
    },
    'senior': {
        courses: {
            '1': { id: '1', subjectArea: 'A', catalogNumber: 'B', title: 'CS 1', units: 4, description: 'Fall 1' },
            '2': { id: '2', subjectArea: 'A', catalogNumber: 'B', title: 'CS 2', units: 4, description: 'Fall 2' },
            '3': { id: '3', subjectArea: 'A', catalogNumber: 'B', title: 'CS 3', units: 4, description: 'Fall 3' },
            '4': { id: '4', subjectArea: 'A', catalogNumber: 'B', title: 'CS 4', units: 4, description: 'Fall 4' }
        },
        columns: {
            'fall': {
                id: 'fall',
                title: 'Fall',
                courseIds: ['1']
            },
            'winter': {
                id: 'winter',
                title: 'Winter',
                courseIds: ['2']
            },
            'spring': {
                id: 'spring',
                title: 'Spring',
                courseIds: ['3', '4']
            },
            'summer': {
                id: 'summer',
                title: 'Summer',
                courseIds: []
            }
        },
        columnOrder: ['fall', 'winter', 'spring', 'summer']
    }
}