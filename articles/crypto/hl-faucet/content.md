## 注意

お行儀の悪いことをやっています。

## 動機　

Hyperliquidは何か新しい試みをする際に、まず先行してしれっとテストネットに出す傾向があるみたいなので、テストネットのUSDC 1万ドルくらいかき集めておくと将来遊ぶ時に便利そう。

HyperliquidのテストネットでUSDCの蛇口を、と書いているが厳密にはArbitrum SepoliaにHyperliquidが用意しているUSDC2の蛇口。

## まずはArbitrum Sepoliaにgas代を集める

SepoliaでETHを用意して、それをbridgeしてくるのが早そう。  
0.1ETHもあれば2時間弱は稼働できる。

SepoliaでETHを用意する時は **Sepolia PoW Faucet** にお世話になります。

https://sepolia-faucet.pk910.de

bridgeはarbitrum公式のものを使う。

https://bridge.arbitrum.io/?destinationChain=arbitrum-sepolia&sourceChain=sepolia

Testnet mode ON にしたら選択肢にSepoliaが出てきた。  
これでETHをSepoliaからArbitrum Sepoliaにブリッジ。

bridgeにはおおよそ10分ほどかかるとのこと。

![bridge](https://assets.buysake.me/Screenshot%20from%202024-04-27%2004-16-52.png)

## 蛇口をひねりまくれ

1アドレスで連打してるだけだと、2時間に1回(？)しか回せない制限があるということで、

先程ETHを用意したアドレスを親アドレスとし、  
① アドレスを生成  
② そのアドレスに親アドレスからgas代として微量のETHを供給  
③ USDCの蛇口をひねる  
④ 得たUSDCを親アドレスに送る

という作戦で行く。

突貫でエイッとコードを書いてGitHubに置いておいた。  
Node.js v21.5.0で動作確認済。

https://github.com/buysake/hl_faucet_junkie

README記載の通り、外から親アドレスの `PRIVATE_KEY` を渡してあげる必要がある。

②でgas代を供給する時、0.000075ETH渡すようにしてあり、これはコード内に `ALLOCATE_ETH_AMOUNT` で定義されています。  
正直もっと少なくて良いし、欲を言えばgasを見積もる処理をちゃんと書くべき。

![run](https://assets.buysake.me/Screenshot%20from%202024-04-27%2012-00-12.png)

やったね✌

もちろん並列化するともっと早いけど、そもそも今のものですらあんまりお行儀の良いコードではないし、ここで紹介するのは直列verだけにしておきます....
