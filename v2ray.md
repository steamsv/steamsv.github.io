


## 开始

- 注意：`"address": "hk1.dnsunlock.com",` DDNS可能不支持热更新，可定时重启
- 服务端需要最新版本，`rules`用到的规则需最新版本，不然部分需要路由的没有路由过去
- 使用分流时`inbounds`需要开启`sniffing`
- 需要修改的模块为`outbounds` `routing`
- 官方文档 [点击此按钮查看：官方文档](https://www.v2fly.org/)
  
## 示例

### 只路由netflix

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
    "outbounds": [
        {
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
                "domains": [
                    "geosite:netflix"
                ],
                "outboundTag": "stream"
            }
        ]
    }
}
```

### 只路由disney

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
    "outbounds": [
        {
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
                "domains": [
                    "geosite:disney"
                ],
                "outboundTag": "stream"
            }
        ]
    }
}
```

### 同时路由netflix和disney

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
    "outbounds": [
        {
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
                "domains": [
                    "geosite:netflix",
                    "geosite:disney"
                ],
                "outboundTag": "stream"
            }
        ]
    }
}
```