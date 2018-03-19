var Process = require("./Process/Process");

exports.handler =  function(event, context, callback) {
    event.Records.forEach(function(record) {
        const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        const ENV_URL_SEARCH = process.env.URL_SEARCH;
        const ENV_URL_FINISH = process.env.URL_FINISH;

        console.log('-- Processing Info --');
        console.log('Kinesis data: ' + record.kinesis.data);
        console.log('Url search: ' + ENV_URL_SEARCH);
        console.log('Url finish: ' + ENV_URL_FINISH);
        console.log('---------------------');

        var parsedData = JSON.parse(payload);
        console.log(parsedData.searchId);
        var ObjProcess = new Process(
            parsedData,
            ENV_URL_SEARCH,
            ENV_URL_FINISH
        );
        ObjProcess.run();
    });

    callback(null, 'Message processed');
};