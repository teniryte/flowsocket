#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { cp } from 'fs/promises';
import { camelCase, each, kebabCase } from 'lodash';

const command = process.argv[2];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
      packageName: projectName,
      appClass: capitalize(camelCase(projectName)),
      dbName: kebabCase(projectName),
    };

    REPLACE_FILES.forEach((file) => {
      const filename = resolve(projectName, file);
      let source = readFileSync(filename, 'utf-8');
      each(REPLACE_VARS, (value, name) => {
        while (source.includes(`{{${name}}}`)) {
          source = source.replace(`{{${name}}}`, value);
        }
      });
      writeFileSync(filename, source);
    });
  }

  if (command === 'scheme') {
    const [moduleName, schemaName] = process.argv[3].split('/');
    if (!existsSync(`src/${moduleName}`)) {
      mkdirSync(`src/${moduleName}`);
    }
    if (!existsSync(`src/${moduleName}/schemas`)) {
      mkdirSync(`src/${moduleName}/schemas`);
    }
    const header = readFileSync('prisma/header.prisma', 'utf-8');
    writeFileSync(
      `src/${moduleName}/schemas/${schemaName}.prisma`,
      `// Header

${header}

// Schema
model ${capitalize(camelCase(schemaName))} {
  id       String    @id @default(auto()) @map("_id") @db.ObjectId
}`,
    );
  }

  if (command === 'module') {
    const moduleName = process.argv[3];
    if (!existsSync(`src/${moduleName}`)) {
      mkdirSync(`src/${moduleName}`);
    }
    const className = capitalize(camelCase(moduleName));
    writeFileSync(
      `src/${moduleName}/${moduleName}.module.ts`,
      `import { Module, AppModule } from 'flowsocket';
import { ${className}Service } from './${moduleName}.service';
import { ${className}Controller } from './${moduleName}.controller';

@AppModule({
  services: [${className}Service],
  controllers: [${className}Controller]
})
export class ${className}Module extends Module {

}
`,
    );
    writeFileSync(
      `src/${moduleName}/${moduleName}.controller.ts`,
      `import { Controller, AppController } from 'flowsocket';

@AppController()
export class ${className}Controller extends Controller {

}`,
    );
    writeFileSync(
      `src/${moduleName}/${moduleName}.service.ts`,
      `import { Service, AppService } from 'flowsocket';

@AppService()
export class ${className}Service extends Service {

}`,
    );
  }
}

run();
