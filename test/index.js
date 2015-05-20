var log = require('debug')('lendingClub:test'),
    util = require('util'),
		config = require('../config.json');

require('should');

var LendingClub = require('../lib/index.js');

var lendingClub = new LendingClub({
	key: config.key,
	investorId: config.investorId
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
describe('lendingClub.account.summary', function(){
	it('should return summary of account', function(done){
		lendingClub.account.summary(function(err, data){
			if(err) return done(err);
			done();
		});
	});
});
describe('lendingClub.account.availablecash', function(){
	it('should return available cash in account', function(done){
		lendingClub.account.availableCash(function(err, data){
			if(err) return done(err);
			done();
		})
	});
});
describe('lendingClub.account.transfer.add', function(){
	it('should add funds to account', function(done){
		lendingClub.account.transfer.add(function(err, data){
			if(err) return done(err);
			done();
		});
	});
});
describe('lending.account.transfer.withdraw', function(){
	it('should withdraw funds from account', function(done){
		lendingClub.account.transfer.withdraw(function(err, data){
			if(err) return done(err);
			done();
		});
	});
});


