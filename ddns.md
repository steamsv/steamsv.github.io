## 安装
```
curl -L https://github.com/steamsv/ddns-cf/raw/main/ddns -o /usr/bin/ddns
chmod +x /usr/bin/ddns
```

## 配置
```
{
  "$schema": "https://ddns.newfuture.cc/schema/v2.8.json",
  "debug": false,
  "dns": "cloudflare",
  "id": "xxx@163.com",
  "index4": "url:https://www.clientip.org",
  "index6": "default",
  "ipv4": [
    "baidu.com"
  ],
  "cache": false,
  "proxy": null,
  "token": "key",
  "ttl": 60
}
```

- 避免错误，请保存此配置到`/etc/ddns/config.json`

## 配置主要参数介绍

`xxx@163.com` cloudflare 的登录邮箱
`baidu.com`   需要解析的域
`key` cloudflare的key
在此网址查看你的key `https://dash.cloudflare.com/profile/api-tokens` 搜索`Global API Key`

## 定时任务

`*/5 * * * * /usr/bin/ddns -c /etc/ddns/config.json`