widenbot-aws
----

An (work-in-progress) AWS plugin for widenbot.

# Commands

## EC2

### `desc`

`aws ec2 desc`
Returns result of `describeInstances`

## S3

### `listBuckets`

`aws s3 listBuckets`
Returns result of `listBuckets`

# Installation

1. Add dependency to your bot project:

```
npm install --save widenbot-aws
```

2. Enable in config `plugins`:

```
module.exports = {
    plugins : {
        // ...
        aws: {}
    }
}
```
