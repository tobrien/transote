import { z } from 'zod';
import os from 'os';
import { FilenameOption } from '@tobrien/cabazooka';
import { FilesystemStructure } from '@tobrien/cabazooka';

export const VERSION = '__VERSION__ (__GIT_BRANCH__/__GIT_COMMIT__ __GIT_TAGS__ __GIT_COMMIT_DATE__) __SYSTEM_INFO__';
export const PROGRAM_NAME = 'cortalyne';
export const DEFAULT_CHARACTER_ENCODING = 'utf-8';
export const DEFAULT_BINARY_TO_TEXT_ENCODING = 'base64';
export const DEFAULT_DIFF = true;
export const DEFAULT_LOG = false;
export const DEFAULT_TIMEZONE = 'Etc/UTC';
export const DATE_FORMAT_MONTH_DAY = 'M-D';
export const DATE_FORMAT_YEAR = 'YYYY';
export const DATE_FORMAT_YEAR_MONTH = 'YYYY-M';
export const DATE_FORMAT_YEAR_MONTH_DAY = 'YYYY-M-D';
export const DATE_FORMAT_YEAR_MONTH_DAY_SLASH = 'YYYY/M/D';
export const DATE_FORMAT_YEAR_MONTH_DAY_HOURS_MINUTES = 'YYYY-M-D-HHmm';
export const DATE_FORMAT_YEAR_MONTH_DAY_HOURS_MINUTES_SECONDS = 'YYYY-M-D-HHmmss';
export const DATE_FORMAT_YEAR_MONTH_DAY_HOURS_MINUTES_SECONDS_MILLISECONDS = 'YYYY-M-D-HHmmss.SSS';
export const DATE_FORMAT_MONTH = 'M';
export const DATE_FORMAT_DAY = 'D';
export const DATE_FORMAT_HOURS = 'HHmm';
export const DATE_FORMAT_MINUTES = 'mm';
export const DATE_FORMAT_SECONDS = 'ss';
export const DATE_FORMAT_MILLISECONDS = 'SSS';
export const DEFAULT_VERBOSE = false;
export const DEFAULT_DRY_RUN = false;
export const DEFAULT_DEBUG = false;
export const DEFAULT_CONTENT_TYPES = ['diff'];
export const DEFAULT_RECURSIVE = false;
export const DEFAULT_INPUT_DIRECTORY = './';
export const DEFAULT_OUTPUT_DIRECTORY = './';

export const DEFAULT_AUDIO_EXTENSIONS = ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm'];

export const ALLOWED_CONTENT_TYPES = ['log', 'diff'];
export const ALLOWED_AUDIO_EXTENSIONS = ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm'];

export const DEFAULT_CLASSIFIED_RESPONSE_SCHEMA = z.object({
    type: z.enum(['meeting', 'call', 'update', 'idea', 'email', 'document', 'other']),
    conferenceTool: z.enum(['zoom', 'phone', 'teams', 'none']).optional(),
    attendees: z.array(z.string()).optional(),
    subject: z.string().optional(),
    recipients: z.array(z.string()).optional(),
    sections: z.array(z.object({
        title: z.string(),
        description: z.string(),
    })).optional(),
    tasks: z.array(z.object({
        task: z.string(),
        urgency: z.enum(['urgent', 'important', 'none']).optional(),
        status: z.enum(['in-progress', 'completed', 'none', 'overdue']).optional(),
    })).optional(),
    text: z.string(),
});

export const DEFAULT_OUTPUT_STRUCTURE = 'month' as FilesystemStructure;
export const DEFAULT_OUTPUT_FILENAME_OPTIONS = ['date', 'subject'] as FilenameOption[];

export const ALLOWED_OUTPUT_STRUCTURES = ['none', 'year', 'month', 'day'] as FilesystemStructure[];
export const ALLOWED_OUTPUT_FILENAME_OPTIONS = ['date', 'time', 'subject'] as FilenameOption[];

export const DEFAULT_CONFIG_DIR = `./.${PROGRAM_NAME}`;
export const DEFAULT_PROCESSED_DIR = './processed';

export const DEFAULT_PERSONAS_DIR = `/personas`;

export const DEFAULT_PERSONA_YOU_FILE = `${DEFAULT_PERSONAS_DIR}/you.md`;
export const DEFAULT_PERSONA_CLASSIFIER_FILE = `${DEFAULT_PERSONAS_DIR}/classifier.md`;
export const DEFAULT_PERSONA_TRANSCRIBE_FILE = `${DEFAULT_PERSONAS_DIR}/transcribe.md`;

export const DEFAULT_INSTRUCTIONS_DIR = `/instructions`;

export const DEFAULT_TYPE_INSTRUCTIONS_DIR = `${DEFAULT_INSTRUCTIONS_DIR}/types`;

export const DEFAULT_INSTRUCTIONS_CLASSIFY_FILE = `${DEFAULT_INSTRUCTIONS_DIR}/classify.md`;
export const DEFAULT_INSTRUCTIONS_COMPOSE_FILE = `${DEFAULT_INSTRUCTIONS_DIR}/compose.md`;
export const DEFAULT_INSTRUCTIONS_TRANSCRIBE_FILE = `${DEFAULT_INSTRUCTIONS_DIR}/transcribe.md`;

// TODO: Add more models, but also this should be a part of an OpenAI specific extension.
export const ALLOWED_MODELS: string[] = ['gpt-4o', 'gpt-4o-mini', 'o1-preview', 'o1-mini', 'o3-mini', 'o3-preview', 'o1-pro', 'o1-preview-2024-09-12'];
export const ALLOWED_TRANSCRIPTION_MODELS: string[] = ['whisper-1'];

export const DEFAULT_CLASSIFY_MODEL = 'gpt-4o-mini';
export const DEFAULT_COMPOSE_MODEL = 'o1-mini';
export const DEFAULT_TRANSCRIPTION_MODEL = 'whisper-1';
export const DEFAULT_MODEL = 'gpt-4o-mini';

export const DEFAULT_OVERRIDES = false;
export const DEFAULT_MAX_AUDIO_SIZE = 26214400; // 25MB in bytes
export const DEFAULT_TEMP_DIRECTORY = os.tmpdir(); // Use OS default temp directory

// Define Cortalyne-specific defaults
export const CORTALYNE_DEFAULTS = {
    dryRun: DEFAULT_DRY_RUN,
    verbose: DEFAULT_VERBOSE,
    debug: DEFAULT_DEBUG,
    transcriptionModel: DEFAULT_TRANSCRIPTION_MODEL,
    model: DEFAULT_MODEL,
    processedDirectory: DEFAULT_PROCESSED_DIR,
    overrides: DEFAULT_OVERRIDES,
    maxAudioSize: DEFAULT_MAX_AUDIO_SIZE,
    tempDirectory: DEFAULT_TEMP_DIRECTORY || os.tmpdir(),
    classifyModel: DEFAULT_MODEL,
    composeModel: DEFAULT_MODEL,
};
