### iptables劫持DNS


```
iptables -t nat -A OUTPUT -p udp -m udp --dport 53 -j DNAT --to-destination DNS
```

以上命令作用是劫持53UDP流量至指定地址，DNS为变量自行替换，可配合Adguard home使用效果更好

#### 配合本地adguard home DNS必须设置成tcp

如下

![](https://www.nicoimg.com/file/nicoimg/tcpdns.png)
