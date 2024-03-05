import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { LlamaModel, LlamaChatSession, LlamaContext } from 'node-llama-cpp';
import { listModels } from './models.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelName = 'nous-hermes-2-mixtral-8x7b-sft.Q2_K.gguf';
const modelPath = path.join(__dirname, '../models', modelName);



const writeLogToFile = (log) => {
  const file = path.join(__dirname, '../', `run.log`);
  fs.appendFileSync(file, log);
  console.log(`Logs wrote to ${file}`);
};

const testModel = async (modelPath) => {
  const model = new LlamaModel({
    modelPath
  });

  const context = new LlamaContext({ model });
  const session = new LlamaChatSession({ context });
  let LOGS = `Start on date: ${new Date().toISOString()}\n`;
  LOGS += `Model: ${modelPath}\n`;
  LOGS += '--------------\n';
  const q1 = `Hello! What is your name?\n`;
  LOGS += `User: ${q1}\n`;
  const a1 = await session.prompt(q1);
  LOGS += `Llama: ${a1.trim()}\n`;
  process?.send?.(a1);
  LOGS += '--------------\n';
  writeLogToFile(LOGS);
};

if (process) {
  process.on('message', async () => {
    console.log('Starting test...');
    for (const model of listModels) {
      await testModel(path.join(__dirname, '../models', model.name));
    }
    successfulExit();
  });
  process.on('SIGTERM', () => {
    successfulExit();
  });
}
const successfulExit = () => {
  process.exitCode = 1;
  process.exit();
}

