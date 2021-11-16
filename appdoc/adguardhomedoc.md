## 入门 <a href="getting-started" id="getting-started"></a>

- 以vultr centos7 为例
- 以下所有命令 均在VPS的ssh窗口执行


## VPS上面安装

- 要在VPS上运行AdGuard Home，您需要一台VPS服务，这里以centos7x64系统为例。
- [视频教程](https://www.youtube.com/watch?v=nwbVA6j8kSE)

### 第一步 安装调试工具

- 首先，让我们确保您的VPS具有必要的最低要求，以root身份运行此命令：

```bash
yum install bind-utils -y
```

### 第二步 下载并安装

- 下载AdGuard Home并解压缩它，请执行以下命令：

```bash
yum install wget -y && wget https://static.adguard.com/adguardhome/release/AdGuardHome_linux_amd64.tar.gz
tar xvf AdGuardHome_linux_amd64.tar.gz
```

您可以通过运行以下命令切换到将其解压缩到的目录：

```bash
cd AdGuardHome
pwd
```

运行 `./AdGuardHome -s install` 将AdGuard Home安装为系统服务.

### 第三步 通过浏览器继续安装

默认端口为 3000 访问 — `http://ip:3000/`

ip为您的VPS对外的公网IP，按照实际需求自行配置


这是您可能需要控制服务的其他命令。

```
./AdGuardHome -s uninstall  //卸载AdGuard Home服务。
./AdGuardHome -s start  //启动服务。
./AdGuardHome -s stop  //停止服务。
./AdGuardHome -s restart  //重新启动服务。
./AdGuardHome -s status  //显示当前服务状态。
及
systemctl start AdGuardHome  //启动
systemctl restart AdGuardHome  //重启
systemctl status AdGuardHome  //查看状态
systemctl enable AdGuardHome  //开机启动
systemctl disable AdGuardHome  //开机禁用
```



### 第四步 验证其是否正常运行

您可以通过运行以下命令来验证：

```bash
nslookup google.com 127.0.0.1
```

如果一切正常，您将获得以下返回：

```
Using domain server:
Name: 127.0.0.1
Address: 127.0.0.1#53
Aliases:
......
```

### 配置设备以使用AdGuard Home

现在，一旦确定AdGuard Home可以在VPS上运行，就可以通过更改系统DNS或软件设置以使用VPS的公共IP地址或内网IP地址在计算机上使用它。

注意：某些IDC的服务器使用adguard home 默认DNS会出现部分问题，可记录系统初始DNS修改为即可



## DNS重定向

### 自定义规则

过滤器——自定义规则

![](https://www.nicoimg.com/file/nicoimg/zdygz.png)

#### 示例 推荐此方法

- 重定向规则及其子域至香港 sniproxy ip （hk1.dnsunlock.com 为其DDNS）
- 因为规则太过复杂，这里将所有流量劫持过去

```
||*^$dnsrewrite=hk1.dnsunlock.com
```

- 如需分流，可指定规则，规则参考[Github](https://github.com/v2fly/domain-list-community/)
```
||netflix.com^$dnsrewrite=hk1.dnsunlock.com
||abc.com^$dnsrewrite=hk1.dnsunlock.com
```