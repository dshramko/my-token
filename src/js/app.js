App = {
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 0,
  tokensSold: 0,
  tokensAvailable: 750000,

  init() {
    console.log('App initialized...');
    return App.initWeb3();
  },

  initWeb3() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  initContracts() {
    $.getJSON("TokenSale.json", (tokenSale) => {
      App.contracts.TokenSale = TruffleContract(tokenSale);
      App.contracts.TokenSale.setProvider(App.web3Provider);
      App.contracts.TokenSale.deployed().then(tokenSale => {
        console.log('Token Sale contract address: ', tokenSale.address);
      })
    }).done(() => {
      $.getJSON("MyToken.json", (myToken) => {
        App.contracts.myToken = TruffleContract(myToken);
        App.contracts.myToken.setProvider(App.web3Provider);
        App.contracts.myToken.deployed().then(myToken => {
          console.log('MyToken contract address: ', myToken.address);
        })
        App.listenForEvents();
        return App.render();
      });
    })

  },

  listenForEvents() {
    App.contracts.TokenSale.deployed()
    .then(instance => {
      instance.Sell({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch((err, event) => {
        console.log('event triggered', event);
        App.render();
      })
    })
  },

  render() {
    console.log('render');
    $('#loader').show();
    $('#content').hide();

    if(App.loading) {
      return;
    };
    App.loading = true;
    web3.eth.getCoinbase((err, account) => {
      if(err === null) {
        App.account = account;
        $('#accountAddress').html('Your account: ' + App.account);
      }
    });
    App.contracts.TokenSale.deployed().then(instance => {
      tokenSaleInstance = instance;
      return tokenSaleInstance.tokenPrice();
    })
    .then(tokenPrice => {
      App.tokenPrice = tokenPrice;
      $('.token-price').html(web3.utils.fromWei(App.tokenPrice.toString(), 'ether'));
      return tokenSaleInstance.tokensSold();
    })
    .then(tokensSold => {
      App.tokensSold = tokensSold.toNumber();
      $('.tokens-sold').html(App.tokensSold);
      $('.tokens-available').html(App.tokensAvailable);
      const progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
      console.log(progressPercent);
      $('.progress-bar').css('width', progressPercent + '%');

      App.contracts.myToken.deployed()
      .then(instance => {
        const tokenInstance = instance;
        return tokenInstance.balanceOf(App.account);
      })
      .then(balance => {
        $('.token-balance').html(balance.toNumber());
      })
      .then(() => {
        App.loading = false;
        $('#loader').hide();
        $('#content').show();
      })
    })
  },

  buyTokens() {
    console.log('buyTokens');
    $('#loader').show();
    $('#content').hide();

    const numberOfTokens = $('#numberOfTokens').val();
    App.contracts.TokenSale.deployed()
    .then(instance => {
      return instance.buyTokens(numberOfTokens, {
        from: App.account,
        value: numberOfTokens * App.tokenPrice,
        gas: 500000
      })
    })
    .then(result => {
      console.log('tokens bought...');
      $('form').trigger('reset');
    });
  }
}

$(document).ready(App.init());

