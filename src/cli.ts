import { Client, formatter } from './index';

const client = new Client();

if (process.argv.length > 2) {
   const search = process.argv[2];

   client.info(search).then((data) => {
      console.log(data);
   });
} else {
   client.all()
      .then(function(data) {
         console.log(JSON.stringify(data, null, 3));
         console.log('\n---\n');
         console.log('Short:\n' + formatter.SHORT(data));
         console.log('\n---\n');
         console.log('Long:\n' + formatter.LONG(data));
      });
}
