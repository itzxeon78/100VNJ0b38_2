#!/bin/sh

BUSYBOX="/usr/bin/busybox_1.22.1"
TFTPROOT="/var/mnt/usr/bin"

#Reset 
killall busybox_1.22.1
rm /usr/bin/tftpd
rm /usr/bin/tftp
rm /usr/bin/telnet
ifconfig eth4 down
ifconfig br0:9 down


#Set BRCM RGMII interface 
ifconfig eth4 up ;\
brctl addif br0 eth4 ;\
ifconfig br0:9 1.1.1.1 netmask 255.255.255.0 ;\
bs /b/c port/index=lan4 emac_cfg={emac_param={rate=1g}} ;\
bs /m mw 0xb30d3004 w 0x0000000b

#Create link for telnet to QTN
ln $BUSYBOX /usr/bin/telnet 2>/dev/null

#Create link for udpsvd calling.
ln $BUSYBOX /usr/bin/tftpd 2>/dev/null
ln $BUSYBOX /usr/bin/tftp 2>/dev/null

#Bring up the tftpd
echo "69 dgram udp nowait root tftpd tftpd -l $TFTPROOT" > /etc/inetd.conf
$BUSYBOX inetd &
sleep 1
$BUSYBOX udpsvd -vE 0 69 tftpd -c $TFTPROOT &
sleep 1

#Reset QTN
cat /proc/ResetQTN
