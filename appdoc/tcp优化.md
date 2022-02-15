## tcp优化

### 内核

1.

```
echo "fs.nr_open = 2000000" >> /etc/sysctl.conf
echo "fs.file-max = 2000000" >> /etc/sysctl.conf
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
echo "net.nf_conntrack_max=2000000" >> /etc/sysctl.conf
echo "net.ipv4.ip_forward = 0" >> /etc/sysctl.conf
echo "net.ipv4.conf.default.rp_filter = 1" >> /etc/sysctl.conf
echo "net.ipv4.conf.default.accept_source_route = 0" >> /etc/sysctl.conf
echo "kernel.sysrq = 0" >> /etc/sysctl.conf
echo "kernel.core_uses_pid = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_syncookies = 1" >> /etc/sysctl.conf
echo "kernel.msgmnb = 65536" >> /etc/sysctl.conf
echo "kernel.msgmax = 65536" >> /etc/sysctl.conf
echo "kernel.shmmax = 68719476736" >> /etc/sysctl.conf
echo "kernel.shmall = 4294967296" >> /etc/sysctl.conf
echo "net.ipv4.tcp_max_tw_buckets = 6000" >> /etc/sysctl.conf
echo "net.ipv4.tcp_sack = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_window_scaling = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_rmem = 10240 87380 12582912" >> /etc/sysctl.conf
echo "net.ipv4.tcp_wmem = 10240 87380 12582912" >> /etc/sysctl.conf
echo "net.core.wmem_default = 8388608" >> /etc/sysctl.conf
echo "net.core.rmem_default = 8388608" >> /etc/sysctl.conf
echo "net.core.rmem_max = 16777216" >> /etc/sysctl.conf
echo "net.core.wmem_max = 16777216" >> /etc/sysctl.conf
echo "net.core.netdev_max_backlog = 262144" >> /etc/sysctl.conf
echo "net.core.somaxconn = 40960" >> /etc/sysctl.conf
echo "net.ipv4.tcp_max_orphans = 3276800" >> /etc/sysctl.conf
echo "net.ipv4.tcp_max_syn_backlog = 262144" >> /etc/sysctl.conf
echo "net.ipv4.tcp_timestamps = 0" >> /etc/sysctl.conf
echo "net.ipv4.tcp_synack_retries = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_syn_retries = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_tw_reuse = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_mem = 94500000 915000000 927000000" >> /etc/sysctl.conf
echo "net.ipv4.tcp_fin_timeout = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_keepalive_time = 30" >> /etc/sysctl.conf
echo "net.ipv4.ip_local_port_range = 1024 65000" >> /etc/sysctl.conf

echo 2000000 > /proc/sys/fs/nr_open

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
