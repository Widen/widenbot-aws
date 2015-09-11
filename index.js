var promise = require('promise'),
    AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

function ec2(args) {
    return new promise(function(resolve, reject){
        var ec2Client = new AWS.EC2();
        if (args[0] && args[0].indexOf('desc') !== -1) {
            ec2Client.describeInstances(function(error, data){
                if (error) {
                    return reject(error);
                }
                return resolve(JSON.stringify(data));
            });
        } else {
            return reject(new Error("no command matched"));
        }
    });
}

function s3(args) {
    return new promise(function(resolve, reject){
        var s3Client = new AWS.S3();
        if (args[0] && args[0].indexOf('listBuckets') !== -1) {
            s3Client.listBuckets(function(error, data){
                if (error) {
                    return reject(error);
                }
                return resolve(JSON.stringify(data));
            });
        }
        else {
            return reject(new Error("no command matched"));
        }
    });
}

var aws = module.exports = {

    "name": "aws",
    "author": "Mark Feltner",
    "description": "Query Services on AWS",
    "help": "!aws [service] [command]",

    "pattern": /^aws/,
    "respond": function(ctx) {

        var args = ctx.args.split(' ');
        switch (args[0]) {
            case 'ec2': {
                return ec2(args.slice(1));
            }
            case 's3': {
                return s3(args.slice(1));
            }
        }
    }
};
