const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');
const mongoose = require('../models/connection.js')

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    afterAll( ()=> {
        mongoose.connection.close()
    })


    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });

        //Creation successfull, returns updated object
        it('should return the updated post object', () => {
            // Arrange

            let req = {
                body: {
                    author: 'stswenguser',
                    title: 'My first test post',
                    content: 'Random content'
                },
                params: {
                    _id: '507asdghajsdhjgasd'
                }
            };
            expectedResult = req.body;

            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedResult);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        });

        it('should return 404 for non-existing post object', () => {
            // Arrange

            let req = {
                body: {
                    author: 'stswenguser',
                    title: 'My first test post',
                    content: 'Random content'
                },
                params: {
                    _id: '507asdghajsdhjgasd'
                }
            };
            expectedResult = req.body;

            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, null);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.body);
            sinon.assert.calledWith(res.status, (404));
            sinon.assert.calledOnce(res.status(404).end);
        });
        
        it('should return 500 for server error', () => {
            // Arrange

            let req = {
                body: {
                    author: 'stswenguser',
                    title: 'My first test post',
                    content: 'Random content'
                },
                params: {
                    _id: '507asdghajsdhjgasd'
                }
            };
            expectedResult = req.body;

            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(error);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.body);
            sinon.assert.calledWith(res.status, (500));
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('findPost', () => {
        
        let req = {
            body: {
                author: 'stswenguser',
                title: 'My first test post',
                content: 'Random content'
            },
            params: {
                _id: '507asdghajsdhjgasd'
            }
        };
        
        var findPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            findPostStub.restore();
        });
        
        it('should return the found post', () => {

            //Arrange
            expectedResult = req.body;

            findPostStub = sinon.stub(PostModel, 'findPost').yields(null, expectedResult);

            //Act
            PostController.findPost(req, res);

            //Assert
            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        })

        it('should return 404 for non existent object', () => {
            //Arrange
            expectedResult = req.body;

            findPostStub = sinon.stub(PostModel, 'findPost').yields(null, null);

            //Act
            PostController.findPost(req, res);

            //Assert
            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(res.status, (404));
            sinon.assert.calledOnce(res.status(404).end);
        })

        it('should return 500 for server error', () => {
            //Arrange
            expectedResult = req.body;

            findPostStub = sinon.stub(PostModel, 'findPost').yields(error);

            //Act
            PostController.findPost(req, res);

            //Assert
            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(res.status, (500));
            sinon.assert.calledOnce(res.status(500).end);
        })
 
 
    })
});