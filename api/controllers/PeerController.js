/**
 * PeerController
 *
 * @description :: Server-side logic for managing Peers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * ファイルに属するピアの一覧を取得
   * GET /peers?path={file path}
   */
  find: function (req, res) {
    sails.log.info('API called: GET /peers');
    
    var path = req.param('path');
    sails.log.info('API params: path =', path);
    
    File.findOne({ path: path })
      .populate('peers')
      .exec(function (err, file) {
        if (err) {
          sails.log.error(err);
          return res.json(400, { error: 'Invalid parameter `path`' });
        }
        
        if (!file) {
          return res.ok({
            file: {
              path: path,
              peers: []
            }
          });
        }
        
        res.ok({ file: file });
      });
  },
  
  /**
   * ファイルに属するピアを追加
   * POST /peers?path={file path}&peerId={peer id}
   */
  create: function (req, res) {
    sails.log.info('API called: POST /peers');
    
    var path = req.param('path');
    sails.log.info('API params: path =', path);
    
    var peerId = req.param('peerId');
    sails.log.info('API params: peerId =', peerId);
    
    File.findOrCreate({ path: path }, { path: path })
      .populate('peers')
      .exec(function (err, file) {
        if (err) {
          sails.log.error(err.toString());
          return res.json(400, { error: 'Invalid parameter `path`' });
        }
        
        // 既にピアが登録されている場合の処理
        var hasPeer = _.some(file.peers, function (peer) {
          return peer.peerId === peerId;
        });
        
        if (hasPeer) {
          return res.json({ file: file });
        }
        
        Peer.create({ peerId: peerId, file: file })
          .exec(function (err, peer) {
            if (err) {
              sails.log.error(err.toString());
              return res.json(400, { error: 'Invalid parameter `peerId`' });
            }
            
            file.peers.push(peerId);
            return res.json({ file: file });
          });
      });
  },
  
  /**
   * ファイルに属するピアを削除
   * DELETE /peers?path={file path}&peerId={peer id}
   */
  destroy: function (req,res) {
    sails.log.info('API called: DELETE /peers');
    
    var path = req.param('path');
    sails.log.info('API params: path =', path);
    
    var peerId = req.param('peerId');
    sails.log.info('API params: peerId =', peerId);
    
    File.findOne({ path: path })
      .populate('peers')
      .exec(function (err, file) {
        if (err) {
          sails.log.error(err.toString());
          return res.json(400, { error: 'Invalid parameter `path`' });
        }
        
        if (!file || _.size(file.peers) === 0) {
          return res.json(404, { error: 'Not found' });
        }
        
        // 削除対象のピアを取得
        var destroyPeer = _.find(file.peers, function (p) { return p.peerId === peerId; });
        
        if (!destroyPeer) {
          return res.json(404, { error: 'Not found' });
        }
        
        Peer.destroy(destroyPeer.id, function (err, peers) {
          if (err) {
            sails.log.error(err.toString());
            return res.json(400, { error: 'Invalid parameter `peerId`' });
          }
          
          if (peers.length === 0) {
            return res.json(404, { error: 'Not found' });
          }
          
          // 削除したピアを変数から削除
          file.peers = _.filter(file.peers, function (p) {
            return p.peerId !== peerId;
          });
          
          res.ok({ file: file });
        });
      });
  }
};

