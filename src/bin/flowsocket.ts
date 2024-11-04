#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { cp } from 'fs/promises';
import { camelCase, capitalize, each, kebabCase } from 'lodash';

const command = process.argv[2];

async function run() {
  if (command === 'start') {
    const projectName = process.argv[3];
    if (existsSync(projectName)) {
      console.log(`Directory "${projectName}" already exists`);
      return;
    }
    await cp(resolve(__dirname, '../../templates/project'), projectName, {
      recursive: true,
    });

    const REPLACE_FILES = [
      'src/application.ts',
      'src/main.ts',
      '.env',
      'package.json',
      'README.md',
    ];

    const REPLACE_VARS = {
      'packageName': projectName,
      'appClass': capitalize(camelCase(projectName)),
      'dbName': kebabCase(projectName)
    };

    REPLACE_FILES.forEach(file => {
      const filename = resolve(projectName, file);
      let source = readFileSync(filename, 'utf-8');
      each(REPLACE_VARS, (value, name) => {
          while (source.includes(`{{${name}}}`)) {
            source = source.replace(`{{${name}}}`, value);
          }
      });
      writeFileSync(filename, source);
    })
  }
}

run();
