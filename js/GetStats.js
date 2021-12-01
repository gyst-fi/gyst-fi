function getStats() {
    // create a web3 object connected to our NodETH node
    var web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));
    // define the ERC20 standard token ABI to interact with token contracts using
    var erc20Abi = [{
        "constant": false,
        "inputs": [],
        "name": "totalETHDividendsDistributed",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "type": "function"
    },{
        "constant": false,
        "inputs": [],
        "name": "totalBTCDividendsDistributed",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "name": "",
            "type": "uint8"
        }],
        "payable": false,
        "type": "function"
    }];
    var tokenAddress = '0xeca6c5d900e0d932e71cf6d6268f4e47b3909a64';
    var MyContract = new web3.eth.Contract(erc20Abi, tokenAddress);

    $.ajax({
        url: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            MyContract.methods.totalBTCDividendsDistributed().call().then(
                (value) => {
                    let btcAmount = value / 10 ** 18;
                    $('#totalBTCDividends').text(btcAmount.toFixed(10));
                    $('#totalBTCDividendsUSD').text('$'+(result.data.rates.USD * btcAmount.toFixed(10)).toFixed(2));
            });
        }
    });
    $.ajax({
        url: 'https://api.coinbase.com/v2/exchange-rates?currency=ETH',
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            MyContract.methods.totalETHDividendsDistributed().call().then(
                (value) => {
                    let ethAmount = value / 10 ** 18;
                    $('#totalETHDividends').text(ethAmount.toFixed(10));
                    $('#totalETHDividendsUSD').text('$'+(result.data.rates.USD * ethAmount.toFixed(10)).toFixed(2));
            });
        }
    });
}
window.onload = getStats;