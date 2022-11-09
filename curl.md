## 通过`curl`检测`socks5`节点是否可用

> 可用即返回对应的公网IP

### curl版本 >= 7.21.7
```
curl -x socks5h://localhost:8001  https://www.clientip.org/
```

或

```
curl --socks5 localhost:8001 https://www.clientip.org/
```