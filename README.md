Chelsea
-------

P2P Web Proxy 用 WebRTC シグナリングサーバー

## 開発環境

- JavaScript
- Node.js (v0.10.x)
- Sails.js (v0.11.x)

## 実行

```
$ npm install
$ npm start
```

## API
### ピア情報の取得

> GET /peers?path=[file path]

### ピア情報の追加

> POST /peers?path=[file path]&peerId=[peer id]

### ピア情報の削除

> DELETE /peers?path=[file path]&peerId=[peer id]

## ライセンス
MIT License<br />
Copyright (c) 2014 Pine Mizune