var test = require('tape');

var aws = require('../index');

test('sanity check', function(t){
    t.plan(1);
    t.ok(aws);
});

test('s3', function(t){
    t.plan(1);

    aws.respond({
        brain: {},
        command: 'aws',
        log: {
            info: console.log,
            error: console.error
        },
        args: 's3 listBuckets',
        incoming_message: {
            user_name: 'feltnerm'
        }
    }).then(function(result){
        t.pass(result);
    }).catch(function(error){
        t.fail(error);
    });

});

test('ec2', function(t){
    t.plan(1);

    aws.respond({
        brain: {},
        command: 'aws',
        log: {
            info: console.log,
            error: console.error
        },
        args: 'ec2 desc',
        incoming_message: {
            user_name: 'feltnerm'
        }
    }).then(function(result){
        t.pass(result);
    }).catch(function(error){
        t.fail(error);
    });

})
