require('dotenv').config()
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-1',
    accessKeyId: process.env.OZARK_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.OZARK_AWS_SECRET_ACCESS_KEY
});

module.exports = async (bucket, key) => {
    try {
        await s3.headObject({ Bucket: bucket, Key: key }).promise();
        return true
    } catch {
        return false
    }
}