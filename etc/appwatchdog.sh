#!/bin/sh

# omci watchdog. 
# echo "omci watchdog" 
################## Watchdog1 start #############################

#omci watchdog
omcidstatus=`pidof omcid`
omcipmdstatus=`pidof omcipmd`

#voip watchdog
voiceAppstatus=`pidof voiceApp`
mmstatus=`pidof mm.exe`
icfstatus=`pidof icf.exe`

# process watchdog. This program will check processes status and
# restart processes if a process is not running, or status is zombie,
# Since we use ps and grep to check if a process is running,
# we need to check if the grep result is the grep process itself
# status="" means the process is not running
# status=Z means the process becoming zombie

if [ "$omcidstatus" = "" ] && [ "$omcipmdstatus" = "" ] ; then
	echo "step 1 : omcid & omcipmd gone, prepare to restart"  >> /var/omcirec.log
	echo "1"  >> /var/omci_restart
elif [ "$omcidstatus" = "" ]; then
	echo "step 1 : omcid gone, prepare to restart" >> /var/omcirec.log
	kill -9 $omcipmdstatus	
	echo "1"  >> /var/omci_restart
elif [ "$omcipmdstatus" = "" ]; then
	echo "step 1 : omcipmd gone, prepare to restart"  >> /var/omcirec.log
	kill -9 $omcidstatus	
	echo "1"  >> /var/omci_restart
fi

if [ "$voiceAppstatus" = "" ] || [ "$mmstatus" = "" ] || [ "$icfstatus" = "" ]; then

if [ "$1" == "logon" ]; then
		echo "Step 1: Some voice process gone. Need to restart the VoIP corresponding process."
fi
		echo "1"  >> /var/voip_restart
fi
#		echo "watchdog process"
exit

