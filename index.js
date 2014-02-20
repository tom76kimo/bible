var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var database = require('./database');
var User = database.User;
var Book = database.Book;
var HasRead = database.HasRead;
var crypto = require('crypto');

/*
new Book({name: '1 Chronicles', cname: '歷代志上', shortName: '1Ch', amount: 29}).save();
new Book({name: '2 Chronicles', cname: '歷代志下', shortName: '2Ch', amount: 36}).save();
new Book({name: 'Ezra', cname: '以斯拉記', shortName: 'Ezr', amount: 10}).save();
new Book({name: 'Nehemiah', cname: '尼希米記', shortName: 'Neh', amount: 13}).save();
new Book({name: 'Esther', cname: '以斯帖記', shortName: 'Est', amount: 10}).save();
new Book({name: 'Job', cname: '約伯記', shortName: 'Job', amount: 42}).save();
new Book({name: 'Psalms', cname: '詩篇', shortName: 'Psm', amount: 150}).save();
new Book({name: 'Proverbs', cname: '箴言', shortName: 'Pro', amount: 31}).save();
new Book({name: 'Ecclesiastes', cname: '傳道書', shortName: 'Ecc', amount: 12}).save();
new Book({name: 'Song of Songs', cname: '雅歌', shortName: 'Son', amount: 8}).save();
*/
//new HasRead({userId: '1', bookId: '1', readChapter: '1,2'}).save();
/*
HasRead.findOne({userId: '1', bookId: '1'}, function(err, hasRead){
	if(err) console.log('failed');
	if(!hasRead)
		console.log('document not found');
});*/

function validPassword(user, password){
	if(user.password !== password)
		return false;
	return true;
}

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username: username}, function(err, user){
			if(err){ return done(err); }
			if(!user){
				console.log('no user');
				return done(null, false, { message: 'Incorrect username' });
			}

			var encodePassword = crypto.createHash('md5').update(password).digest('hex');
			if(!validPassword(encodePassword)){
				console.log('no pass');
				return done(null, false, { message: 'Incorrect password'});
			}
			return done(null, user);
		});
		/*
		if('Tom' === username && '123456' === password){
			return done(null, {name: 'Tom'});
		}
		else
			return done(null, false, '{}');*/
	}
));

var oneDay = 86400000;
app.configure(function(){
	app.use(express.compress());
	app.use('/', express.static(__dirname + '/public', { maxAge: oneDay }));
	app.use('/', express.directory(__dirname + '/public', { maxAge: oneDay }));
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.session({secret: 'Super Tom'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
});



passport.serializeUser(function(user, done) {
	//console.log(user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	//console.log('deSerial?');
	User.findById(id, function(err, user){
		done(err, user);
	});
    //done(null, user);
});


function loadUser(req, res, next){
	if(req.params.userId){
		console.log('user id is: ' + req.params.userId);
		next();
	}
	else
		next();
}

var name = 'Tom';
function checkAdmin(req, res, next){
	next();
}

app.post('/logged', function(req, res){
	if(req.user)
		res.send(200, {status: 1, id: req.user._id});
	else
		res.send(200, {status: 0});
});

app.get('/hasreads', function(req, res){
	HasRead.find({userId: req.user._id}, function(err, hasRead){
		res.send(200, hasRead);
	});
	
});

app.all('*', function(req, res, next){
	console.log('hey');
	next();
});

app.post('/hasread', function(req, res){
	var hasRead = new HasRead(req.body);
	hasRead.save(function(err, model){
		res.send(200, model);
	});
});

app.put('/hasread', function(req, res){
	var data = {
		userId: req.body.userId, 
		bookId: req.body.bookId, 
		readChapter: req.body.readChapter,
		amount: req.body.amount,
		totalAmount: req.body.totalAmount
	};
	HasRead.update({_id: req.body._id}, data, function(err, numberAffected, raw){
		if(err)
			console.log(err);
		res.send(200);
	});
	//res.send(200);
});

app.post('/login', function(req, res, next){

	passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err) }
	    if (!user) {
	      req.session.messages =  [info.message];
	      return res.json({status: 0})
	    }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      return res.json({status: 1, id: user._id});
	    });
	  })(req, res, next);
});

app.post('/signUp', function(req, res, next){
	var username = req.body.username,
		password = req.body.password;

	User.findOne({username: username}, function(err, user){
		if(!user){
			var encodePassword = crypto.createHash('md5').update(password).digest('hex');
			var thisPerson = new User({username: username, password: encodePassword});
			thisPerson.save(function(err, user){
				res.send({status: 1, userId: user._id});
				//console.log('save once');
			});
		}
		else{
			res.send({status: 0, message: 'user has existed'});
		}
	});
});

app.get('/books', function(req, res){
	Book.find({}, function(err, book){
    	res.send(book);
	});
	
});

app.post('/logout', function(req, res){
  req.logOut();
  res.redirect("/");
});

app.get('/fail', function(req, res){
	res.send({message: 'fail'});
});

app.post('/users', function(req, res){
	res.send(200, {id: 45});
});

app.get('/users/:userId', loadUser, function(req, res){
	res.send(req.user);
});

app.put('/users/:userId', loadUser, function(req, res){
	name = req.body.name;
	res.send(200, {name: name});
});

app.get('/users/:userId/admin', [loadUser, checkAdmin], function(req, res){
	res.send('hello world');
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.send({ user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(3000);