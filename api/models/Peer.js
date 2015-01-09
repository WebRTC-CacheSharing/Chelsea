/**
* Peer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    file: {
      model: 'file',
      required: true
    },
    
    peerId: {
      type: 'string',
      required: true,
      unique: true
    },
    
    toJSON: function () {
      return this.peerId;
    }
  }
};

