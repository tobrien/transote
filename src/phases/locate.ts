import * as Logging from '../logging';
import * as Media from '../util/media';
import * as Storage from '../util/storage';
import * as Cabazooka from '@tobrien/cabazooka';
import { Config } from '../main';

// Helper function to promisify ffmpeg.

export interface Instance {
    locate: (audioFile: string) => Promise<{
        creationTime: Date;
        outputPath: string;
        transcriptionFilename: string;
        hash: string;
        audioFile: string;
    }>;
}

export const create = (config: Config, operator: Cabazooka.Operator): Instance => {
    const logger = Logging.getLogger();
    const storage = Storage.create({ log: logger.debug });
    const media = Media.create(logger);

    const locate = async (audioFile: string): Promise<{
        creationTime: Date;
        outputPath: string;
        transcriptionFilename: string;
        hash: string;
        audioFile: string;
    }> => {
        logger.debug('Processing file %s', audioFile);

        // Extract audio file creation time
        const creationTime = await media.getAudioCreationTime(audioFile);
        if (creationTime) {
            logger.info('Audio recording time: %s', creationTime.toISOString());
        } else {
            logger.warn('Could not determine audio recording time for %s, skipping', audioFile);
            throw new Error('Could not determine audio recording time for ' + audioFile);
        }

        // Calculate the hash of file and output directory
        const hash = (await storage.hashFile(audioFile, 100)).substring(0, 8);
        const outputPath: string = await operator.constructOutputDirectory(creationTime);
        const transcriptionFilename = await operator.constructFilename(creationTime, 'transcription', hash);

        return {
            creationTime,
            outputPath,
            transcriptionFilename,
            hash,
            audioFile,
        };
    }

    return {
        locate,
    }
}


