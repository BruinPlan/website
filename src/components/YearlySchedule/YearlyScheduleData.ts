export type ClassDataType = {
    id: string;
    content: string;
};

export type ColumnDataType = {
    id: string;
    title: string;
    classIds: string[];
};

export type ScheduleDataType = {
    classes: Record<string, ClassDataType>;
    columns: Record<string, ColumnDataType>;
    columnOrder: string[];
};

export const scheduleData: ScheduleDataType = {
    classes: {
        'class-1': { id: 'class-1', content: 'First class' },
        'class-2': { id: 'class-2', content: 'Second class' },
        'class-3': { id: 'class-3', content: 'Third class' },
        'class-4': { id: 'class-4', content: 'Fourth class' }
    },
    columns: {
        'fall': {
            id: 'fall',
            title: 'Fall',
            classIds: ['class-1', 'class-2', 'class-3', 'class-4']
        }
    },
    columnOrder: ['fall']
};