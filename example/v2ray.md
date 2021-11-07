## 基于v2ray的完整示例 百分百解锁

- 这里以vultr centos7x64系统为例
- 第一步跟第二步可颠倒

### 校验授权是否正确

- VPS上照搬执行，不需要改

```
curl http://hk1.dnsunlock.com:9527/ip
```

- 正确返回 `IP Whitelist` 错误返回 `IP Blacklist`

### 第一步 关闭防火墙

#### 一般为firewalld跟iptables

  * 自行百度怎么关闭

### 第二步 安装docker

```
yum install -y yum-utils
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli containerd.io -y
systemctl start docker
systemctl enable docker
```

### 第三步

- 启动adguardhome容器

```
docker run -itd --network=host --privileged --restart=always dnsunlock/adguardhome:v2ray /usr/sbin/init
```

- 容器会占用 8080 8443 53 3000 端口，注意不要冲突
- 容器内置HK1规则，管理端口`3000` 账号 `dnsunlock` 密码 `123456789`
- 规则设定 （过滤器-自定义过滤规则）

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
  * 需要修改的模块为`outbounds` `routing`

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
            "tag": "stream-80",
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "AsIs",
                "redirect": "127.0.0.1:8080"
            }
        },
        {
            "tag": "stream-443",
            "protocol": "freedom",
            "settings": {
                "domainStrategy": "AsIs",
                "redirect": "127.0.0.1:8443"
            }
        }
    ],
    "routing": {
        "domainStrategy": "AsIs",
        "rules": [
            {
                "type": "field",
                "port": 80,
                "domain": [
                    "geosite:netflix"
                ],
                "outboundTag": "stream-80"
            },
            {
                "type": "field",
                "port": 443,
                "domain": [
                    "geosite:netflix"
                ],
                "outboundTag": "stream-443"
            }
        ]
    }
}
```

- 特别注意:客户端跟服务端都要設置 sniffing ，不然无法探测到域名

最后重启你的v2ray xray服务端，这时已经解锁成功

其它服务端请使用adguardhome本地解析，自行阅读其官方文档



