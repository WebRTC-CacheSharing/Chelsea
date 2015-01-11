var _ = require('lodash');
var Sails = require('sails').Sails;
var freeport = require('freeport');
var request = require('request');
var sha256 = require('sha256');
var assert = require('power-assert');

var configs = require('./configs');

_.each(configs, function (config) {
  var env = config.environment;
  var adapter = config.connections[config.models.connection].adapter;
  
  describe(env + ': ' + adapter, function () {
    var PATH = sha256('http://example.com/example.mp4');
    var ID_1 = 'abcdefghijklmno1';
    var ID_2 = 'abcdefghijklmno2';
    
    var sails;
    var baseUrl;
    
    before(function (done) {
      freeport(function (err, port) {
        config.port = port;
        sails = new Sails;
        sails.lift(config, function (err, sailsInstance) {
          sails = sailsInstance;
          done(err);
        });
      });
    });
    
    after(function (done) {
      sails.lower(done);
    });
    
    it('sails lifted', function () {
      assert(sails);
    });
    
    it('sails getBaseUrl()', function () {
      baseUrl = sails.getBaseurl();
      console.log(baseUrl);
      
      assert(baseUrl);
    });
    
    it('GET /peers (length = 0)', function (done) {
      request.get(baseUrl + '/peers?path=' + PATH, function (err, res, body) {
        var data = JSON.parse(body);
        
        assert(res.statusCode === 200);
        
        assert(data.file);
        assert(data.file.path === PATH);
        assert(_.isArray(data.file.peers));
        assert(data.file.peers.length === 0);
        
        done(err);
      });
    });
    
    it('POST /peers (length = 1; id = 1)', function (done) {
      request.post(baseUrl + '/peers?path=' + PATH + '&peerId=' + ID_1, function (err, res, body) {
        var data = JSON.parse(body);
        
        assert(res.statusCode === 200);
        
        assert(data.file);
        assert(data.file.path === PATH);
        assert(data.file.peers.length === 1);
        assert(_.contains(data.file.peers, ID_1));
        
        done(err);
      });
    });
    
    it('POST /peers (length = 1; id = 1)', function (done) {
      request.post(baseUrl + '/peers?path=' + PATH + '&peerId=' + ID_1, function (err, res, body) {
        var data = JSON.parse(body);
        
        assert(res.statusCode === 200);
        
        assert(data.file.peers.length === 1);
        assert(_.contains(data.file.peers, ID_1));
        
        done(err);
      });
    });
    
    it('POST /peers (length = 1; id = 2)', function (done) {
      request.post(baseUrl + '/peers?path=' + PATH + '&peerId=' + ID_2, function (err, res, body) {
        var data = JSON.parse(body);
        
        assert(res.statusCode === 200);
        
        assert(data.file.peers.length === 2);
        assert(_.contains(data.file.peers, ID_1));
        assert(_.contains(data.file.peers, ID_2));
        
        done(err);
      });
    });
    
    it('DELETE /peers (length = 2; id = 1)', function (done) {
      request.del(baseUrl + '/peers?path=' + PATH + '&peerId=' + ID_1, function (err, res, body) {
        var data = JSON.parse(body);
        
        assert(res.statusCode === 200);
        
        assert(data.file.peers.length === 1);
        assert(!_.contains(data.file.peers, ID_1));
        assert(_.contains(data.file.peers, ID_2));
        
        done(err);
      });
    });
    
    it('DELETE /peers (length = 2; id = 2)', function (done) {
      request.del(baseUrl + '/peers?path=' + PATH + '&peerId=' + ID_2, function (err, res, body) {
        var data = JSON.parse(body);
        
        assert(res.statusCode === 200);
        
        assert(data.file.peers.length === 0);
        
        done(err);
      });
    });
    
    it('DELETE /peers (length = 2; id = 2)', function (done) {
      request.del(baseUrl + '/peers?path=' + PATH + '&peerId=' + ID_2, function (err, res, body) {
        var data = JSON.parse(body);
        
        assert(res.statusCode === 404);
        
        done(err);
      });
    });
  });
});