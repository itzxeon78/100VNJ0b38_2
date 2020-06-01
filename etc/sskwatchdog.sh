#!/bin/sh

#ssk watchdog
sskStatus=`pidof ssk`
smdStatus=`pidof smd`
#echo "sskStatus $sskStatus smdStatus=$smdStatus"

if [ "$sskStatus" = "" ] || [ "$smdStatus" = "" ]; then
	echo "Step 1: ssk or smd process gone. Need to reboot device."
	echo "1"  >> /var/ssk_restart
#else
#	echo "sskwatchdog process"
fi

exit