var request = require('request'),
		log = require('debug')('lendingclub'),
		util = require('util');


function LendingClubError (error) {
  Error.captureStackTrace(this, LendingClubError);
  this.error = error;
}

util.inherits(LendingClubError, Error);

LendingClubError.prototype.toString = function toString () {
  return "LendingClubError: " + this.error;
};


var LendingClub = function(options){
	if(!options || !options.key)
		throw new LendingClubError('Must provide an API key to use lending club api');

	this.apiKey = options.key;
	this.baseURI = 'https://api.lendingclub.com/api/investor/v1/';
	
	var self = this;

	function get (url, callback){
		var reqObject = {
			url: url,
			headers: {
				'Authorization': self.apiKey,
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		};

		request.get(reqObject, function (err, res, data) {
      if (err) {
        return callback(err);
      } else {
        try {
          data = JSON.parse(data);
        } catch (err) {
          return callback(err);
        }
        if (data.success === false || data.errors || data.error) {
          return callback(new LendingClubError(data.errors || data.error));
        }
        return callback(null, data);
      }
    });
		
	};

	function post(url, param,  callback){
		var body = JSON.stringify(param);
		var reqObject = {
			url: url,
			body: body,
			headers: {
				'Authorization': this.apiKey,
				'content-type': 'application/json'
			}
		};

    request.post(reqObject, function (err, res, data) {
      if (err) { return callback(err); }
      try {
        data = JSON.parse(data);
      } catch (err) {
        return callback(err);
      }
      if (data.success === false || data.errors || data.error) {
        return callback(new LendingClubError(data.errors || data.error));
      }
      return callback(null, data);
    });
	};


	this.loans = {};

	// GET loans/list
	this.loans.list = function(callback){
		var url = self.baseURI + 'loans/listing';

		log('get ' + url);

		get(url, callback);
	};

};



module.exports = LendingClub;
