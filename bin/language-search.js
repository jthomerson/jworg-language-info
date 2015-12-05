var langs = require('../src/index'),
    search = (process.argv.length > 2 ? process.argv[2] : false),
    field = (process.argv.length > 3 ? process.argv[3] : false);

if (!search) {
   console.log('You must specify a search');
   process.exit(-1);
}

langs.info(search, field)
.then(function(data) {
   console.log(data);
})
.fail(function(err) {
   console.log('ERROR:', err, err.stack);
})
.done();
