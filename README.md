# lending-club-api
Unofficial Lending Club API 

How to use it:

Require lendingClub

```
var LendingClub = require('lending-api');

var lendingClub = new LendingClub({
	key: config.key,
	investorId: config.investorId
});

```

Make a call to the API using a chosen method.

```
lendingClub.loans.list(function(err, data){
	if(err) return done(err);
  console.log(data);
});
```

The following methods have been implemented and work against the Lending Club api.

   - lendingClub.loans.list
   - lendingClub.account.summary
   - lendingClub.account.availableCash
   - lendingClub.account.transfer.add
   - lendingClub.account.transfer.withdraw
   - lendingClub.account.pendingTransfers
   - lendingClub.account.cancelTransfers
   - lendingClub.account.notesOwned
   - lendingClub.account.detailedNotesOwned
   - lendingClub.account.portFoliosOwned
   - lendingClub.account.createPortfolio
   - lendingClub.account.submitOrder


