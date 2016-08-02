const aws = require('aws-sdk');
var log = require('loglevel');
var sig= require('amazon-s3-url-signer');

log.setLevel('debug');

const S3_BUCKET = process.env.S3_BUCKET;

Parse.Cloud.define('signS3', function(req, res) {
	var bucket = sig.urlSigner(process.env.S3_ACCESS_KEY, process.env.S3_SECRET_KEY);

	var url = bucket1.getUrl('PUT', req.params.fileName, process.env.S3_BUCKET, 10); //url expires in 10 minutes
	
	res.success(url);
});

Parse.Cloud.define('getLatestBatchNumber', function(req, res) {
	res.success(1337);
});
