import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { downloadFile } from 'ipull';
import { listModels } from "./models.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const downloadModels = async () => {
  for (const model of listModels) {
    const modelPath = path.join(__dirname, '../models', model.name);
    try {
      const stats = fs.statSync(modelPath);
      if (stats.size > 0) {
        console.log('Model already exists:', model.name);
        continue;
      }
    } catch (e) {
      // File does not exist
    }

    console.log('Downloading:', model.name, model.url);

    const downloader = await downloadFile(model.url, {
      directory: path.join(__dirname, '../models'),
      fileName: model.name, // optional
      cliProgress: true
    });
    await downloader.download();
  }
  console.log('Download complete');
};

// run 
await downloadModels();