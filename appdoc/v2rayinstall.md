## v2ray安装


```
systemctl stop firewalld
systemctl disable firewalld
```

```
/usr/local/etc/v2ray/config.json
```


```
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```

```
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-dat-release.sh)
```

```
systemctl start v2ray
systemctl enable v2ray
```

```
systemctl stop v2ray
systemctl disable v2ray
```
