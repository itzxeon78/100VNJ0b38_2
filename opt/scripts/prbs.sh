#!/bin/bash

if [ "$1" == "e" ] ; then
    bs /b/c gpon prbs={prbs_mode=prbs"$2",us_cfg=constant,ds_comparator_cfg={cfg=yes,status=yes}}
fi


if [ "$1" == "d" ] ; then
    bs /b/c gpon prbs={prbs_mode=alternate,us_cfg=disable,ds_comparator_cfg={cfg=no,status=no}}
fi

if [ "$1" == "c" ] ; then
	bs /b/c gpon prbs={prbs_mode=prbs"$2",us_cfg=constant,ds_comparator_cfg={cfg=yes,status=yes}}
	sleep 2
	bs /b/e gpon prbs format:line
	echo "Rx sensitivity testing....."
	sleep 10
	bs /b/e gpon prbs format:line
fi

