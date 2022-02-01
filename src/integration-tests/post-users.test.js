const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const { getConnection } = require('./doubleConnection');

const { expect } = chai;
chai.use(chaiHttp);
const usersURI = '/users';
const registeredUser = {
    name: 'Name Lastname',
    email: 'name@email.com',
    password: '123456'
};

describe('POST /users', () => {
    let connectionMock;
    before(async() => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(async() => {
        await MongoClient.connect.restore();
    });

    describe('When user does not receive "name", "email" and "password"', () => {
        let response;
        before(async () => {
            response = await chai.request(server)
            .post(usersURI)
            .send({name:"", email:"", password:""});
        });
        it('Returns status "400"', () => {
            expect(response).to.have.status(400);
        });
        it('Response is an object' , () => {
            expect(response.body).to.be.an('object');
        });
        it('Object has property "message"', () => {
            expect(response.body).to.have.property('message');
        });
        it('Message is: "Invalid entries. Try again"', () => {
            expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
    });

    describe('When email is already registered', () => {
        let response;
        before(async () => {
            await connectionMock.db('Cookmaster')
            .collection('users').insertOne({...registeredUser, role:'user'});

            response = await chai.request(server)
            .post(usersURI)
            .send(registeredUser);
        });
        after(async () => {
            await connectionMock.db('Cookmaster')
            .collection('users')
            .drop();
        });
        it('Returns status "409', () => {
            expect(response).to.have.status(409);
        });
        it('Response is an object' , () => {
            expect(response.body).to.be.an('object');
        });
        it('Object has property "message"', () => {
            expect(response.body).to.have.property('message');
        });
        it('Message is: "Email already registered"', () => {
            expect(response.body.message).to.be.equal('Email already registered');
        });
    });
    describe('When user is registered with success', () => {
        let response;
        before(async () => {
            response = await chai.request(server)
            .post(usersURI)
            .send(registeredUser);
        });
        it('Returns status 201', () => {
            expect(response).to.have.status(201);
        });
        it('Response is an object' , () => {
            expect(response.body).to.be.an('object');
        });
        it('Object has property "user"', () => {
            expect(response.body).to.have.property('user')
        });
        it('Key user receives registered user', async() => {
            const { _id } = await connectionMock.db('Cookmaster')
            .collection('users')
            .findOne({email: registeredUser.email});
            const { name, email } = registeredUser;

            const foundUser = {
                name,
                email,
                role:'user',
                _id: _id.toString(),
            };
            expect(response.body.user).to.be.deep.equal(foundUser);
        });
    })   
});
