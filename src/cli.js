const { Command } = require('commander');

const program = new Command();

program.version('0.0.1').name('trs').usage('<word>');

program.parse(process.argv);
