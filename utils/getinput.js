require('dotenv').config()
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-1',
    accessKeyId: process.env.OZARK_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.OZARK_AWS_SECRET_ACCESS_KEY
});
const fileExists = require('./fileexists');
const createInput = require('./createinput');

module.exports = async (groupid, challenge) => {
    const bucket = 'ozark-storage';
    const key = `${groupid}/${challenge}.txt`;
    if (await fileExists(bucket, key)) {
        const data = await s3.getObject({ Bucket: bucket, Key: key }).promise();
        return data.Body.toString('ascii');
    } else {
        return createInput(groupid, challenge, bucket, key);
    }
}