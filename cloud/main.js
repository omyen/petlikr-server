const aws = require('aws-sdk');
var log = require('loglevel');

log.setLevel('debug');

const S3_BUCKET = process.env.S3_BUCKET;

Parse.Cloud.define('signS3', function(req, res) {
	const s3 = new aws.S3();
	const fileName = req.params.fileName;
	const s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName,
		Expires: 60,
		// ContentEncoding: 'base64',
     	//ContentType: 'text/plain;charset=UTF-8',
     	ContentType: 'image/jpeg',
		ACL: 'public-read'
	};

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if(err){
			log.error(err);
			return res.error();
		}
		const returnData = {
			signedRequest: data,
			url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
		};
		res.success(returnData);
	});
	
});

Parse.Cloud.afterSave('User', function(req) 
{	
	try{
		var user = req.object;
		var query = Parse.Query("User");
		query.greaterThan('numPats', user.get('numPats'));
		query.count().then(function(result){
			user.set('rank', result+1);
			return user.save();
		}).then(function(result){
			return;
		});
	} catch (e){
		log.error('[afterSave User] Info=\'Failed\' error=' + e.message);
		return; 
	}
});