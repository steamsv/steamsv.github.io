## 授权

- 本站所有产品都通过IP授权的方式来鉴权
- 通过产品面板授权你的设备的出网公网IP


## 查看要授权的IP

访问
```
http://hk1.dnsunlock.com:9527/clientip
```

- 会返回要授权的IP

## 校验授权是否正确

- VPS上照搬执行，不需要改
```
curl http://hk1.dnsunlock.com:9527/ip
```

- 正确返回 `IP Whitelist` 错误返回 `IP Blacklist`


## 安装v2ray及xray代理服务端

- 这里以xray为例
- 安装
```
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
```

- 安装后相关配置路径
```
/etc/systemd/system/xray.service
/etc/systemd/system/xra
/usr/local/bin/xray
/usr/local/etc/xray/config.json
/usr/local/share/xray/geoip.dat
/usr/local/share/xray/g
/var/log/xray/access.log
/var/log/xray/error.log
```

- 更新`geoip.dat` 和 `geosite.dat`
```
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install-geodata
```

- 安装完毕后，`config.json`为`{}`，需要自己写配置，也可使用其它人写的，自行判断
- 控制命令
```
systemctl start xray
systemctl stop xray
systemctl enable xray
systemctl disable xray
```

## 配置示例

- 以下可直接复制使用
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

如需其它协议，参考[基于官方模版修改后示例](xray.md)



