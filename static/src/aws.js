const AWS = require("aws-sdk");
require("dotenv").config();

let bucket_name = "smg-mobile-test-toubeelo";
let bucket_region = "us-east-2";
let IdentityPoolId = process.env.IDENTITY_POOL_ID;

AWS.config.update({
	region: bucket_region,
	credentials: new AWS.CognitoIdentityCredentials({
		IdentityPoolId: IdentityPoolId,
	}),
});

let s3 = new AWS.S3({
	apiVersion: "2006-03-01",
	params: { Bucket: bucket_name },
});

function upload(file) {
	return new Promise((resolve, reject) => {
		if (file) {
			let key = file.name;
			let file_url = `https://${bucket_name}.s3.${bucket_region}.amazonaws.com/${file.name}`;

			s3.upload(
				{
					Bucket: bucket_name,
					Key: key,
					Body: Buffer.from(file.data, "binary"),
					ACL: "bucket-owner-full-control",
					ContentType: file.mimetype,
				},
				(err) => {
					if (err) {
						console.log(err);
						reject("Could not upload file...");
					}

					resolve(file_url);
				}
			);
		} else {
			reject({ msg: "Please select a file first..." });
		}
	});
}

module.exports = { upload };
