## ab压测

### 安装

```
yum install httpd-tools
```

### 使用命令

```
ab -n 500000 -c 1000 -r http://demo.nicoimg.com/index.php
```

备注：代表 1000个客户端 发起500000请求，相当于每个客户端500个请求


## siege测试

```
yum -y install siege
```

```
siege -c 1 -r 2 -b https://steamsv.com/
```
