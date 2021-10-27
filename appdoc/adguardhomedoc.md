## 入门 <a href="getting-started" id="getting-started"></a>

请阅读我们Wiki上的 [**Getting Started**](https://github.com/AdguardTeam/AdGuardHome/wiki/Getting-Started) 文章，了解如何安装AdGuard Home，以及如何配置设备以使用它。

I如果您运行的是 **Linux**, 有一种安全且简单的方法来安装AdGuard Home—您可以从 [Snap Store](https://snapcraft.io/adguard-home)获得它。

或者，您可以使用我们的 [official Docker image](https://hub.docker.com/r/adguard/adguardhome) 镜像。

## 指南

* [配置](https://github.com/AdguardTeam/AdGuardHome/wiki/Configuration)
* [AdGuard Home作为HTTPS上的DNS或TLS服务器上的DNS](https://github.com/AdguardTeam/AdGuardHome/wiki/Encryption)
* [如何在Raspberry Pi上安装和运行AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Raspberry-Pi)
* [如何在虚拟专用服务器上安装和运行AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/VPS)
* [如何正确编写自己的主机阻止列表](https://github.com/AdguardTeam/AdGuardHome/wiki/Hosts-Blocklists)



## VPS上面安装

要在VPS上运行AdGuard Home，您需要一台VPS服务，这里以centos7x64系统为例。

### 第一步 安装调试工具

- 首先，让我们确保您的VPS具有必要的最低要求，以root身份运行此命令：

```bash
yum install bind-utils -y
```

### 第二步 下载并安装

- 转到 [AdGuard Home page](https://github.com/AdguardTeam/AdGuardHome#installation) 并下载适用于您的体系结构的二进制文件（在此示例中为64位Linux）。

要下载AdGuard Home并解压缩它，请执行以下命令：

To download AdGuard Home and unpack it execute following commands:

```bash
wget https://static.adguard.com/adguardhome/release/AdGuardHome_linux_amd64.tar.gz
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

如果一切正常，您将获得以下输出：

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



## 实现DNS重定向

自行理解其运行方式，举一反三。

### 1.DNS重写

过滤器——DNS重写

![](https://www.nicoimg.com/file/nicoimg/dnscx.png)

### 2.自定义规则

过滤器——自定义规则

![](https://www.nicoimg.com/file/nicoimg/zdygz.png)

