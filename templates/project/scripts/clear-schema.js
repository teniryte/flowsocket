const path = require('path');
const fs = require('fs');

const filename = path.resolve(__dirname, '../prisma/schema.prisma');

const source = fs.readFileSync(filename, 'utf8');

const code = fs.readFileSync(path.resolve(__dirname, '../prisma/header.prisma'), 'utf-8') + '\n\n' + source.replace(/\/\/ Header\n([\s\S]*?)\/\/ Schema/mgi, '');

fs.writeFileSync(filename, code);
