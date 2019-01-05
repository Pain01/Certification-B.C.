var CV = artifacts.require("./CV.sol");

contract("CV", function(accounts) {
  var cvInstance;

  it("ADding.", function() {
    return CV.deployed().then(function(instance) {
      //cvInstance = instance
      instance.addCT('Sarvesh');
      return instance.ctCount();
    }).then(function(count){
      assert.equal(count,1)
      //console.log(count);
    });
  });

  it("it verify", function() {
    return CV.deployed().then(function(instance) {
      cvInstance = instance;
      return cvInstance.checker('Sarvesh',1);
    }).then(function(t) {
      assert.equal(t,true);
      
      return t;
    });
  });
});