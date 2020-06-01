#!/bin/sh

sleep 40

bs /m mw 0xb30d3004 w 0x0000000b

ifconfig br0:9 1.1.1.1

# start up vodsl
#sleep 25
#/bin/vodsl -D 192.168.1.254 & 

#start up sshd
#sleep 1

dropbearkey -t rsa -f /var/rsa_host_key > /dev/null

#/bin/sshd -I 600 &
