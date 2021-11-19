## 授权

- 本站所有产品都通过IP授权的方式来鉴权
- 通过产品面板授权你的设备的出网公网IP

## 校验授权是否正确

- VPS上照搬执行，不需要改

```
curl http://hk1.dnsunlock.com:9527/ip
```

- 正确返回 `IP Whitelist` 错误返回 `IP Blacklist`

## Sniproxy服务

### 使用DNS来修改解析IP

通过DNS来重定向原来的解析结果

例如：通过公共DNS `8.8.8.8` 对域 `netflix.com` 及其子域进行解析，正常返回解析IP `52.3.144.142` ，这个IP是netflix使用的CDN IP其中之一，通过劫持DNS请求来返回指定的解析IP `66.66.66.66` ，且保持唯一返回。

### Stream IP是什么？

Stream ip相当于netflix的CDN IP，但公共的DNS不会返回这个IP，这就需要通过劫持DNS请求来实现，返回指定的Stream ip。

- 目前使用80 443 标准端口，如有其它端口，请使用socks5接入

### 如何劫持？

通过自建DNS的方式劫持请求，例如dnsmasq，adguardhome，hosts等等；或直接把请求发送至产品面板提供的DNS。

## SOCKS5服务

- 可直接授权IP后连接
- 可通过第三方工具路由至SOCKS5(例如v2ray及xray的出站路由)，具体参考官方文档




