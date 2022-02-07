## tcp优化

### 内核

1.

```
echo "net.ipv4.tcp_syncookies = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_tw_reuse = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_tw_recycle = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_fin_timeout = 30" >> /etc/sysctl.conf
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
echo "fs.file-max=2000000" >> /etc/sysctl.conf
echo "fs.nr_open=2000500" >> /etc/sysctl.conf
echo "net.nf_conntrack_max=2000500" >> /etc/sysctl.conf
echo "net.ipv4.tcp_mem='131072  262144  524288'" >> /etc/sysctl.conf
echo "net.ipv4.tcp_rmem='8760  256960  4088000'" >> /etc/sysctl.conf
echo "net.ipv4.tcp_wmem='8760  256960  4088000'" >> /etc/sysctl.conf
echo "net.core.rmem_max=16384" >> /etc/sysctl.conf
echo "net.core.wmem_max=16384" >> /etc/sysctl.conf
echo "net.core.somaxconn=2048" >> /etc/sysctl.conf
echo "net.ipv4.tcp_max_syn_backlog=2048" >> /etc/sysctl.conf
echo "net.core.netdev_max_backlog=2048" >> /etc/sysctl.conf
echo "net.ipv4.tcp_tw_recycle=1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_tw_reuse=1" >> /etc/sysctl.conf
```

2.

```
echo 2000500 > /proc/sys/fs/nr_open
```

3.

```
echo "* soft nproc 2000000" >> /etc/security/limits.conf
echo "* hard nproc 2000000" >> /etc/security/limits.conf
echo "* soft nofile 2000000" >> /etc/security/limits.conf
echo "* hard nofile 2000000" >> /etc/security/limits.conf
```

4. 重启

5.验证

```
ulimit -n
```

```
cat /proc/sys/net/nf_conntrack_max
```

```
sysctl -p
```
