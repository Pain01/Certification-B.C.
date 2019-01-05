pragma solidity ^0.5.0;

contract CV {
    // Model a Candidate
    struct certificate {
        uint id;
        string hash;
    }

    // Read/write candidates
    mapping(uint => certificate) public ct;

    // Store Candidates Count
     uint public ctCount=0;

    function addCT (string memory _hash) public {
        ctCount ++;
        ct[ctCount] = certificate(ctCount, _hash);
        //return ctCount;
    }
    
    
    function checker(string memory inputHash, uint cid) public view returns(bool) {
       // return (StringUtils.equal(inputHash,storedHash));
        bytes memory _inputHash = bytes(inputHash);
        string memory h = ct[cid].hash;
        bytes memory _storedHash = bytes(h);
        if (_inputHash.length != _storedHash.length){
            return false;
        }
        else{
            return keccak256(_inputHash) == keccak256(_storedHash);
        }

}
}