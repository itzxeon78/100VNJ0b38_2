#!/bin/bash

echo "rdpa filter init start!!"
# filters

bs /bdmf/new filter

# Filter: ARP
bs /bdmf/configure filter entry[ { filter = etype_arp, ports = wan0  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = etype_arp, ports = lan0  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = etype_arp, ports = lan1  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = etype_arp, ports = lan2  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = etype_arp, ports = lan3  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = etype_arp, ports = lan4  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = etype_arp, ports = ssid5  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = etype_arp, ports = wlan0 } ] = { enabled = yes, action = host }

# Filter: EAP over LAN
bs /bdmf/configure filter etype_udef[ 0 ] = 0x888E
bs /bdmf/configure filter entry[ { filter = etype_udef_0, ports = wlan0 } ] = { enabled = yes, action = host }

# Filter: Broadcast
bs /bdmf/configure filter entry[ { filter = bcast, ports = lan0  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = bcast, ports = lan1  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = bcast, ports = lan2  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = bcast, ports = lan3  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = bcast, ports = lan4  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = bcast, ports = ssid5  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = bcast, ports = wlan0 } ] = { enabled = yes, action = host }

# Filter: IP Fragmented packets
bs /bdmf/configure filter entry[ { filter = ip_frag, ports = wan0  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = ip_frag, ports = lan0  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = ip_frag, ports = lan1  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = ip_frag, ports = lan2  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = ip_frag, ports = lan3  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = ip_frag, ports = lan4  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = ip_frag, ports = ssid5  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = ip_frag, ports = wlan0 } ] = { enabled = yes, action = host }

# Filter: IGMP multicast packets (needed for fc=mixed mode)
bs /bdmf/configure filter entry[ { filter = igmp, ports = lan0  } ] = { enabled = yes, action = acl }
bs /bdmf/configure filter entry[ { filter = igmp, ports = lan1  } ] = { enabled = yes, action = acl }
bs /bdmf/configure filter entry[ { filter = igmp, ports = lan2  } ] = { enabled = yes, action = acl }
bs /bdmf/configure filter entry[ { filter = igmp, ports = lan3  } ] = { enabled = yes, action = acl }
# MSTC add lan4 for QTN 5G
bs /bdmf/configure filter entry[ { filter = igmp, ports = lan4  } ] = { enabled = yes, action = acl }
# End MSTC lan4 for QTN 5G
bs /bdmf/configure filter entry[ { filter = igmp, ports = ssid5  } ] = { enabled = yes, action = host }
bs /bdmf/configure filter entry[ { filter = igmp, ports = wlan0 } ] = { enabled = yes, action = acl }

# MSTC add mcast for WAN multicast packets
bs /bdmf/configure filter entry[ { filter = mcast, ports = wan0 } ] = { enabled = yes, action = host }

echo "rdpa filter init end"
