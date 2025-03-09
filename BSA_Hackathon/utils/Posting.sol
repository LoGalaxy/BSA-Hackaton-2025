// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Postings {
    struct Posting {
        string name;
        string hederaAccountId; 
        uint256 price;
    }

    Posting[] public postings;

    event PostingAdded(uint256 indexed index, string name, string hederaAccountId, uint256 price);

    function addPosting(string memory _name, string memory _hederaAccountId, uint256 _price) public returns (uint256) {
        postings.push(Posting({
            name: _name,
            hederaAccountId: _hederaAccountId,
            price: _price
        }));
        
        uint256 newIndex = postings.length - 1; 

        emit PostingAdded(newIndex, _name, _hederaAccountId, _price);

        return newIndex; 
    }

    function getPosting(uint256 _index) public view returns (string memory name, string memory hederaAccountId, uint256 price) {
        require(_index < postings.length, "Invalid posting index");
        Posting storage posting = postings[_index];
        return (posting.name, posting.hederaAccountId, posting.price);
    }
}
