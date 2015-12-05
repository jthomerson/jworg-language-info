var langs = require('../src/index');

langs.counts.all()
.then(function(data) {
   console.log(data);

   console.log('\n\n');
   console.log(langs.formatter.SHORT(data));
   console.log('\n\n');
   console.log(langs.formatter.LONG(data));
   console.log('\n\n');
})
.fail(function(err) {
   console.log('ERROR:', err, err.stack);
})
.done();
