var express = require('express'),
  expressSession = require('express-session'),
  https = require('https'),
  http = require('http'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  fs = require('fs'), 
  passport = require('passport'),
  mongoose = require('mongoose'),
  api_v1 = require('./routes/api_v1'),
  register = require('./routes/register'),
  dashboard = require('./routes/dashboard'),
  login = require('./routes/login'),
  User = require("./models/user").User,
  redis = require('redis');

var app = express();
var redisClient = redis.createClient();

mongoose.connect('mongodb://localhost');

app.use(function(req, res, next) {
  if(!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'urlt_api_serve_ha_ha_ha',
                        saveUninitialized: true,
                        resave: true }));

/*Use passport for registraion site*/
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', api_v1);
app.use('/register',register);
app.use('/dashboard',dashboard);
app.use('/login',login);

app.get('/loggedin',function(req,res){
  res.send({loggedin:req.isAuthenticated()});
});

app.get('/logout', function(req, res) {
  req.logout();
  res.end();
});

app.get('/state',function(req,res){
  if(req.isAuthenticated()){
    redisClient.get(req.user._id.toString()+'_state',function(err,state){
      if(err){
        res.status(500);
        res.end();
        return;
      }
      res.send({fsm_state:state});
      res.end();
    });
  }else{
    res.status(404).end();
  }

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Passport user serialize deserialzie section
passport.serializeUser(function(user, done) { //from user return email object
  done(null, user.email);
});

passport.deserializeUser(function(email, done) { //from email return user object
  User.findByEmail(email, function(error, user) {
    done(error, user);
  });
});

var options = {
  key: fs.readFileSync('./cert/server.key', 'utf8'),
  cert: fs.readFileSync('./cert/server.crt', 'utf8')
};

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

module.exports = app;
