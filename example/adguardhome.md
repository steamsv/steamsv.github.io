# adguardhome教程

![AdGuard Home](https://cdn.adguard.com/public/Adguard/Common/adguard\_home.svg)

### 为您和您的设备提供隐私保护中心

&#x20;免费开源，强大的全网广告和跟踪阻止DNS服务器。.

&#x20;[AdGuard.com](https://adguard.com) | [Wiki](https://github.com/AdguardTeam/AdGuardHome/wiki) | [Reddit](https://reddit.com/r/Adguard) | [Twitter](https://twitter.com/AdGuard) | [Telegram](https://t.me/adguard\_en)\
\
&#x20;[![Code Coverage](https://img.shields.io/codecov/c/github/AdguardTeam/AdGuardHome/master.svg)](https://codecov.io/github/AdguardTeam/AdGuardHome?branch=master) [![Go Report Card](https://goreportcard.com/badge/github.com/AdguardTeam/AdGuardHome)](https://goreportcard.com/report/AdguardTeam/AdGuardHome) [![GolangCI](https://golangci.com/badges/github.com/AdguardTeam/AdGuardHome.svg)](https://golangci.com/r/github.com/AdguardTeam/AdGuardHome)\
&#x20;[![Latest release](https://img.shields.io/github/release/AdguardTeam/AdGuardHome/all.svg)](https://github.com/AdguardTeam/AdGuardHome/releases) [![adguard-home](https://snapcraft.io/adguard-home/badge.svg)](https://snapcraft.io/adguard-home) [![Docker Pulls](https://img.shields.io/docker/pulls/adguard/adguardhome.svg?maxAge=604800)](https://hub.docker.com/r/adguard/adguardhome) [![Docker Stars](https://img.shields.io/docker/stars/adguard/adguardhome.svg?maxAge=604800)](https://hub.docker.com/r/adguard/adguardhome)

![](https://cdn.adguard.com/public/Adguard/Common/adguard\_home.gif)

&#x20;AdGuard Home是一个全网络的阻止广告和跟踪的软件。设置完成后，它将覆盖所有家庭设备，而您不需要任何客户端软件。

它作为一个DNS服务器运行，将跟踪域重新路由到“黑洞”，从而阻止您的设备连接到这些服务器。它基于我们为我们的公共[AdGuard DNS](https://adguard.com/en/adguard-dns/overview.html)服务器使用的软件-两者共享许多通用代码。

## 入门 <a href="getting-started" id="getting-started"></a>

请阅读我们Wiki上的 [**Getting Started**](https://github.com/AdguardTeam/AdGuardHome/wiki/Getting-Started) 文章，了解如何安装AdGuard Home，以及如何配置设备以使用它。

I如果您运行的是 **Linux**, 有一种安全且简单的方法来安装AdGuard Home—您可以从 [Snap Store](https://snapcraft.io/adguard-home)获得它。

或者，您可以使用我们的 [official Docker image](https://hub.docker.com/r/adguard/adguardhome) 镜像。

### 指南

* [配置](https://github.com/AdguardTeam/AdGuardHome/wiki/Configuration)
* [AdGuard Home作为HTTPS上的DNS或TLS服务器上的DNS](https://github.com/AdguardTeam/AdGuardHome/wiki/Encryption)
* [如何在Raspberry Pi上安装和运行AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Raspberry-Pi)
* [如何在虚拟专用服务器上安装和运行AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/VPS)
* [如何正确编写自己的主机阻止列表](https://github.com/AdguardTeam/AdGuardHome/wiki/Hosts-Blocklists)



## VPS上面安装

要在VPS上运行AdGuard Home，您需要一台VPS服务，这里以centos7x64系统为例。

* 开始安装

首先，让我们确保您的VPS具有必要的最低要求，以root身份运行此命令：

```bash
yum install bind-utils
```

转到 [AdGuard Home page](https://github.com/AdguardTeam/AdGuardHome#installation) 并下载适用于您的体系结构的二进制文件（在此示例中为64位Linux）。

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

## 通过浏览器继续安装

默认端口为 3000 访问 — `http://ip:3000/`

ip为您的VPS对外的公网IP，按照实际需求自行配置

![此选项无意义 直接点击下一步](<../../.gitbook/assets/image (6).png>)

这是您可能需要控制服务的其他命令。

* `AdGuardHome -s uninstall` - 卸载AdGuard Home服务。
* `AdGuardHome -s start` - 启动服务。
* `AdGuardHome -s stop` - 停止服务。
* `AdGuardHome -s restart` - 重新启动服务。
* `AdGuardHome -s status` - 显示当前服务状态。



您可以通过运行以下命令来验证其是否正常运行：

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

## 配置设备以使用AdGuard Home

现在，一旦确定AdGuard Home可以在VPS上运行，就可以通过更改系统DNS设置以使用VPS的公共IP地址在计算机上使用它。

注意：某些IDC的服务器使用adguard home 默认DNS会出现部分问题，可记录系统初始DNS修改为即可

## 代理服务端使用Adguard home <a href="acknowledgments" id="acknowledgments"></a>

注意:首先你要知道代理服务端使用的是内置DNS还是系统DNS，前者优先

1.不论你的代理服务端使用的是哪个DNS，首先修改系统DNS为`127.0.0.1`

备注:系统DNS配置路径`/etc/resolv.conf`

注意:部分IDC服务商试用Adguard home 默认DNS会出问题，务必备份初始DNS，以便出问题时设定。

2.设置——DNS设置——DNS服务设定  勾选禁用IPv6

3.然后重启代理服务端

