var test = require('tape');

var aws = require('../index');

test('sanity check', function(t){
    t.plan(1);
    t.ok(aws);
});
