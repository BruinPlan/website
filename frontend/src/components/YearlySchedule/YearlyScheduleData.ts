export type ClassDataType = {
    id: string;
    content: string;
};

export type ColumnDataType = {
    id: string;
    title: string;
    classIds: string[];
};

type ScheduleDataType = {
    classes: Record<string, ClassDataType>;
    columns: Record<string, ColumnDataType>;
    columnOrder: string[];
};

export const scheduleData: ScheduleDataType = {
    classes: {
        'fall-1': { id: 'fall-1', content: 'Fall 1' },
        'fall-2': { id: 'fall-2', content: 'Fall 2' },
        'fall-3': { id: 'fall-3', content: 'Fall 3' },
        'fall-4': { id: 'fall-4', content: 'Fall 4' }
    },
    columns: {
        'fall': {
            id: 'fall',
            title: 'Fall',
            classIds: ['fall-1', 'fall-2', 'fall-3', 'fall-4']
        },
        'winter': {
            id: 'winter',
            title: 'Winter',
            classIds: []
        },
        'spring': {
            id: 'spring',
            title: 'Spring',
            classIds: []
        },
        'summer': {
            id: 'summer',
            title: 'Summer',
            classIds: []
        }
    },
    columnOrder: ['fall', 'winter', 'spring', 'summer']
};