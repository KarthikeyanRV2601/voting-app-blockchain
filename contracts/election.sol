pragma solidity >=0.4.22 <0.8.0;

contract election{
    //constructor
    struct candidate{
        uint id;
        string name;
        uint voteCount;
        
    }
    
    //store accounts that have voted
    mapping(address=>bool) public voters;
     
    mapping(uint=>candidate) public candidates;
    uint public candidatesCount;
    
    constructor() public{
        
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory name) private{
        
        candidatesCount++;
        candidates[candidatesCount]=candidate(candidatesCount,name,0);
        
    }
    function vote(uint _candidateID)public{
        //record that voter has voted 
        //check if the address has not voted before
        require(!voters[msg.sender] && _candidateID>0 &&_candidateID<=candidatesCount);
        voters[msg.sender]=true;
        candidates[_candidateID].voteCount+=1;
       
        
    }
    

}