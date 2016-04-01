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
	if(!options || !options.key || !options.investorId)
		throw new LendingClubError('Must provide an API key and investorId to use lending club api');

	this.apiKey = options.key;
	this.investorId = options.investorId;
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
				'Authorization': self.apiKey,
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


	this.account = {};

	this.account.summary = function(callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/summary';

		get(url, callback);
	};

	this.account.availableCash = function(callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/availablecash';

		get(url, callback);
	};

	this.account.transfer = {};
	
	this.account.transfer.add = function(reqObject, callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/funds/add';

		post(url, reqObject, callback);
	};

	this.account.transfer.withdraw = function(reqObject, callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/funds/withdraw';

		post(url, reqObject, callback);
	};

	this.account.pendingTransfers = function(callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/funds/pending';

		get(url, callback);
	};

	this.account.cancelTransfers = function(reqObject, callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/funds/cancel';

		post(url, reqObject, callback);
	};

	this.account.notesOwned = function(callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/notes';

		get(url, callback);
	};

	this.account.detailedNotesOwned = function(callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/detailednotes';

		get(url, callback);
	};

	this.account.portfoliosOwned = function(callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/portfolios';

		get(url, callback);
	};

	this.account.createPortfolio = function(reqObject, callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/portfolios';

		post(url, reqObject, callback);
	};

	this.account.submitOrder = function(reqObject, callback){
		var url = self.baseURI + 'accounts/' + self.investorId + '/orders';

		post(url, reqObject, callback);
	};
	
};



module.exports = LendingClub;
