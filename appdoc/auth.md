## 授权模块


### 第一步 安装iptables并启动设置开机自启

```
yum install iptables-services -y  #安装iptables
systemctl start iptables  #启动
systemctl enable iptables  #开机启动
```



### 第二步 安装ipset

```
yum install -y ipset
service iptables save 
```

### 第三步 创建ipset合集

```
ipset create -exist whitev4 hash:net family inet hashsize 1024 maxelem 1000000 timeout 0
```

### 第四步 端口白名单规则

```
iptables -I INPUT -m set --match-set whitev4 src -p tcp --destination-port 80 -j ACCEPT
iptables -I INPUT -m set --match-set whitev4 src -p tcp --destination-port 443 -j ACCEPT
iptables -I INPUT -m set --match-set whitev4 src -p tcp --destination-port 8443 -j ACCEPT
```

### 其它示例

手动添加ip
```
ipset -exist add whitev4 255.255.255.255 timeout 120
```

### 第五步 拉取授权程序