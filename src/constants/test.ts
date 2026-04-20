import { Level } from "@prisma/client";

export const TEST_QUESTIONS = [
    {
        question: "Сәлем! ... қалай?",
        answers: ["Атың", "Жағдайың", "Кім"],
        correctIndex: 1,
    },
    {
        question: "Мен ертең жұмысқа ... .",
        answers: ["барамын", "бардым", "бара жатырмын"],
        correctIndex: 1,
    },
    {
        question: "Сәлем! ... қалай?",
        answers: ["Атың", "Жағдайың", "Кім"],
        correctIndex: 1,
    },
    {
        question: "Мен ертең жұмысқа ... .",
        answers: ["барамын", "бардым", "бара жатырмын"],
        correctIndex: 1,
    },
    {
        question: "Сәлем! ... қалай?",
        answers: ["Атың", "Жағдайың", "Кім"],
        correctIndex: 1,
    },
    {
        question: "Сәлем! ... қалай?",
        answers: ["Атың", "Жағдайың", "Кім"],
        correctIndex: 1,
    },
];

export const TEST_RESULT = [
    { correctCount: 0, level: Level.A1 },
    { correctCount: 2, level: Level.A2 },
    { correctCount: 3, level: Level.B1 },
    { correctCount: 4, level: Level.B2 },
    { correctCount: 5, level: Level.C1 }
];
