## 基于v2ray的完整示例 百分百解锁

- 这里以vultr centos7x64系统为例

### 校验授权是否正确

- VPS上照搬执行，不需要改

```
curl http://hk1.dnsunlock.com:9527/ip
```

- 正确返回 `IP Whitelist` 错误返回 `IP Blacklist`

### 第一步 关闭防火墙

#### 一般为firewalld跟iptables

  * 自行百度怎么关闭

### 第二步 开放安全组

- 无则无视 有则开

### 第三步 安装代理服务端

- 自行用你自己了解的方式安装
- 记住配置路径

### 第四步 修改代理服务端：v2ray/xray 配置文件
 
- 很多人难到这，不理解“代理服务端““代理客户端”是什么意思 

#### 服务端及客户端是什么？

  * 在VPS上安装v2ray，并在v2rayNG或软路由上使用；那么在VPS上面的v2ray就是服务端，而v2rayNG跟软路由就是客户端
  * 其它软件一样的理解

#### 代理服务端配置文件是什么？

  * 就是在VPS上面的v2ray的配置文件，所在位置根据不同的安装方式有所不同，注意观看官方文档


### 代理服务端配置文件修改示例

- 例如 下面是一个v2ray 配置文件

```
{
    "inbound": {
        "allocate": {
            "strategy": "always"
        },
        "listen": "0.0.0.0",
        "port": 8090,
        "protocol": "vmess",
        "settings": {
            "clients": [
                {
                    "id" : "fbb68c3f-2e0b-4185-8263-f58282a64ffa",
                    "alterId" : 0
                }
            ],
            "udp": true
        },
        "sniffing": {
            "destOverride": [
                "http",
                "tls"
            ],
            "enabled": true
        },
        "streamSettings": {
            "network": "ws",
            "security": "auto",
            "wsSettings": {
                "connectionReuse": true,
                "path": "/v2ray/"
            }
        },
        "tag": "proxy"
    },
    "log": {
        "access": "/var/log/v2ray/access.log",
        "error": "/var/log/v2ray/error.log",
        "loglevel": "warning"
    },
    "outbound": {
        "protocol": "freedom",
        "settings": {}
    },
    "outboundDetour": [
        {
            "protocol": "blackhole",
            "settings": {
                "response": {
                    "type": "http"
                }
            },
            "tag": "blocked"
        }
    ],
    "routing": {
        "rules": [
            {
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "blocked",
                "type": "field"
            }
        ]
    }
}
```

- 修改一下
  * 需要修改的模块为`outbound` `routing`，也可直接复制粘贴上去，注意不可重复，这里我们删除了`outboundDetour` 新增了`outbounds`修改了`outbound` `routing`
  * 可查看官方文档灵活应用 [官方文档](https://www.v2fly.org/config/routing.html#routingobject)
  * 注意：`"address": "hk1.dnsunlock.com",` DDNS可能不支持热更新，可定时重启

```
{
    "inbound": {
        "allocate": {
            "strategy": "always"
        },
        "listen": "0.0.0.0",
        "port": 8090,
        "protocol": "vmess",
        "settings": {
            "clients": [
                {
                    "id" : "fbb68c3f-2e0b-4185-8263-f58282a64ffa",
                    "alterId" : 0
                }
            ],
            "udp": true
        },
        "sniffing": {
            "destOverride": [
                "http",
                "tls"
            ],
            "enabled": true
        },
        "streamSettings": {
            "network": "ws",
            "security": "auto",
            "wsSettings": {
                "connectionReuse": true,
                "path": "/v2ray/"
            }
        },
        "tag": "proxy"
    },
    "log": {
        "access": "/var/log/v2ray/access.log",
        "error": "/var/log/v2ray/error.log",
        "loglevel": "warning"
    },
    "outbound": {
        "protocol": "freedom",
        "settings": {}
    },
    "outbounds": [
        {
            "tag": "direct",
            "protocol": "freedom",
            "settings": {}
        },
        {
            "tag": "stream",
            "sendThrough": "0.0.0.0",
            "protocol": "socks",
            "settings": {
                "servers": [
                    {
                        "address": "hk1.dnsunlock.com",
                        "port": 8443,
                        "users": []
                    }
                ]
            }
        }
    ],
    "routing": {
        "domainStrategy": "AsIs",
        "rules": [
            {
                "type": "field",
                "network": "tcp,udp",
                "outboundTag": "stream"
            }
        ]
    }
}
```


- 如你不会修改，请使用[编辑分享JSON](https://www.jsontools.org/)提交你的config.json至v2ray-xray部门工单，记得注明需要解锁的区域，否则会被无视
- `"rules"`仔细参考官方文档，我们这里规则是路由全部流量，你也可以根据自己的情况进行路由

最后重启你的v2ray xray服务端，这时已经解锁成功



