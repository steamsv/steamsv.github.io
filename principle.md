## 授权

- 本站所有产品都通过IP授权的方式来鉴权
- 通过产品面板授权你的设备的出网公网IP

## 校验授权是否正确

- VPS上照搬执行，不需要改

```
curl http://hk1.dnsunlock.com:9527/ip
```

- 正确返回 `IP Whitelist` 错误返回 `IP Blacklist`


## SOCKS5

- 可用两种方式接入
  * 直接授权IP后连接，当作SOCKS5使用
  * 通过第三方工具路由至SOCKS5(例如v2ray及xray的出站路由)，具体参考[官方文档](https://www.v2fly.org/)




