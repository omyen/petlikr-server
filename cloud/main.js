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

Parse.Cloud.beforeSave('_User', function(req, res) 
{	
	try{
		var dirtyKeys = req.object.dirtyKeys();
		log.debug('[beforeSave User] Info=\'User\' dirtyKeysLength=' + dirtyKeys.length + ' dirtyKeys=' + dirtyKeys);
		var shouldReturnImmediately = true;
		for (var i = 0; i < dirtyKeys.length; ++i) {
			if(dirtyKeys[i]=='numPats'){
				shouldReturnImmediately = false;
				var query = new Parse.Query("User");
				query.greaterThan('numPats', req.object.get('numPats'));	
				query.count().then(function(result){
					log.debug('[beforeSave User] Info=\'Got count\' count=' + result);
					req.object.set('rank', result+1);
					res.success();
				})
			}
		}
		if(shouldReturnImmediately){
			res.success();
		}
	} catch (e){
		log.error('[beforeSave User] Info=\'Failed\' error=' + e.message);
		res.success();
	}
	//either way, return success to the user
	
});