var Mongoose = require('mongoose');
var Hash = require('password-hash');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String,index:true },
  password: { type: String, set: function(newValue) {
    return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
  } },
  client_secret: { type: String },
  first_name : { type: String},
  last_name : { type: String},
  account_creation_date: { type: Date},
  profile_created: {type:Boolean,default:false}
});

UserSchema.statics.local_authenticate = function(email, password, callback) {
  this.findOne({ email: email }, function(error, user) {
    if (user && Hash.verify(password, user.password)) {
      callback(null, user);
    } else if (user || !error) {
      // Email or password was invalid (no MongoDB error)
      callback(null, false);
    } else {
      // Something bad happened with MongoDB. You shouldn't run into this often.
      callback(error, null);
    }
  });
};


UserSchema.statics.authByClientIdSecret = function(client_id, client_secret, callback) {
  if (!client_id.match(/^[0-9a-fA-F]{24}$/)) {
    callback(null,false);
    return;
  }

  this.findOne({ _id : Mongoose.Types.ObjectId(client_id) ,client_secret:client_secret}, function(error, user) {
    if (user) {
      callback(null, user);
    } else if (user || !error) {
      // Email or password was invalid (no MongoDB error)
      callback(null,false);
    } else {
      // Something bad happened with MongoDB. You shouldn't run into this often.
      callback(error, null);
    }
  });
}

UserSchema.statics.findByEmail = function(email,callback) {
  this.findOne({email:email}, function(error,user){
    if (user) {
      callback(null,user,false);
    }
    else {
      callback(new Error('User not found'),null,true);
    }
  });
};

var User = Mongoose.model('User', UserSchema);

module.exports = {
  User : User
}