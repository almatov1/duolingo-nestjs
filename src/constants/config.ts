import { StudyFormat } from "generated/prisma/enums";

// PAGINATION
export const PER_PAGE = { COUNT_30: 30, COUNT_100: 100 };

// STORAGE
export const STORAGE_UPLOAD_PATH = "./storage/";
export const AUDIO_MAX_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB
export const AUDIO_MIME_TYPES = [
    'audio/ogg',
    'audio/mpeg',
    'audio/mp3',
    'audio/x-m4a',
    'audio/opus'
];

// LANGUAGES
export const LANGUAGES = [
    { label: "Қазақ тілі", value: "kk" },
    { label: "Русский язык", value: "ru" },
    { label: "English", value: "en" }
];

// STUDY FORMATES
export const STUDY_FORMATES = [
    { labelKey: "studyFormat.offline", value: StudyFormat.OFFLINE },
    { labelKey: "studyFormat.online", value: StudyFormat.ONLINE }
];
