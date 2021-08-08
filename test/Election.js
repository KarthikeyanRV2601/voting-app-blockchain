
var election=artifacts.require('./election.sol');

 contract("election",function(accounts){
    var electionInstance;
    it("Initializes with two candidates",function(){
        return election.deployed().then(
            function(instance){
                return instance.candidatesCount();
            }).then(function(count){
                assert.equal(count,2);
            });
    });

    it("it initializes candidates with the correct values",function(){
        return election.deployed().then(
            function(instance){
                electionInstance=instance;
                return electionInstance.candidates(1);
            }).then(function(candidate){
                assert.equal(candidate[0],1,"contains the correct id");
                assert.equal(candidate[1],"Candidate 1","contains the correct name");
                assert.equal(candidate[2],0,"contains the correct vote count");
                return electionInstance.candidates(2);
            }).then(function(candidate){
                assert.equal(candidate[0],2,"contains the correct id");
                assert.equal(candidate[1],"Candidate 2","contains the correct name");
                assert.equal(candidate[2],0,"contains the correct vote count");
            });
        
    });
    it("allows a voter to caste a vote",function(){
            return election.deployed().then(function(instance){
                electionInstance=instance;
                candidateID=1;
                return electionInstance.vote(candidateID,{from:'0x03685F71593bc78d1b9aB606c492c63f456eB419'});
            }).then(function(receipt){
                return electionInstance.voters('0x03685F71593bc78d1b9aB606c492c63f456eB419');
            }).then(function(voted){
                assert(voted,"the voter was marked as voted");
                return electionInstance.candidates(candidateID);
            }).then(function(candidate){
                var voteCount=candidate.voteCount['words'][0];
                
                assert.equal(voteCount,1,"increments the candidate's vote count");
            });
    });
    
});