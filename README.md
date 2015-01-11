Chelsea
-------
[![Build Status](https://travis-ci.org/WebRTC-CacheSharing/Chelsea.svg?branch=master)](https://travis-ci.org/WebRTC-CacheSharing/Chelsea)

WebRTC Cache Sharing System 用 WebRTC シグナリングサーバー

## 開発環境

- JavaScript
- Node.js (v0.10.x)
- Sails.js (v0.11.x)
- MongoDB

## 実行

```
$ npm install
$ npm start
```

## API
[file path] は URL の SHA256 を取り、16進数表記 (大文字) にした物を指定する (= 64 文字固定)。

### ピア情報の取得

> GET /peers?path=[file path]

### ピア情報の追加

> POST /peers?path=[file path]&peerId=[peer id]

### ピア情報の削除

> DELETE /peers?path=[file path]&peerId=[peer id]

## ライセンス
MIT License<br />
Copyright (c) 2014-2015 Pine Mizune