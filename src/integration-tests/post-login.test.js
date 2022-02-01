const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const { getConnection } = require('./doubleConnection');

const { expect } = chai;
chai.use(chaiHttp);
const loginURI = '/login';

const registeredUser = {    
    email: 'name@email.com',
    password: '123456'
};

const invalidEmail = 'name@email.com';

describe('POST /login', () => {
    let connectionMock;
    before(async() => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });
    after(async() => {
        await MongoClient.connect.restore();
    });
    describe('When "email" or "password" is invalid', () => {
        let response;
        before(async() => {
            response = await chai.request(server)
            .post(loginURI)
            .send({email:"", password:""});
        });
        it('Returns status "401"', () => {
            expect(response).to.have.status(401)
        });
        it('Response is an object', () => {
            expect(response.body).to.be.an('object');
        });
        it('Object has the property "message"', () => {
            expect(response.body).to.have.property('message');
        });
        it('Message is "All fields must be filled"', () => {
            expect(response.body.message).to.be.equal('All fields must be filled');
        });
    });
    describe('When "email" is incorrect or was not registered', () => {
        let response;
        before(async() => {   
            response = await chai.request(server)
            .post(loginURI)
            .send({email: invalidEmail, password:123456});            
        });        
       
        it('Returns status "401"', () => {
            expect(response).to.have.status(401);
        });
        it('Response is an object', () => {
            expect(response.body).to.be.an('object');
        });
        it('Object has the property "message"', () => {
            expect(response.body).to.have.property('message');
        });
        it('Message is "Incorrect name or password"', async() => {
            expect(response.body.message).to.be.equal('Incorrect name or password');
        });
    });
    describe('When login is successful', () => {
        let response;
        before(async() => {
            response = await chai.request(server)
            .post(loginURI)
            .send(registeredUser)
        });
        it('Returns status "200"', () => {
            expect(response).to.have.status(200);
        });
    })
});