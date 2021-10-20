# iptables劫持DNS（最佳方案）

## 自备环境

```
iptables -t nat -A OUTPUT -p udp -m udp --dport 53 -j DNAT --to-destination DNS
```

注意冲突，排除非53 UDP DNS，DNS为变量自行替换，可配合Adguard home使用效果更好

配合adguard home DNS必须设置成tcp，如下

![](https://www.nicoimg.com/file/nicoimg/tcpdns.png)
