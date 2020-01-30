var AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000',
});
var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: 'Payment',
};

dynamodb.deleteTable(params, (err, data) => {
  if (err) {
    console.log(err, 'Error Ocurred');
  }
  console.log(data, ' Deleted successfully');
});
