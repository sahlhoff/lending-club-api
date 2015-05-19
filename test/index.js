var log = require('debug')('lendingClub:test'),
    util = require('util'),
		config = require('../config.json');

require('should');

var LendingClub = require('../lib/index.js');

var lendingClub = new LendingClub({
	key: config.key
});


describe('lendingClub.loans.list', function(){
	it('should return list of loans', function(done){
		lendingClub.loans.list(function(err, data){
			if(err) return done(err);
			log('data: ' + util.inspect(data, null, 5));
			done();
		});
	});
});




