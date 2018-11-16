
const aws = require('aws-sdk');

aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
  secretAccessKey: process.env.AWSSecretKey,
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
  accessKeyId: process.env.AWSAccessKeyId,
  region: 'us-east-1' // region of your bucket
});
// sets new instance of aws s3
const s3 = new aws.S3();

const multer = require('multer');
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
    // allows for new instances of s3 created from above
    s3: s3,
    // name of bucket on aws s3
    bucket: 'ratemydiy',
    // access control for the file (‘public read’ means that anyone can view files)
    // you can check all the available types here:
    // https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl 
    acl: 'public-read',
    // metadata stored on asw s3
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // What to call file on AWS server
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;