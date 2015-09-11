var promise = require('promise'),
    AWS = require('aws-sdk'),
    minimist = require('minimist'),
    prettyjson = require('prettyjson'),
    argParse = require('shell-quote').parse;

AWS.config.update({ region: 'us-east-1' });

var aws = module.exports = {

    "name": "aws",
    "author": "Mark Feltner",
    "description": "Query Services on AWS",
    "help": "!aws <service> <command> [<args>]",

    "pattern": /^aws/,
    "respond": function(ctx) {

        return new promise(function(resolve, reject){

            var log = ctx.log;

            var argv = minimist(argParse(ctx.args)),
                args = argv._ ,
                command = args[0],
                subCommands = args.slice(1);

            var format;
            if (argv.format) {
                format = argv.format;
            }

            var instance, instance_constructor_name;
            if (command.length <= 3) {
                // ecs -> ECS, ec2->EC2, etc ... (they're all upper-case)
                instance_constructor_name = command.toUpperCase();
            } else {
                // cloudTrail -> CloudTrail, autoScaling->AutoScaling, etc. (first letter capitalized + camel case)
                instance_constructor_name = command[0].toUpperCase() + command.slice(1);
            }
            instance = new AWS[instance_constructor_name]();

            if (subCommands.length >= 1) {
                var params = {},
                    subCommand = subCommands[0],
                    subCommandParams = subCommands.slice(1);

                if (subCommandParams.length >= 1) {
                    subCommandParams.forEach(function(subCommandParam){
                        var split = subCommandParam.split('=', 2);
                        params[split[0]] = split[1];
                    });
                }

                log.info(instance_constructor_name + " " + subCommand + " " + params);
                if (instance[subCommand] && typeof instance[subCommand] === 'function') {
                    instance[subCommand](params, function(err, data){
                        if (err) {
                            return reject(err);
                        }
                        var output = '';
                        switch (format) {
                            case 'pretty':
                                output = prettyjson.render(data, { noColor: true });
                                break;
                            case 'min':
                                output = JSON.stringify(data);
                                break;
                            default:
                                output = JSON.stringify(data, null, '\t');
                                break;
                        }

                        output = "```\n" +
                                 output + "\n" +
                                 "```\n";
                        return resolve(output);
                    });
                }
            }
            else {
                return reject(new Error("no aws command or method matched"));
            }
        });

    }
};
