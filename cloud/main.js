const aws = require('aws-sdk');
var log = require('loglevel');

log.setLevel('debug');

const S3_BUCKET = process.env.S3_BUCKET;

Parse.Cloud.define('signS3', function(req, res) {
	var sig= require('amazon-s3-url-signer');

	var bucket = sig.urlSigner(process.env.S3_ACCESS_KEY, process.env.S3_SECRET_KEY, {useSubdomain:true});

	var url = bucket.getUrl('PUT', req.params.fileName, process.env.S3_BUCKET, 10); //url expires in 10 minutes
	res.success(url);

	// const s3 = new aws.S3();
	// const fileName = req.params.fileName;
	// const s3Params = {
	// 	Bucket: S3_BUCKET,
	// 	Key: fileName,
	// 	Expires: 60,
	// 	// ContentEncoding: 'base64',
 //  //   	ContentType: 'image/jpeg',
	// 	ACL: 'public-read'
	// };

	// s3.getSignedUrl('putObject', s3Params, (err, data) => {
	// 	if(err){
	// 		log.error(err);
	// 		return res.error();
	// 	}
	// 	const returnData = {
	// 		signedRequest: data,
	// 		url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
	// 	};
	// 	res.success(JSON.stringify(returnData));
	// });
	
});

Parse.Cloud.define('getLatestBatchNumber', function(req, res) {
	res.success(1337);
});
