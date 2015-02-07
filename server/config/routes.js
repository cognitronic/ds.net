/**
 * Created by Danny Schreiber on 1/11/2015.
 */
var post = require('../controllers/post')
//var auth = require('../controllers/auth');
var index = require('../controllers/index');
var express = require('express');

module.exports = function(app){

    var _router = express.Router();

    _router.use(function(req, res, next){
       console.log(req.method, req.url);

        next();
    });

    _router.get('/', function(req, res){
        res.json({message: 'There is nothing here to see'});
    });



    /**
     * Auth Routes
     */
    //_router.route('/login')
    //    .post(auth.authenticate);


    /**
     * Post Routes
     */
    _router.route('/posts')
        .get(post.getPosts);

	//_router.route('/posts')
	//	.post(post.postPost);

	_router.route('/post/:title')
		.get(post.getPost);

	//_router.route('/post/:title')
	//	.put(post.putPost);


    // catch 404 and forwarding to error handler
    _router.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /// error handlers

    // development error handler
    // will print stacktrace
    if (_router.get('env') === 'development') {
        _router.use(function(err, req, res, next) {
            res.send('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    _router.use(function(err, req, res, next) {
        res.send('error', {
            message: err.message,
            error: {}
        });
    });

    //applys the above routes to the app
    app.use('/api', _router);
    //gets all of the public routes and passes them to Angular
    app.get('*', index.index);
};



