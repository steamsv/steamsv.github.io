
# DNS解锁原理介绍

### DNS作用

通过DNS来重定向原来的解析结果

例如：通过公共DNS对域 `netflix.com` 及其子域进行解析，正常返回解析IP `52.3.144.142` ，这个IP是netflix使用的CDN IP其中之一，通过劫持DNS请求来返回指定的解析IP `66.66.66.66` 。

### Sniproxy IP

sniproxy ip相当于netflix的CDN IP，但公共的DNS不会返回这个IP，这就需要通过劫持DNS请求来实现，返回指定的sniproxy ip。

### 如何劫持？

通过自建DNS的方式劫持请求，例如dnsmasq，adguardhome，hosts等等



