import * as Cabazooka from "@tobrien/cabazooka";
import { Command } from "commander";
import { ALLOWED_MODELS, DEFAULT_CONFIG_DIR, DEFAULT_DEBUG, DEFAULT_DRY_RUN, DEFAULT_MODEL, DEFAULT_OVERRIDES, DEFAULT_TRANSCRIPTION_MODEL, DEFAULT_VERBOSE, PROGRAM_NAME, VERSION } from "./constants";
import { getLogger } from "./logging";
import * as Storage from "./util/storage";
import { Config } from "./main";

export interface Input extends Cabazooka.Input {
    dryRun: boolean;
    verbose: boolean;
    debug: boolean;
    transcriptionModel: string;
    model: string;
    openaiApiKey: string;
    configDir: string;
    overrides: boolean;
    classifyModel?: string;
    composeModel?: string;
    contextDirectories?: string[];
}

export const configure = async (cabazooka: Cabazooka.Instance): Promise<[Config]> => {
    let program = new Command();
    program
        .name(PROGRAM_NAME)
        .summary('Create Intelligent Release Notes or Change Logs from Git')
        .description('Create Intelligent Release Notes or Change Logs from Git')
        .option('--dry-run', 'perform a dry run without saving files', DEFAULT_DRY_RUN)
        .option('--verbose', 'enable verbose logging', DEFAULT_VERBOSE)
        .option('--debug', 'enable debug logging', DEFAULT_DEBUG)
        .option('--openai-api-key <openaiApiKey>', 'OpenAI API key', process.env.OPENAI_API_KEY)
        .option('--transcription-model <transcriptionModel>', 'OpenAI transcription model to use', DEFAULT_TRANSCRIPTION_MODEL)
        .option('--model <model>', 'OpenAI model to use', DEFAULT_MODEL)
        .option('--config-dir <configDir>', 'config directory', DEFAULT_CONFIG_DIR)
        .option('--overrides', 'allow overrides of the default configuration', DEFAULT_OVERRIDES)
        .option('--classify-model <classifierModel>', 'classifier model to use')
        .option('--compose-model <composeModel>', 'compose model to use')
        .option('--context-directories [contextDirectories...]', 'directories containing context files to be included in prompts')

    // Add common cabazooka options
    program = await cabazooka.configure(program);
    program.version(VERSION);

    program.parse();

    const input: Input = program.opts<Input>();

    const cabazookaRunConfig: Cabazooka.Config = await cabazooka.validate(input);
    // eslint-disable-next-line no-console
    console.debug('Cabazooka run config: %j', cabazookaRunConfig);


    const params = await validateInput(input);

    const combinedRunConfig: Config = {
        ...cabazookaRunConfig,
        ...params,
    } as Config;

    return [combinedRunConfig];
}

async function validateInput(input: Input): Promise<{
    dryRun: boolean;
    verbose: boolean;
    debug: boolean;
    model: string;
    transcriptionModel: string;
    configDir: string;
    overrides: boolean;
    classifyModel: string;
    composeModel: string;
    contextDirectories?: string[];
}> {


    if (!input.openaiApiKey) {
        throw new Error('OpenAI API key is required, set OPENAI_API_KEY environment variable');
    }


    if (input.configDir) {
        await validateConfigDirectory(input.configDir);
    }


    validateModel(input.model, true, '--model');
    validateModel(input.classifyModel, false, '--classify-model');
    validateModel(input.composeModel, false, '--compose-model');

    if (input.contextDirectories) {
        await validateContextDirectories(input.contextDirectories);
    }

    return {
        dryRun: input.dryRun,
        verbose: input.verbose,
        debug: input.debug,
        model: input.model,
        transcriptionModel: input.transcriptionModel ?? DEFAULT_TRANSCRIPTION_MODEL,
        configDir: input.configDir ?? DEFAULT_CONFIG_DIR,
        overrides: input.overrides ?? DEFAULT_OVERRIDES,
        classifyModel: input.classifyModel ?? DEFAULT_MODEL,
        composeModel: input.composeModel ?? DEFAULT_MODEL,
        contextDirectories: input.contextDirectories,
    };
}

function validateModel(model: string | undefined, required: boolean, modelOptionName: string) {
    if (required && !model) {
        throw new Error(`Model for ${modelOptionName} is required`);
    }

    if (model && !ALLOWED_MODELS.includes(model)) {
        throw new Error(`Invalid model: ${model}. Valid models are: ${ALLOWED_MODELS.join(', ')}`);
    }
}

async function validateConfigDirectory(configDir: string) {
    const logger = getLogger();
    const storage = Storage.create({ log: logger.info });
    if (!storage.isDirectoryReadable(configDir)) {
        throw new Error(`Config directory does not exist: ${configDir}`);
    }
}

async function validateContextDirectories(contextDirectories: string[]) {
    const logger = getLogger();
    const storage = Storage.create({ log: logger.info });
    for (const directory of contextDirectories) {
        if (!storage.isDirectoryReadable(directory)) {
            throw new Error(`Context directory does not exist or is not readable: ${directory}`);
        }
    }
}
