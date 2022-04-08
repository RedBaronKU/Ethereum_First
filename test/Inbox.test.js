// contract test code will go here
const assert=require('assert');
const ganache=require('ganache-cli');
const Web3=require('web3');
const web3=new Web3(ganache.provider());
const { interface, bytecode }=require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    accounts=await web3.eth.getAccounts();
    inbox=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data:bytecode,
        arguments:['Hi there!']
    })
    .send({from: accounts[0], gas:'1000000'});

});

describe('Inbox',() => {
    it("deploys a contract", () => {
        console.log(inbox);
    });
});

describe('Inbox',()=>{
    it("Check wallet", () => {
        assert.ok(inbox.options.address);
    })
})

describe('Inbox', () => {
    it("has a default message, if initial defined", async () =>{
        const message=await inbox.methods.message().call();
        console.log(await inbox.methods.message());
        assert.equal(message, 'Hi there!');
    })
})

describe('Inbox', () => {
    it("Change the message", async () =>{
        const newMessage="Hey There!";
        await inbox.methods.setMessage(newMessage).send({from: accounts[0]});
        const message=await inbox.methods.message().call();
        assert.equal(message, newMessage);
    })
})