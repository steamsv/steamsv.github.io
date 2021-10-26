- 此方案可能无法百分百解锁，代理服务端设定为最高优先级

### 手动安装



```
yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum install -y bind-utils
yum install -y dnsmasq
```

#### 主配置文件

位于 `/etc/dnsmasq.d ` 目录下，以 `.conf ` 结尾，随意命名，最好是纯小写字母

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

### 脚本安装

#### 下载脚本

```
wget https://github.com/steamsv/steamsv.github.io/raw/main/unlock.sh && chmod +x unlock.sh
```

#### 使用脚本

```
./unlock.sh 1.2.3.4  #后面的DNS自行替换
```

#### 脚本作用

- 安装dnsmasq并开机自启
- 设置netflix分流规则
- 设置系统DNS为 `127.0.0.1`

#### 配置文件

- 路径`/etc/dnsmasq.d/unlock.conf`

```
server=/netflix.ca/1.2.3.4
server=/netflix.com/1.2.3.4
server=/netflix.net/1.2.3.4
server=/netflixinvestor.com/1.2.3.4
server=/netflixtechblog.com/1.2.3.4
server=/nflxext.com/1.2.3.4
server=/nflximg.com/1.2.3.4
server=/nflximg.net/1.2.3.4
server=/nflxsearch.net/1.2.3.4
server=/nflxso.net/1.2.3.4
server=/nflxvideo.net/1.2.3.4
```
