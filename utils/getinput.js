require('dotenv').config()
const texttobinary = require('./text-binary');
const binarytotext = require('./binary-text');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = async (groupid, challenge) => {
    const bucket = 'ozark-storage';
    const key = `${groupid}/${challenge}.txt`;
    try {
        await s3.headObject({ Bucket: bucket, Key: key }).promise()
        const data = await s3.getObject({ Bucket: bucket, Key: key }).promise();
        return binarytotext(data.Body)
    } catch (err) {
        const generator = require(`../generator/challenge${challenge}`);
        const text = generator(groupid, challenge);
        s3.putObject({
            Body: texttobinary(text),
            Bucket: bucket,
            Key: key,
            ServerSideEncryption: 'AES256',
        }, async function (err, data) {});
        return text
    }
}