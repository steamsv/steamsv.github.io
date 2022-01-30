## 授权模块


### 第一步 安装iptables并启动设置开机自启

```
yum install iptables-services -y  #安装iptables
systemctl start iptables  #启动
systemctl enable iptables  #开机启动
```



### 第二步 安装ipset并设置开机自启

```
yum install ipset-service
systemctl enable ipset
```

### 第三步 创建ipset合集

```
ipset create -exist whitev4 hash:net family inet hashsize 1024 maxelem 1000000 timeout 0
```

### ipset 持久化

- 修改`/etc/sysconfig/ipset-config` 中的`IPSET_SAVE_ON_STOP="yes"` 设置为YES


### 第五步 白名单规则

端口
```
-A INPUT -p tcp -m set --match-set whitev4 src -m tcp --dport 80 -j ACCEPT
```
ip
```
-A INPUT -s 1.1.1.1/32 -p tcp -m tcp --dport 80 -j ACCEPT
```

### 其它示例

手动添加ip
```
ipset -exist add whitev4 255.255.255.255 timeout 120
```

### 第五步 拉取授权程序

```
