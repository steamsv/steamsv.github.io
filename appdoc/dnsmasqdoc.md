### dnsmasq安装及使用方法

#### 安装



```
yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum install bind-utils
yum install -y dnsmasq
```

#### 主配置文件

位于 `/etc/dnsmasq.d ` 目录下，以 `.conf ` 结尾

配置示例

```
server=8.8.8.8  //可多行 主DNS
server=/baidu.com/1.1.1.1  //域名 `baidu.com` 及其子域名都由 `1.1.1.1` 来解析
```

#### 控制命令

```
systemctl start dnsmasq  //启动
systemctl restart dnsmasq  //重启
systemctl status dnsmasq  //查看状态
systemctl enable dnsmasq  //开机启动
systemctl disable dnsmasq  //开机禁用
```




