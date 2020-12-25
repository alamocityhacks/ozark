require('dotenv').config()
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-1',
    accessKeyId: process.env.OZARK_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.OZARK_AWS_SECRET_ACCESS_KEY
});

module.exports = (groupid, challenge, bucket, key) => {
    const generator = require(`../generators/challenge${challenge}`);
    const text = generator(groupid, challenge);
    s3.upload({
        Body: text,
        Bucket: bucket,
        Key: key,
        ServerSideEncryption: 'AES256',
        ContentType: 'text/plain',
    }, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
    return text
}