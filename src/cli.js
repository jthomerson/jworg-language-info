var jli = require('./index');

jli.counts.all()
   .then(function(data) {
      console.log(JSON.stringify(data, null, 3));
      console.log('\n---\n');
      console.log('Short:\n' + jli.formatter.SHORT(data));
      console.log('\n---\n');
      console.log('Long:\n' + jli.formatter.LONG(data));
   })
   .done();
