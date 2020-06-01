#!/bin/sh
if [ $# -lt 3 ] ; then
     echo "usage: $0 <FILE Name> <sftp server IP> <sftp username>"
     exit 0
fi
FileName=$1
serverIP=$2
serverUsername=$3
echo "accessing FILE=$FileName on sftp server $serverUsername@$serverIP" 
sftp -S /bin/ssh -o StrictHostKeyChecking=no "$serverUsername"@"$serverIP" << EOF
get "$FileName"
quit

