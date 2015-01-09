/**
* File.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var SHA256Length = 64;

module.exports = {

  attributes: {
    path: {
      type: 'string',
      required: true,
      minLength: SHA256Length,
      maxLength: SHA256Length
    },
    
    peers: {
      collection: 'peer',
      via: 'file'
    },
    
    toJSON: function () {
      var obj = _.pick(this, 'path', 'peers');
      if (!obj.peers) obj.peers = [];
      
      return obj;
    }
  }
};

