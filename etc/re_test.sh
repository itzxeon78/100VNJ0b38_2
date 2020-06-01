#!/bin/sh

bdmf_shell -c init | while read a b ; do echo $b ; done > /var/bdmf_sh_id
alias bs="bdmf_shell -c `cat /var/bdmf_sh_id` -cmd "
bs /bdmf/conf system cfg={car_mode=no,mtu_size=1536}
bs /bdmf/configure egress_tm/dir=ds,index=1 queue_cfg[1]={weight=0,drop_alg=dt,drop_threshold=500,red_threshold=0,red_percent=0}
bs /bdmf/configure egress_tm/dir=ds,index=2 queue_cfg[1]={weight=0,drop_alg=dt,drop_threshold=500,red_threshold=0,red_percent=0}
bs /bdmf/configure egress_tm/dir=ds,index=3 queue_cfg[1]={weight=0,drop_alg=dt,drop_threshold=500,red_threshold=0,red_percent=0}
bs /bdmf/link port/index=wan0 bridge/index=0
bs /bdmf/new tcont/index=1,alloc_id=350
bs /bdmf/new egress_tm/dir=us,level=queue,mode=sp tcont/index=1
bs /bdmf/configure egress_tm/dir=us,index=0 queue_cfg[0]="{drop_threshold=128,queue_id=0}"
bs /bdmf/configure cpu/index=host rxq_cfg[0]="{rx_isr=0,sysb_type=skb,size=128,dump_data=no,isr_priv=0}"
bs /bdmf/configure bridge/index=0 mac['<mac=00:00:00:00:00:33>']='<ports=lan1,sal_action=forward,dal_action=forward>'
bs /bdmf/configure bridge/index=0 mac['<mac=00:00:00:00:00:44>']='<ports=lan2,sal_action=forward,dal_action=forward>'
bs /bdmf/configure bridge/index=0 mac['<mac=00:00:00:00:00:55>']='<ports=lan3,sal_action=forward,dal_action=forward>'

bs /bdmf/new gem/index=2,flow_type=ethernet,gem_port=301,us_cfg={tcont={tcont/index=1}}
bs /bdmf/configure gem/index=2 ds_encryption=no,ds_cfg={discard_prty=low,destination=eth}
bs /bdmf/attr/add ip_class flow string key={dir=us,src_ip=192.168.1.90,dst_ip=192.168.88.21,prot=6,src_port=1100,dst_port=2100},result={action=host,trap_reason=conn_trap0,nat_port=1001,nat_ip=192.168.88.10,queue_id=0,port=wan0,dscp_value=35,wan_flow=2,ovid_offset=offset_12,l2_head_size=18,action_vec=nat+dscp+ttl,l2_header=0010180000000000000000b18100012d0800}
bs /bdmf/attr/add ip_class flow string key={dir=ds,src_ip=192.168.88.21,dst_ip=192.168.88.10,prot=6,src_port=2101,dst_port=1101},result={action=host,trap_reason=conn_trap0,nat_port=2101,nat_ip=192.168.1.90,queue_id=1,port=lan1,dscp_value=25,ovid_offset=offset_12,l2_head_size=18,action_vec=nat+dscp+ttl,l2_header=0010180000000000000000a1810000660800}

bs /bdmf/new gem/index=3,flow_type=ethernet,gem_port=302,us_cfg={tcont={tcont/index=1}}
bs /bdmf/configure gem/index=3 ds_encryption=no,ds_cfg={discard_prty=low,destination=eth}
bs /bdmf/attr/add ip_class flow string key={dir=us,src_ip=192.168.1.80,dst_ip=192.168.88.22,prot=6,src_port=1200,dst_port=2200},result={action=host,trap_reason=conn_trap0,nat_port=1001,nat_ip=192.168.88.10,queue_id=0,port=wan0,dscp_value=35,wan_flow=3,ovid_offset=offset_12,l2_head_size=18,action_vec=nat+dscp+ttl,l2_header=0010180000000000000000b28100012e0800}
bs /bdmf/attr/add ip_class flow string key={dir=ds,src_ip=192.168.88.22,dst_ip=192.168.88.10,prot=6,src_port=2201,dst_port=1201},result={action=host,trap_reason=conn_trap0,nat_port=2201,nat_ip=192.168.1.80,queue_id=1,port=lan2,dscp_value=25,ovid_offset=offset_12,l2_head_size=18,action_vec=nat+dscp+ttl,l2_header=0010180000000000000000a2810000670800}

bs /bdmf/new gem/index=4,flow_type=ethernet,gem_port=303,us_cfg={tcont={tcont/index=1}}
bs /bdmf/configure gem/index=4 ds_encryption=no,ds_cfg={discard_prty=low,destination=eth}
bs /bdmf/attr/add ip_class flow string key={dir=us,src_ip=192.168.1.70,dst_ip=192.168.88.23,prot=6,src_port=1300,dst_port=2300},result={action=host,trap_reason=conn_trap0,nat_port=1001,nat_ip=192.168.88.10,queue_id=0,port=wan0,dscp_value=35,wan_flow=4,ovid_offset=offset_12,l2_head_size=18,action_vec=nat+dscp+ttl,l2_header=0010180000000000000000b38100012f0800}
bs /bdmf/attr/add ip_class flow string key={dir=ds,src_ip=192.168.88.23,dst_ip=192.168.88.10,prot=6,src_port=2301,dst_port=1301},result={action=host,trap_reason=conn_trap0,nat_port=2301,nat_ip=192.168.1.70,queue_id=1,port=lan3,dscp_value=25,ovid_offset=offset_12,l2_head_size=18,action_vec=nat+dscp+ttl,l2_header=0010180000000000000000a3810000680800}
