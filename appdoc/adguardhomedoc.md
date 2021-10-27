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

#### 示例 推荐此方法

```
#netflix
||netflix.ca^$dnsrewrite=hk1.dnsunlock.com
||netflix.com^$dnsrewrite=hk1.dnsunlock.com
||netflix.net^$dnsrewrite=hk1.dnsunlock.com
||netflixinvestor.com^$dnsrewrite=hk1.dnsunlock.com
||netflixtechblog.com^$dnsrewrite=hk1.dnsunlock.com
||nflxext.com^$dnsrewrite=hk1.dnsunlock.com
||nflximg.com^$dnsrewrite=hk1.dnsunlock.com
||nflximg.net^$dnsrewrite=hk1.dnsunlock.com
||nflxsearch.net^$dnsrewrite=hk1.dnsunlock.com
||nflxso.net^$dnsrewrite=hk1.dnsunlock.com
||nflxvideo.net^$dnsrewrite=hk1.dnsunlock.com
#bilibili
||acg.tv^$dnsrewrite=hk1.dnsunlock.com
||acgvideo.com^$dnsrewrite=hk1.dnsunlock.com
||b23.tv^$dnsrewrite=hk1.dnsunlock.com
||biliapi.com^$dnsrewrite=hk1.dnsunlock.com
||biliapi.net^$dnsrewrite=hk1.dnsunlock.com
||bilibili.com^$dnsrewrite=hk1.dnsunlock.com
||bilibiligame.net^$dnsrewrite=hk1.dnsunlock.com
||biligame.com^$dnsrewrite=hk1.dnsunlock.com
||biligame.net^$dnsrewrite=hk1.dnsunlock.com
||bilivideo.com^$dnsrewrite=hk1.dnsunlock.com
||bilivideo.cn^$dnsrewrite=hk1.dnsunlock.com
||hdslb.com^$dnsrewrite=hk1.dnsunlock.com
||im9.com^$dnsrewrite=hk1.dnsunlock.com
||mincdn.com^$dnsrewrite=hk1.dnsunlock.com
||biligo.com^$dnsrewrite=hk1.dnsunlock.com
||akamaized.net^$dnsrewrite=hk1.dnsunlock.com
#hbo
||cinemax.com^$dnsrewrite=hk1.dnsunlock.com
||forthethrone.com^$dnsrewrite=hk1.dnsunlock.com
||hbo.com^$dnsrewrite=hk1.dnsunlock.com
||hboasia.com^$dnsrewrite=hk1.dnsunlock.com
||hbogo.com^$dnsrewrite=hk1.dnsunlock.com
||hbogoasia.com^$dnsrewrite=hk1.dnsunlock.com
||hbogoasia.hk^$dnsrewrite=hk1.dnsunlock.com
||hbomax.com^$dnsrewrite=hk1.dnsunlock.com
||hbomaxcdn.com^$dnsrewrite=hk1.dnsunlock.com
||hbonow.com^$dnsrewrite=hk1.dnsunlock.com
||maxgo.com^$dnsrewrite=hk1.dnsunlock.com
#hulu
||112263.com^$dnsrewrite=hk1.dnsunlock.com
||callhulu.com^$dnsrewrite=hk1.dnsunlock.com
||findyourlimits.com^$dnsrewrite=hk1.dnsunlock.com
||freehulu.com^$dnsrewrite=hk1.dnsunlock.com
||hooloo.tv^$dnsrewrite=hk1.dnsunlock.com
||hoolu.com^$dnsrewrite=hk1.dnsunlock.com
||hoolu.tv^$dnsrewrite=hk1.dnsunlock.com
||hu1u.com^$dnsrewrite=hk1.dnsunlock.com
||huloo.cc^$dnsrewrite=hk1.dnsunlock.com
||huloo.tv^$dnsrewrite=hk1.dnsunlock.com
||hulu.com^$dnsrewrite=hk1.dnsunlock.com
||hulu.tv^$dnsrewrite=hk1.dnsunlock.com
||hulu.us^$dnsrewrite=hk1.dnsunlock.com
||huluaction.com^$dnsrewrite=hk1.dnsunlock.com
||huluad.com^$dnsrewrite=hk1.dnsunlock.com
||huluapp.com^$dnsrewrite=hk1.dnsunlock.com
||huluasks.com^$dnsrewrite=hk1.dnsunlock.com
||hulucall.com^$dnsrewrite=hk1.dnsunlock.com
||hulufree.com^$dnsrewrite=hk1.dnsunlock.com
||hulugans.com^$dnsrewrite=hk1.dnsunlock.com
||hulugermany.com^$dnsrewrite=hk1.dnsunlock.com
||hulugo.com^$dnsrewrite=hk1.dnsunlock.com
||huluim.com^$dnsrewrite=hk1.dnsunlock.com
||huluinstantmessenger.com^$dnsrewrite=hk1.dnsunlock.com
||huluitaly.com^$dnsrewrite=hk1.dnsunlock.com
||hulunet.com^$dnsrewrite=hk1.dnsunlock.com
||hulunetwork.com^$dnsrewrite=hk1.dnsunlock.com
||huluplus.com^$dnsrewrite=hk1.dnsunlock.com
||hulupremium.com^$dnsrewrite=hk1.dnsunlock.com
||hulupurchase.com^$dnsrewrite=hk1.dnsunlock.com
||huluqa.com^$dnsrewrite=hk1.dnsunlock.com
||hulurussia.com^$dnsrewrite=hk1.dnsunlock.com
||huluspain.com^$dnsrewrite=hk1.dnsunlock.com
||hulusports.com^$dnsrewrite=hk1.dnsunlock.com
||hulustream.com^$dnsrewrite=hk1.dnsunlock.com
||huluteam.com^$dnsrewrite=hk1.dnsunlock.com
||hulutv.com^$dnsrewrite=hk1.dnsunlock.com
||huluusa.com^$dnsrewrite=hk1.dnsunlock.com
||joinmaidez.com^$dnsrewrite=hk1.dnsunlock.com
||mushymush.tv^$dnsrewrite=hk1.dnsunlock.com
||myhulu.com^$dnsrewrite=hk1.dnsunlock.com
||originalhulu.com^$dnsrewrite=hk1.dnsunlock.com
||payhulu.com^$dnsrewrite=hk1.dnsunlock.com
||registerhulu.com^$dnsrewrite=hk1.dnsunlock.com
||thehulubraintrust.com^$dnsrewrite=hk1.dnsunlock.com
||wwwhuluplus.com^$dnsrewrite=hk1.dnsunlock.com
#disney
||disney.asia^$dnsrewrite=hk1.dnsunlock.com
||disney.be^$dnsrewrite=hk1.dnsunlock.com
||disney.bg^$dnsrewrite=hk1.dnsunlock.com
||disney.ca^$dnsrewrite=hk1.dnsunlock.com
||disney.ch^$dnsrewrite=hk1.dnsunlock.com
||disney.co.il^$dnsrewrite=hk1.dnsunlock.com
||disney.co.jp^$dnsrewrite=hk1.dnsunlock.com
||disney.co.kr^$dnsrewrite=hk1.dnsunlock.com
||disney.co.th^$dnsrewrite=hk1.dnsunlock.com
||disney.co.uk^$dnsrewrite=hk1.dnsunlock.com
||disney.co.za^$dnsrewrite=hk1.dnsunlock.com
||disney.com^$dnsrewrite=hk1.dnsunlock.com
||disney.com.au^$dnsrewrite=hk1.dnsunlock.com
||disney.com.br^$dnsrewrite=hk1.dnsunlock.com
||disney.com.hk^$dnsrewrite=hk1.dnsunlock.com
||disney.com.tw^$dnsrewrite=hk1.dnsunlock.com
||disney.cz^$dnsrewrite=hk1.dnsunlock.com
||disney.de^$dnsrewrite=hk1.dnsunlock.com
||disney.dk^$dnsrewrite=hk1.dnsunlock.com
||disney.es^$dnsrewrite=hk1.dnsunlock.com
||disney.fi^$dnsrewrite=hk1.dnsunlock.com
||disney.fr^$dnsrewrite=hk1.dnsunlock.com
||disney.gr^$dnsrewrite=hk1.dnsunlock.com
||disney.hu^$dnsrewrite=hk1.dnsunlock.com
||disney.id^$dnsrewrite=hk1.dnsunlock.com
||disney.in^$dnsrewrite=hk1.dnsunlock.com
||disney.io^$dnsrewrite=hk1.dnsunlock.com
||disney.it^$dnsrewrite=hk1.dnsunlock.com
||disney.my^$dnsrewrite=hk1.dnsunlock.com
||disney.nl^$dnsrewrite=hk1.dnsunlock.com
||disney.no^$dnsrewrite=hk1.dnsunlock.com
||disney.ph^$dnsrewrite=hk1.dnsunlock.com
||disney.pl^$dnsrewrite=hk1.dnsunlock.com
||disney.pt^$dnsrewrite=hk1.dnsunlock.com
||disney.ro^$dnsrewrite=hk1.dnsunlock.com
||disney.ru^$dnsrewrite=hk1.dnsunlock.com
||disney.se^$dnsrewrite=hk1.dnsunlock.com
||disney.sg^$dnsrewrite=hk1.dnsunlock.com
 #Others
||20thcenturystudios.com.au^$dnsrewrite=hk1.dnsunlock.com
||20thcenturystudios.com.br^$dnsrewrite=hk1.dnsunlock.com
||20thcenturystudios.jp^$dnsrewrite=hk1.dnsunlock.com
||adventuresbydisney.com^$dnsrewrite=hk1.dnsunlock.com
||babble.com^$dnsrewrite=hk1.dnsunlock.com
||babyzone.com^$dnsrewrite=hk1.dnsunlock.com
||beautyandthebeastmusical.co.uk^$dnsrewrite=hk1.dnsunlock.com
||dilcdn.com^$dnsrewrite=hk1.dnsunlock.com
||disney-asia.com^$dnsrewrite=hk1.dnsunlock.com
||disney-discount.com^$dnsrewrite=hk1.dnsunlock.com
||disney-plus.net^$dnsrewrite=hk1.dnsunlock.com
||disney-studio.com^$dnsrewrite=hk1.dnsunlock.com
||disney-studio.net^$dnsrewrite=hk1.dnsunlock.com
||disneyadsales.com^$dnsrewrite=hk1.dnsunlock.com
||disneyarena.com^$dnsrewrite=hk1.dnsunlock.com
||disneyaulani.com^$dnsrewrite=hk1.dnsunlock.com
||disneybaby.com^$dnsrewrite=hk1.dnsunlock.com
||disneycareers.com^$dnsrewrite=hk1.dnsunlock.com
||disneychannelonstage.com^$dnsrewrite=hk1.dnsunlock.com
||disneychannelroadtrip.com^$dnsrewrite=hk1.dnsunlock.com
||disneycruisebrasil.com^$dnsrewrite=hk1.dnsunlock.com
||disneyenconcert.com^$dnsrewrite=hk1.dnsunlock.com
||disneyiejobs.com^$dnsrewrite=hk1.dnsunlock.com
||disneyinflight.com^$dnsrewrite=hk1.dnsunlock.com
||disneyinternational.com^$dnsrewrite=hk1.dnsunlock.com
||disneyinternationalhd.com^$dnsrewrite=hk1.dnsunlock.com
||disneyjunior.com^$dnsrewrite=hk1.dnsunlock.com
||disneyjuniortreataday.com^$dnsrewrite=hk1.dnsunlock.com
||disneylatino.com^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.co.il^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.co.uk^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.co.za^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.de^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.es^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.fr^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.gen.tr^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.gr^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.it^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmoments.pl^$dnsrewrite=hk1.dnsunlock.com
||disneymagicmomentsme.com^$dnsrewrite=hk1.dnsunlock.com
||disneyme.com^$dnsrewrite=hk1.dnsunlock.com
||disneymeetingsandevents.com^$dnsrewrite=hk1.dnsunlock.com
||disneymovieinsiders.com^$dnsrewrite=hk1.dnsunlock.com
||disneymusicpromotion.com^$dnsrewrite=hk1.dnsunlock.com
||disneynewseries.com^$dnsrewrite=hk1.dnsunlock.com
||disneynow.com^$dnsrewrite=hk1.dnsunlock.com
||disneypeoplesurveys.com^$dnsrewrite=hk1.dnsunlock.com
||disneyplus.com^$dnsrewrite=hk1.dnsunlock.com
||disneyredirects.com^$dnsrewrite=hk1.dnsunlock.com
||disneysrivieraresort.com^$dnsrewrite=hk1.dnsunlock.com
||disneystore.com^$dnsrewrite=hk1.dnsunlock.com
||disneystreaming.com^$dnsrewrite=hk1.dnsunlock.com
||disneysubscription.com^$dnsrewrite=hk1.dnsunlock.com
||disneytickets.co.uk^$dnsrewrite=hk1.dnsunlock.com
||disneyturkiye.com.tr^$dnsrewrite=hk1.dnsunlock.com
||disneytvajobs.com^$dnsrewrite=hk1.dnsunlock.com
||disneyworld-go.com^$dnsrewrite=hk1.dnsunlock.com
||dssott.com^$dnsrewrite=hk1.dnsunlock.com
||go-disneyworldgo.com^$dnsrewrite=hk1.dnsunlock.com
||go.com^$dnsrewrite=hk1.dnsunlock.com
||mickey.tv^$dnsrewrite=hk1.dnsunlock.com
||moviesanywhere.com^$dnsrewrite=hk1.dnsunlock.com
||nomadlandmovie.ch^$dnsrewrite=hk1.dnsunlock.com
||playmation.com^$dnsrewrite=hk1.dnsunlock.com
||shopdisney.com^$dnsrewrite=hk1.dnsunlock.com
||shops-disney.com^$dnsrewrite=hk1.dnsunlock.com
||sorcerersarena.com^$dnsrewrite=hk1.dnsunlock.com
||spaindisney.com^$dnsrewrite=hk1.dnsunlock.com
||star-brasil.com^$dnsrewrite=hk1.dnsunlock.com
||star-latam.com^$dnsrewrite=hk1.dnsunlock.com
||starwars.com^$dnsrewrite=hk1.dnsunlock.com
||starwarsgalacticstarcruiser.com^$dnsrewrite=hk1.dnsunlock.com
||starwarskids.com^$dnsrewrite=hk1.dnsunlock.com
||streamingdisney.net^$dnsrewrite=hk1.dnsunlock.com
||thestationbymaker.com^$dnsrewrite=hk1.dnsunlock.com
||thisispolaris.com^$dnsrewrite=hk1.dnsunlock.com
||watchdisneyfe.com^$dnsrewrite=hk1.dnsunlock.com
#fox
||fox-corporation.com^$dnsrewrite=hk1.dnsunlock.com
||fox-news.com^$dnsrewrite=hk1.dnsunlock.com
||fox.com^$dnsrewrite=hk1.dnsunlock.com
||fox.tv^$dnsrewrite=hk1.dnsunlock.com
||fox10.tv^$dnsrewrite=hk1.dnsunlock.com
||fox10news.com^$dnsrewrite=hk1.dnsunlock.com
||fox10phoenix.com^$dnsrewrite=hk1.dnsunlock.com
||fox11.com^$dnsrewrite=hk1.dnsunlock.com
||fox13memphis.com^$dnsrewrite=hk1.dnsunlock.com
||fox13news.com^$dnsrewrite=hk1.dnsunlock.com
||fox23.com^$dnsrewrite=hk1.dnsunlock.com
||fox23maine.com^$dnsrewrite=hk1.dnsunlock.com
||fox247.com^$dnsrewrite=hk1.dnsunlock.com
||fox247.tv^$dnsrewrite=hk1.dnsunlock.com
||fox26.com^$dnsrewrite=hk1.dnsunlock.com
||fox26houston.com^$dnsrewrite=hk1.dnsunlock.com
||fox28media.com^$dnsrewrite=hk1.dnsunlock.com
||fox29.com^$dnsrewrite=hk1.dnsunlock.com
||fox2detroit.com^$dnsrewrite=hk1.dnsunlock.com
||fox2news.com^$dnsrewrite=hk1.dnsunlock.com
||fox32.com^$dnsrewrite=hk1.dnsunlock.com
||fox32chicago.com^$dnsrewrite=hk1.dnsunlock.com
||fox35orlando.com^$dnsrewrite=hk1.dnsunlock.com
||fox38corpuschristi.com^$dnsrewrite=hk1.dnsunlock.com
||fox42kptm.com^$dnsrewrite=hk1.dnsunlock.com
||fox46.com^$dnsrewrite=hk1.dnsunlock.com
||fox46charlotte.com^$dnsrewrite=hk1.dnsunlock.com
||fox47.com^$dnsrewrite=hk1.dnsunlock.com
||fox49.tv^$dnsrewrite=hk1.dnsunlock.com
||fox4news.com^$dnsrewrite=hk1.dnsunlock.com
||fox51tns.net^$dnsrewrite=hk1.dnsunlock.com
||fox5atlanta.com^$dnsrewrite=hk1.dnsunlock.com
||fox5dc.com^$dnsrewrite=hk1.dnsunlock.com
||fox5ny.com^$dnsrewrite=hk1.dnsunlock.com
||fox5storm.com^$dnsrewrite=hk1.dnsunlock.com
||fox6now.com^$dnsrewrite=hk1.dnsunlock.com
||fox7.com^$dnsrewrite=hk1.dnsunlock.com
||fox7austin.com^$dnsrewrite=hk1.dnsunlock.com
||fox9.com^$dnsrewrite=hk1.dnsunlock.com
||foxacrossamerica.com^$dnsrewrite=hk1.dnsunlock.com
||foxaffiliateportal.com^$dnsrewrite=hk1.dnsunlock.com
||foxandfriends.com^$dnsrewrite=hk1.dnsunlock.com
||foxbet.com^$dnsrewrite=hk1.dnsunlock.com
||foxbusiness.com^$dnsrewrite=hk1.dnsunlock.com
||foxbusiness.tv^$dnsrewrite=hk1.dnsunlock.com
||foxbusinessgo.com^$dnsrewrite=hk1.dnsunlock.com
||foxcanvasroom.com^$dnsrewrite=hk1.dnsunlock.com
||foxcareers.com^$dnsrewrite=hk1.dnsunlock.com
||foxcharlotte.com^$dnsrewrite=hk1.dnsunlock.com
||foxcincy.com^$dnsrewrite=hk1.dnsunlock.com
||foxcincy.jobs^$dnsrewrite=hk1.dnsunlock.com
||foxcincy.net^$dnsrewrite=hk1.dnsunlock.com
||foxcollegesports.com^$dnsrewrite=hk1.dnsunlock.com
||foxcorporation.com^$dnsrewrite=hk1.dnsunlock.com
||foxcreativeuniversity.com^$dnsrewrite=hk1.dnsunlock.com
||foxcredit.com^$dnsrewrite=hk1.dnsunlock.com
||foxcredit.org^$dnsrewrite=hk1.dnsunlock.com
||foxd.tv^$dnsrewrite=hk1.dnsunlock.com
||foxdcg.com^$dnsrewrite=hk1.dnsunlock.com
||foxdeportes.com^$dnsrewrite=hk1.dnsunlock.com
||foxdeportes.net^$dnsrewrite=hk1.dnsunlock.com
||foxdeportes.tv^$dnsrewrite=hk1.dnsunlock.com
||foxdigitalmovies.com^$dnsrewrite=hk1.dnsunlock.com
||foxdoua.com^$dnsrewrite=hk1.dnsunlock.com
||foxentertainment.com^$dnsrewrite=hk1.dnsunlock.com
||foxest.com^$dnsrewrite=hk1.dnsunlock.com
||foxfaq.com^$dnsrewrite=hk1.dnsunlock.com
||foxfdm.com^$dnsrewrite=hk1.dnsunlock.com
||foxfiles.com^$dnsrewrite=hk1.dnsunlock.com
||foxinc.com^$dnsrewrite=hk1.dnsunlock.com
||foxkansas.com^$dnsrewrite=hk1.dnsunlock.com
||foxla.com^$dnsrewrite=hk1.dnsunlock.com
||foxla.tv^$dnsrewrite=hk1.dnsunlock.com
||foxlexington.com^$dnsrewrite=hk1.dnsunlock.com
||foxmediacloud.com^$dnsrewrite=hk1.dnsunlock.com
||foxnation.com^$dnsrewrite=hk1.dnsunlock.com
||foxnebraska.com^$dnsrewrite=hk1.dnsunlock.com
||foxneo.com^$dnsrewrite=hk1.dnsunlock.com
||foxneodigital.com^$dnsrewrite=hk1.dnsunlock.com
||foxnetworks.info^$dnsrewrite=hk1.dnsunlock.com
||foxnetworksinfo.com^$dnsrewrite=hk1.dnsunlock.com
||foxnews.cc^$dnsrewrite=hk1.dnsunlock.com
||foxnews.com^$dnsrewrite=hk1.dnsunlock.com
||foxnews.net^$dnsrewrite=hk1.dnsunlock.com
||foxnews.org^$dnsrewrite=hk1.dnsunlock.com
||foxnews.tv^$dnsrewrite=hk1.dnsunlock.com
||foxnewsaffiliates.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewsaroundtheworld.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewsb2b.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewschannel.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewsgo.net^$dnsrewrite=hk1.dnsunlock.com
||foxnewsgo.org^$dnsrewrite=hk1.dnsunlock.com
||foxnewsgo.tv^$dnsrewrite=hk1.dnsunlock.com
||foxnewshealth.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewslatino.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewsmagazine.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewsnetwork.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewsopinion.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewspodcasts.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewspolitics.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewsradio.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewsrundown.com^$dnsrewrite=hk1.dnsunlock.com
||foxnewssunday.com^$dnsrewrite=hk1.dnsunlock.com
||foxon.com^$dnsrewrite=hk1.dnsunlock.com
||foxphiladelphia.com^$dnsrewrite=hk1.dnsunlock.com
||foxplus.com^$dnsrewrite=hk1.dnsunlock.com
||foxpoker.com^$dnsrewrite=hk1.dnsunlock.com
||foxrad.io^$dnsrewrite=hk1.dnsunlock.com
||foxredeem.com^$dnsrewrite=hk1.dnsunlock.com
||foxrelease.com^$dnsrewrite=hk1.dnsunlock.com
||foxrichmond.com^$dnsrewrite=hk1.dnsunlock.com
||foxrobots.com^$dnsrewrite=hk1.dnsunlock.com
||foxsmallbusinesscenter.com^$dnsrewrite=hk1.dnsunlock.com
||foxsmallbusinesscenter.net^$dnsrewrite=hk1.dnsunlock.com
||foxsmallbusinesscenter.org^$dnsrewrite=hk1.dnsunlock.com
||foxsoccer.net^$dnsrewrite=hk1.dnsunlock.com
||foxsoccer.tv^$dnsrewrite=hk1.dnsunlock.com
||foxsoccermatchpass.com^$dnsrewrite=hk1.dnsunlock.com
||foxsoccerplus.com^$dnsrewrite=hk1.dnsunlock.com
||foxsoccerplus.net^$dnsrewrite=hk1.dnsunlock.com
||foxsoccerplus.tv^$dnsrewrite=hk1.dnsunlock.com
||foxsoccershop.com^$dnsrewrite=hk1.dnsunlock.com
||foxsports-chicago.com^$dnsrewrite=hk1.dnsunlock.com
||foxsports-newyork.com^$dnsrewrite=hk1.dnsunlock.com
||foxsports-world.com^$dnsrewrite=hk1.dnsunlock.com
||foxsports.cl^$dnsrewrite=hk1.dnsunlock.com
||foxsports.co^$dnsrewrite=hk1.dnsunlock.com
||foxsports.co.ve^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.ar^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.bo^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.br^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.co^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.ec^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.gt^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.mx^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.pe^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.py^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.uy^$dnsrewrite=hk1.dnsunlock.com
||foxsports.com.ve^$dnsrewrite=hk1.dnsunlock.com
||foxsports.gt^$dnsrewrite=hk1.dnsunlock.com
||foxsports.info^$dnsrewrite=hk1.dnsunlock.com
||foxsports.net^$dnsrewrite=hk1.dnsunlock.com
||foxsports.net.br^$dnsrewrite=hk1.dnsunlock.com
||foxsports.pe^$dnsrewrite=hk1.dnsunlock.com
||foxsports.sv^$dnsrewrite=hk1.dnsunlock.com
||foxsports.uy^$dnsrewrite=hk1.dnsunlock.com
||foxsports2.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportsflorida.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportsgo.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportsla.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportsnetmilwaukee.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportsneworleans.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportsracing.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportssupports.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportsuniversity.com^$dnsrewrite=hk1.dnsunlock.com
||foxsportsworld.com^$dnsrewrite=hk1.dnsunlock.com
||foxstudiolot.com^$dnsrewrite=hk1.dnsunlock.com
||foxsuper6.com^$dnsrewrite=hk1.dnsunlock.com
||foxtel.com^$dnsrewrite=hk1.dnsunlock.com
||foxtel.com.au^$dnsrewrite=hk1.dnsunlock.com
||foxtelevisionstations.com^$dnsrewrite=hk1.dnsunlock.com
||foxtv.com^$dnsrewrite=hk1.dnsunlock.com
||foxtvdvd.com^$dnsrewrite=hk1.dnsunlock.com
||foxuv.com^$dnsrewrite=hk1.dnsunlock.com
||foxweatherwatch.com^$dnsrewrite=hk1.dnsunlock.com
||fssta.com^$dnsrewrite=hk1.dnsunlock.com
||fxn.ws^$dnsrewrite=hk1.dnsunlock.com
||fxnetwork.com^$dnsrewrite=hk1.dnsunlock.com
||fxnetworks.com^$dnsrewrite=hk1.dnsunlock.com
# Bento Box Entertainment
||bentobox.tv^$dnsrewrite=hk1.dnsunlock.com
# KTVU FOX
||kicu.tv^$dnsrewrite=hk1.dnsunlock.com
||ktvu.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxsanfran.com^$dnsrewrite=hk1.dnsunlock.com
# Other 
||afewmomentswith.com^$dnsrewrite=hk1.dnsunlock.com
||anidom.com^$dnsrewrite=hk1.dnsunlock.com
||casoneexchange.com^$dnsrewrite=hk1.dnsunlock.com
||coronavirusnow.com^$dnsrewrite=hk1.dnsunlock.com
||fse.tv^$dnsrewrite=hk1.dnsunlock.com
||geraldoatlarge.com^$dnsrewrite=hk1.dnsunlock.com
||gooddaychicago.com^$dnsrewrite=hk1.dnsunlock.com
||joeswall.com^$dnsrewrite=hk1.dnsunlock.com
||kilmeadeandfriends.com^$dnsrewrite=hk1.dnsunlock.com
||maskedsingerfox.com^$dnsrewrite=hk1.dnsunlock.com
||my13la.com^$dnsrewrite=hk1.dnsunlock.com
||my20dc.com^$dnsrewrite=hk1.dnsunlock.com
||my20houston.com^$dnsrewrite=hk1.dnsunlock.com
||my29tv.com^$dnsrewrite=hk1.dnsunlock.com
||my45.com^$dnsrewrite=hk1.dnsunlock.com
||my9nj.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxatlanta.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxaustin.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxboston.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxcharlotte.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxchicago.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxdc.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxdetroit.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxdfw.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxhouston.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxhurricane.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxla.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxlosangeles.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxlubbock.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxmaine.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxny.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxorlando.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxphilly.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxphoenix.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxtampa.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxtampabay.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxtwincities.com^$dnsrewrite=hk1.dnsunlock.com
||myfoxzone.com^$dnsrewrite=hk1.dnsunlock.com
||myq2.com^$dnsrewrite=hk1.dnsunlock.com
||newsnowfox.com^$dnsrewrite=hk1.dnsunlock.com
||orlandohurricane.com^$dnsrewrite=hk1.dnsunlock.com
||paradisehotelquizfox.com^$dnsrewrite=hk1.dnsunlock.com
||q13.com^$dnsrewrite=hk1.dnsunlock.com
||q13fox.com^$dnsrewrite=hk1.dnsunlock.com
||realamericanstories.com^$dnsrewrite=hk1.dnsunlock.com
||realamericanstories.info^$dnsrewrite=hk1.dnsunlock.com
||realamericanstories.net^$dnsrewrite=hk1.dnsunlock.com
||realamericanstories.org^$dnsrewrite=hk1.dnsunlock.com
||realamericanstories.tv^$dnsrewrite=hk1.dnsunlock.com
||realmilwaukeenow.com^$dnsrewrite=hk1.dnsunlock.com
||rprimelab.com^$dnsrewrite=hk1.dnsunlock.com
||shopspeedtv.com^$dnsrewrite=hk1.dnsunlock.com
||soccermatchpass.com^$dnsrewrite=hk1.dnsunlock.com
||speeddreamride.com^$dnsrewrite=hk1.dnsunlock.com
||speedfantasybid.com^$dnsrewrite=hk1.dnsunlock.com
||speedracegear.com^$dnsrewrite=hk1.dnsunlock.com
||speedxtra.com^$dnsrewrite=hk1.dnsunlock.com
||teenchoice.com^$dnsrewrite=hk1.dnsunlock.com
||testonfox.com^$dnsrewrite=hk1.dnsunlock.com
||theclasshroom.com^$dnsrewrite=hk1.dnsunlock.com
||thefoxnation.com^$dnsrewrite=hk1.dnsunlock.com
||thegeorgiascene.com^$dnsrewrite=hk1.dnsunlock.com
||whatthefox.com^$dnsrewrite=hk1.dnsunlock.com
||whosthehost.com^$dnsrewrite=hk1.dnsunlock.com
||wofl.tv^$dnsrewrite=hk1.dnsunlock.com
||woflthenewsstation.com^$dnsrewrite=hk1.dnsunlock.com
||wogx.com^$dnsrewrite=hk1.dnsunlock.com
#bahamut
||hinet.net^$dnsrewrite=hk1.dnsunlock.com
||gamer.com.tw^$dnsrewrite=hk1.dnsunlock.com
||bahamut.com.tw^$dnsrewrite=hk1.dnsunlock.com
||pp-measurement.com^$dnsrewrite=hk1.dnsunlock.com
#iqiyi
||71.am^$dnsrewrite=hk1.dnsunlock.com
||iqiyi.com^$dnsrewrite=hk1.dnsunlock.com
||iqiyipic.com^$dnsrewrite=hk1.dnsunlock.com
||pps.tv^$dnsrewrite=hk1.dnsunlock.com
||ppsimg.com^$dnsrewrite=hk1.dnsunlock.com
||qiyi.com^$dnsrewrite=hk1.dnsunlock.com
||qiyipic.com^$dnsrewrite=hk1.dnsunlock.com
||qy.net^$dnsrewrite=hk1.dnsunlock.com
#tvb
||bigbigchannel.com.hk^$dnsrewrite=hk1.dnsunlock.com
||bigbigshop.com^$dnsrewrite=hk1.dnsunlock.com
||encoretvb.com^$dnsrewrite=hk1.dnsunlock.com
||tvb.com^$dnsrewrite=hk1.dnsunlock.com
||tvb.com.au^$dnsrewrite=hk1.dnsunlock.com
||tvbanywhere.com^$dnsrewrite=hk1.dnsunlock.com
||tvbanywhere.com.sg^$dnsrewrite=hk1.dnsunlock.com
||tvbc.com.cn^$dnsrewrite=hk1.dnsunlock.com
||tvbeventpower.com.hk^$dnsrewrite=hk1.dnsunlock.com
||tvbusa.com^$dnsrewrite=hk1.dnsunlock.com
||tvbweekly.com^$dnsrewrite=hk1.dnsunlock.com
||tvmedia.net.au^$dnsrewrite=hk1.dnsunlock.com
||windows.net^$dnsrewrite=hk1.dnsunlock.com
||omtrdc.net^$dnsrewrite=hk1.dnsunlock.com
||mytvsuper.com^$dnsrewrite=hk1.dnsunlock.com
#abema
||abema.io^$dnsrewrite=hk1.dnsunlock.com
||abema.tv^$dnsrewrite=hk1.dnsunlock.com
||adx.promo^$dnsrewrite=hk1.dnsunlock.com
||ameba.jp^$dnsrewrite=hk1.dnsunlock.com
||amebame.com^$dnsrewrite=hk1.dnsunlock.com
||amebaownd.com^$dnsrewrite=hk1.dnsunlock.com
||amebaowndme.com^$dnsrewrite=hk1.dnsunlock.com
||ameblo.jp^$dnsrewrite=hk1.dnsunlock.com
||bucketeer.jp^$dnsrewrite=hk1.dnsunlock.com
||dokusho-ojikan.jp^$dnsrewrite=hk1.dnsunlock.com
||hayabusa.dev^$dnsrewrite=hk1.dnsunlock.com
||hayabusa.io^$dnsrewrite=hk1.dnsunlock.com
||hayabusa.media^$dnsrewrite=hk1.dnsunlock.com
||winticket.jp^$dnsrewrite=hk1.dnsunlock.com
||akamaized.net^$dnsrewrite=hk1.dnsunlock.com
#dmm
||dmm.com^$dnsrewrite=hk1.dnsunlock.com
||dmm.co.jp^$dnsrewrite=hk1.dnsunlock.com
||dmmgames.com^$dnsrewrite=hk1.dnsunlock.com
||dmm.hk^$dnsrewrite=hk1.dnsunlock.com
||dmm-extension.com^$dnsrewrite=hk1.dnsunlock.com
||dmmapis.com^$dnsrewrite=hk1.dnsunlock.com
#dazn
||dazn-api.com^$dnsrewrite=hk1.dnsunlock.com
||dazn.com^$dnsrewrite=hk1.dnsunlock.com
||dazndn.com^$dnsrewrite=hk1.dnsunlock.com
||indazn.com^$dnsrewrite=hk1.dnsunlock.com
||indaznlab.com^$dnsrewrite=hk1.dnsunlock.com
#cygames
||cygames.jp^$dnsrewrite=hk1.dnsunlock.com

```

