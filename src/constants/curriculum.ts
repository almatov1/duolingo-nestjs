import { LessonType, Level } from "@prisma/client";

export const LEVELS = [
    {
        label: Level.A1,
        topics: [
            {
                id: 1,
                lessons: [
                    {
                        type: LessonType.READING,
                        content: 'текст'
                    },
                    {
                        type: LessonType.WRITING,
                        content: 'текст какой то'
                    }
                ]
            }
        ]
    }
];
