#!/usr/bin/env node

import { Client, formatter } from './index';
import yargs from 'yargs';

const client = new Client();

function infoCommandDescription(y: yargs.Argv<{}>): yargs.Argv<{ lang: string }> {
   return y.positional('lang', { describe: 'languge code or locale', type: 'string' }).demandOption('lang');
}

async function doInfo(argv: yargs.Arguments): Promise<void> {
   const lang = argv.lang as string;

   client.info(lang).then((data) => {
      console.log(data);
   });
}

/* eslint-disable-next-line no-unused-expressions */
yargs(process.argv.slice(2))
   .command('info [lang]', 'get info for specified language', infoCommandDescription, doInfo)
   .command('counts', 'get all counts', () => {
      client.all()
         .then(function(data) {
            console.log(data);
            console.log('\n---\n');
            console.log('Short:\n' + formatter.SHORT(data));
            console.log('\n---\n');
            console.log('Long:\n' + formatter.LONG(data));
         });
   })
   .help('h')
   .alias('h', 'help')
   .argv;
