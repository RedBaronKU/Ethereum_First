// deploy code will go here
const HDWalletProvider=require("@truffle/hdwallet-provider");
const Web3=require('Web3');
const{interface,bytecode}=require("./compile");

const provider= new HDWalletProvider(
    'universe volcano kiss element tomorrow trade skate list duck april brown coyote',
    'https://rinkeby.infura.io/v3/b65fdf062ff641d98be453b880fe6a1f'
);

const web3=new Web3(provider);

const deploy= async () => {
    const accounts=await web3.eth.getAccounts();
    console.log("Attempting to deply from account : "+accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:['Hi There']})
    .send({gas:'1000000', from: accounts[0]})
    console.log(result.options.address);
    provider.engine.stop();
}
deploy();