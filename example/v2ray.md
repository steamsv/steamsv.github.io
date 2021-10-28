## 基于v2ray的完整示例 百分百解锁

- 这里以vultr centos7x64系统为例

  * adguard home
  * iptables

### 第一步 环境部署

#### 安装adguard home跟iptables并设定

  * [Adguard Home教程](/appdoc/adguardhomedoc.md)
  * [iptables教程](appdoc/iptablesdoc.md)

确定规则设定完成


### 第二步 装v2ray

- 自行用你知道的方式安装

#### 检查代理服务端配置
 
- 很多人难到这，不理解“代理服务端““代理客户端”是什么意思 

#### 服务端及客户端是什么？

  * 在VPS上安装v2ray，并在v2rayNG或软路由上使用；那么在VPS上面的v2ray就是服务端，而v2rayNG跟软路由就是客户端
  * 其它软件一样的理解

#### 代理服务端配置文件是什么？

  * 就是在VPS上面的v2ray的配置文件，所在位置根据不同的安装方式有所不同，注意观看官方文档


### 代理服务端配置文件怎么检查？

- 例如 下面是一个v2ray 配置文件

```
{
    "dns": {
        "servers": [
            "https://dns-unfiltered.adguard.com/dns-query",
            "1.1.1.1",
            "8.8.8.8",
            "localhost"
        ]
    },
    "inbounds": [
        {
            "port": 64622,
            "tag": "vmess-in",
            "protocol": "vmess",
            "settings": {
                "clients": [
                    {
                        "id": "a9ebb97c-0201-553d-c78d-c699bc10c91b",
                        "alterId": 64
                    }
                ]
            },
            "streamSettings": {
                "network": "ws",
                "security": "none",
                "tlsSettings": {
                    "serverName": "",
                    "allowInsecure": true
                },
                "tcpSettings": {
                    "header": {
                        "type": "none"
                    }
                },
                "kcpSettings": {
                    "header": {
                        "type": "none"
                    },
                    "mtu": 1350,
                    "congestion": false,
                    "tti": 20,
                    "uplinkCapacity": 5,
                    "writeBufferSize": 1,
                    "readBufferSize": 1,
                    "downlinkCapacity": 20
                },
                "wsSettings": {
                    "path": "\/v2ray\/",
                    "connectionReuse": true
                },
                "httpSettings": {
                    "path": "\/v2ray\/",
                    "host": []
                }
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "UseIP"
            },
            "tag": "direct"
        },
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
        "domainStrategy": "AsIs",
        "rules": [
            {
                "type": "field",
                "inboundTag": [
                    "vmess-in"
                ],
                "outboundTag": "direct"
            },
            {
                "type": "field",
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "blocked"
            }
        ]
    }
}
```

- 修改一下
  * 删除了第四行的 "https://dns-unfiltered.adguard.com/dns-query"
  * 仔细思考下为什么删除它

```
{
    "dns": {
        "servers": [
            "1.1.1.1",
            "8.8.8.8",
            "localhost"
        ]
    },
    "inbounds": [
        {
            "port": 64622,
            "tag": "vmess-in",
            "protocol": "vmess",
            "settings": {
                "clients": [
                    {
                        "id": "a9ebb97c-0201-553d-c78d-c699bc10c91b",
                        "alterId": 64
                    }
                ]
            },
            "streamSettings": {
                "network": "ws",
                "security": "none",
                "tlsSettings": {
                    "serverName": "",
                    "allowInsecure": true
                },
                "tcpSettings": {
                    "header": {
                        "type": "none"
                    }
                },
                "kcpSettings": {
                    "header": {
                        "type": "none"
                    },
                    "mtu": 1350,
                    "congestion": false,
                    "tti": 20,
                    "uplinkCapacity": 5,
                    "writeBufferSize": 1,
                    "readBufferSize": 1,
                    "downlinkCapacity": 20
                },
                "wsSettings": {
                    "path": "\/v2ray\/",
                    "connectionReuse": true
                },
                "httpSettings": {
                    "path": "\/v2ray\/",
                    "host": []
                }
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "AsIs"
            },
            "tag": "direct"
        },
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
        "domainStrategy": "AsIs",
        "rules": [
            {
                "type": "field",
                "inboundTag": [
                    "vmess-in"
                ],
                "outboundTag": "direct"
            },
            {
                "type": "field",
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "blocked"
            }
        ]
    }
}
```

最后重启你的v2ray服务端，这时已经解锁成功

其它服务端大同小异，自行阅读其官方文档



