import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";
import { listModels } from './models.mjs';


try {

  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const writeLogToFile = (log) => {
    const file = path.join(__dirname, '../', `run.log`);
    fs.appendFileSync(file, log);
    console.log(`Logs wrote to ${file}`);
  };
  // type: chat, completion
  const testModel = async (modelPath, type, prompt) => {
    console.log(`Model path: ${modelPath}`);
    const model = new LlamaModel({
      modelPath
    });

    const context = new LlamaContext({
      model
    });

    let LOGS = `Start on date: ${new Date().toISOString()}\n`;
    LOGS += `Model: ${modelPath}\n`;
    LOGS += `Type: ${type}\n`;
    LOGS += `Prompt: ${prompt}\n`;
    LOGS += '--------------\n';
    let result;
    const session = new LlamaChatSession({
      context
    });
    const q1 = prompt;
    const a1 = await session.prompt(q1);
    console.log(a1);
    LOGS += `User: ${q1}\n`;
    LOGS += `Llama: ${a1}\n`;
    result = a1;
    LOGS += '--------------\n';
    writeLogToFile(LOGS);
    return result;
  };

  if (process) {
    process.on('message', async () => {
      let results = '';
      for (const model of listModels) {
        console.log(`Testing model: ${model.name}`);
        results += '\n' + await testModel(path.join(__dirname, '../models', model.name), model.type, model.prompt);
        console.log('Test done.');
      }
      process?.send?.(results);
      successfulExit();
    });
    process.on('SIGTERM', () => {
      successfulExit();
    });
  }
  const successfulExit = () => {
    process.exitCode = 1;
    process.exit();
  };
} catch (error) {
  console.error(error);
}
