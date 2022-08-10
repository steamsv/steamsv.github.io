## 示例

- 注意`geosite.dat`要保持最新。
- 部分`*.dnsunlock.com`是动态IP，可能不支持热更新，可自行设置定时重载配置。
- 以下示例均可直接使用
- 更多协议示例参考[github](https://github.com/steamsv/XTLS-Xray-examples)
  * 需要重点关注的是`outbounds`跟`routing`，注意`inbound`要开启`sniffing`才能识别域名

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
        "access": "/var/log/xray/access.log",
        "error": "/var/log/xray/error.log",
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
            "protocol": "shadowsocks",
            "settings": {
                "servers": [
                    {
                        "address": "127.0.0.1",
                        "port": 1234,
                        "method": "aes-256-gcm",
                        "password": "123456789",
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
        "access": "/var/log/xray/access.log",
        "error": "/var/log/xray/error.log",
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
            "protocol": "shadowsocks",
            "settings": {
                "servers": [
                    {
                        "address": "127.0.0.1",
                        "port": 1234,
                        "method": "aes-256-gcm",
                        "password": "123456789",
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
        "access": "/var/log/xray/access.log",
        "error": "/var/log/xray/error.log",
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
            "protocol": "shadowsocks",
            "settings": {
                "servers": [
                    {
                        "address": "127.0.0.1",
                        "port": 1234,
                        "method": "aes-256-gcm",
                        "password": "123456789",
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

### X-UI 示例

```
{
    "api": {
        "services": [
            "HandlerService",
            "LoggerService",
            "StatsService"
        ],
        "tag": "api"
    },
    "inbounds": [
        {
            "listen": "127.0.0.1",
            "port": 62789,
            "protocol": "dokodemo-door",
            "settings": {
                "address": "127.0.0.1"
            },
            "tag": "api"
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "settings": {}
        },
        {
            "protocol": "blackhole",
            "settings": {},
            "tag": "blocked"
        },
        {
            "tag": "stream",
            "sendThrough": "0.0.0.0",
            "protocol": "shadowsocks",
            "settings": {
                "servers": [
                    {
                        "address": "127.0.0.1",
                        "port": 1234,
                        "method": "aes-256-gcm",
                        "password": "123456789",
                    }
                ]
            }
        }
    ],
    "policy": {
        "system": {
            "statsInboundDownlink": true,
            "statsInboundUplink": true
        }
    },
    "routing": {
        "rules": [
            {
                "inboundTag": [
                    "api"
                ],
                "outboundTag": "api",
                "type": "field"
            },
            {
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "blocked",
                "type": "field"
            },
            {
                "outboundTag": "blocked",
                "protocol": [
                    "bittorrent"
                ],
                "type": "field"
            },
            {
                "type": "field",
                "domains": [
                    "geosite:netflix"
                ],
                "outboundTag": "stream"
            }
        ]
    },
    "stats": {}
}
```