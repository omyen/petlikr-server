const aws = require('aws-sdk');
var log = require('loglevel');

log.setLevel('debug');

const S3_BUCKET = process.env.S3_BUCKET;

Parse.Cloud.define('signS3', function(req, res) {
	var AWS = require('aws-sdk');
	var s3 = new AWS.S3({params: {Bucket: process.env.S3_BUCKET, Key: process.env.S3_ACCESS_KEY}});
	s3.getSignedUrl('getObject', {ACL: 'public-read'}, function (err, url) {
  		if(err){
			log.error(err);
			return res.error();
		}
		res.success(url);
	});
	// const s3 = new aws.S3();
	// const fileName = req.params.fileName;
	// const s3Params = {
	// 	Bucket: S3_BUCKET,
	// 	Key: fileName,
	// 	Expires: 60,
	// 	ContentEncoding: 'base64',
 //    	ContentType: 'image/jpeg',
	// 	ACL: 'public-read'
	// };

	// s3.getSignedUrl('putObject', s3Params, (err, data) => {
	// 	if(err){
	// 		log.error(err);
	// 		return res.error();
	// 	}
	// 	res.success(data);
	// });
	
});

Parse.Cloud.define('getLatestBatchNumber', function(req, res) {
	res.success(1337);
});
