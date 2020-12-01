import { Command } from 'commander';
import { translate } from './main';

const program = new Command();

program
  .version('0.0.1')
  .name('trs')
  .usage('<word>')
  .arguments('<word>')
  .action((word) => {
    // console.log(word);
    translate(word);
  });

program.parse(process.argv);
