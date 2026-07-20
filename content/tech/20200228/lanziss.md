---
title: "Lanziss"
cover:
    image: "imgs/pix/shari.png"
    relative: false
    hiddenInSingle: true
date: 2020-02-25
categories: ["科技"]
tags: ["游戏引擎", "发布"]
draft: false
---

（[元发布页](https://rpg.blue/thread-480426-1-1.html)）

众所周知~我们的RMVA~RGSS3提供的runtime是有一些bug，而且在现代显卡之下性能不佳的。
我们英明神武的黄鸡哥哥和⑨姐姐已经以DirectX制作了RGD来解决硬件加速的问题——

那么，作为凑热闹心态而言，我用Opengl+SDL+mruby实现了另一个全新的兼容RGSS3的游戏引擎。
目标是在兼容RGSS3大部分内容的情况下，尝试跨平台、并且加入更多的功能来增强其适用范围。
由于脚本层是采用mruby实现的，因此它必然和cruby有很多不兼容的地方，已发现的不兼容和注意事项我已经在示例工程中注明。

【用 Lanziss 完成的 Nswitch 端移植作品已经登陆 EShop ! [发布帖](https://rpg.blue/forum.php?mod=viewthread&tid=488723)】

[移植到Nswitch、Android端的演示录像](https://www.bilibili.com/video/BV1ni4y1t7nK/)

## 支持

目前已经不再提供示例工程下载，如需商业支持请看主页联系方式
