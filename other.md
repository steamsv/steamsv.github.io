## 此方案适合所有使用DNS得设备及软件

## 授权

- 通过产品面板授权你的设备的出网公网IP

## 校验授权是否正确

- VPS上照搬执行，不需要改

```
curl http://hk1.dnsunlock.com:9527/ip
```

- 正确返回 `IP Whitelist` 错误返回 `IP Blacklist`

## linux如何应用DNS

  - 大部分发行版本DNS配置文件，位于 `/etc/resolv.conf` ，修改其中的类似于 `nameserver 8.8.8.8` ,且只保留一个即可应用成功。
  - 我们也可使用adguardhome来高效的分流解锁

## 检测netflix是否解锁

  - ssh里面执行：

```
wget https://github.com/sjlleo/netflix-verify/releases/download/2.61/nf_2.61_linux_amd64 && chmod +x nf_2.61_linux_amd64 && ./nf_2.61_linux_amd64
```

  - 将显示类似于以下：

  * 需要测试其它流媒体请自行搜索其它脚本

```
** NetFlix 解锁检测小工具 v2.61 By @sjlleo&Goodryb **
模式：简洁信息模式
[IPv4测试]
您的出口IP完整解锁Netflix，支持非自制剧的观看
原生IP地域解锁信息：台湾区(TW) NetFlix 原生IP
```

这时重启你的代理服务端，并打开netflix观看是否解锁。

## 修改系统DNS解锁失败

> 特别注意:一般情况下，软件的DNS设定优先于系统DNS，除非你全局拦截，不然你无法通过系统DNS来百分百控制软件的DNS，软件的DNS设定请参考你所使用的软件官方文档。

## 以v2ray及xray为例

  - 这里简称两者为A

### A的DNS应用方式总体分三种

  - A使用系统DNS
  - A使用内置DNS
  - A使用客户端DNS

前两者不再重复，官方文档有说，这里特别说下第三个即“A使用客户端DNS”

  - 当代理客户端全局模式时，发起DNS请求（向DNS 8.8.8.8 发起解析baidu.com），该请求将被透明代理到代理服务端，服务端会直接向`8.8.8.8`发起解析`baidu.com`的DNS请求，而不使用系统DNS跟内置DNS，目前大部分客户端都会出现这个情况，可以使用iptables（iptables也可配合adguardhome来进行高效解析）来避免这种情况发生，注意不可劫持tcp方式的DNS解析。

