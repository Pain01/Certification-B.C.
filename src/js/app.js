App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("CV.json", function(cv) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.CV = TruffleContract(cv);
      // Connect provider to interact with contract
      App.contracts.CV.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.hide();
    content.show();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
  },
issue: function (){
    var inst;
    var loader = $("#loader");
    var content = $("#content");
    loader.show();
    content.hide();
      //Get form data
      var name = $('#name').val();
      var mname = $('#Mname').val();
      var ename = $('#ename').val();
      var year = $('#year').val();
      var branch = $('#branch').val();
      var s_no = $('#s_no').val();
      var mname = $('#Mname').val();
      var f0 = $('#f0').val();
      var f11 = $('#f11').val();
      var f12 = $('#f12').val();
      var f13 = $('#f13').val();
      var f14 = $('#f14').val();
      var f15 = $('#f15').val();
      var f16 = $('#f16').val();
      var f17 = $('#f17').val();
      var f18 = $('#f18').val();
      var f19 = $('#f19').val();
      var f20 = $('#f20').val();
      var f21 = $('#f21').val();
      var f22 = $('#f22').val();
      var f23 = $('#f23').val();
      var f24 = $('#f24').val();
      var f25 = $('#f25').val();
      var remark = $('#remark').val();

      var str = name+mname+ename+year+branch+s_no+mname+f0+f11+f12+f13+f14+f15+f16+f17+f18+f19+f20+f21+f22+f23+f24+f25+remark;
      str=str.toString();
    // Load contract data
    App.contracts.CV.deployed().then(function(instance) {
      inst = instance;
      inst.addCT(web3.sha3(str));
      return inst.ctCount();
    }).then(function(result){
      $('#result').html("Result: " + result);
      loader.hide();
    }).
      catch(function(error) {
      console.warn(error);
    });
  },

  verifier: function(){
      var inst;
      var loader = $("#loader");
      var content = $("#content");
      loader.show();
      content.hide();
        //Get form data
      var name = $('#name').val();
      var mname = $('#Mname').val();
      var ename = $('#ename').val();
      var year = $('#year').val();
      var branch = $('#branch').val();
      var s_no = $('#s_no').val();
      var mname = $('#Mname').val();
      var f0 = $('#f0').val();
      var f11 = $('#f11').val();
      var f12 = $('#f12').val();
      var f13 = $('#f13').val();
      var f14 = $('#f14').val();
      var f15 = $('#f15').val();
      var f16 = $('#f16').val();
      var f17 = $('#f17').val();
      var f18 = $('#f18').val();
      var f19 = $('#f19').val();
      var f20 = $('#f20').val();
      var f21 = $('#f21').val();
      var f22 = $('#f22').val();
      var f23 = $('#f23').val();
      var f24 = $('#f24').val();
      var f25 = $('#f25').val();
      var remark = $('#remark').val();

      var str = (name+mname+ename+year+branch+s_no+mname+f0+f11+f12+f13+f14+f15+f16+f17+f18+f19+f20+f21+f22+f23+f24+f25+remark).toString();
    // Load contract data
      App.contracts.CV.deployed().then(function(instance) {
      return instance.checker(web3.sha3(str),1);
    }).then(function(i){
      if(i==true){
        $('#result').html("Certificate is Valid");
      }
      else{
        $('#result').html("Certificate is not Valid");
      }
    }).
      catch(function(error) {
      console.warn(error);
    });

  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});