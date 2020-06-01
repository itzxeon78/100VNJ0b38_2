var count = 0;
var firstErrorItem="",firstVoipErrorMsg="",showVoipMsg="";
var hasErrorInBasic=false;
var hasErrorInAdvance = false;
var errorCount=0;
var recoverPortStart ="";
var recoverPortEnd = "";
var spainsetting = '<%ejGetVoice(spainSetting)%>';

function addErrorMsg(msg)
{
	if(showVoipMsg=="")
	{
		firstVoipErrorMsg=msg;
	}
	showVoipMsg+=(++errorCount);
	showVoipMsg+=". ";
	showVoipMsg+=msg;
}
function resetGlobleValue()
{
	firstVoipErrorMsg="";
	firstErrorItem="";
	showVoipMsg="";
	hasErrorInBasic=false;
	hasErrorInAdvance = false;
	errorCount=0;
}
function setFirstErrorEmptyItem(itemName,location)
{
	if(((!hasErrorInBasic) || (!hasErrorInAdvance)) && (firstErrorItem==""))
	{
		firstErrorItem=itemName;
	}
	if(location == "basic")
	{
		hasErrorInBasic=true;
	}else
	{	
		hasErrorInAdvance=true;
	}
}
function emptyAndRuleCheck(itemName)
{
	valueResoult = document.getElementById(itemName).value;
	if(valueResoult=="")
	{
		return 1;
	}else if(valueResoult=="ChangeMe")
	{
		return 2;
	}else
	{
		return 0;
	}
}
function emptyCheck()
{
	var valueResoult="";
	var emptyCount=0,index=0;
	checkResult=emptyAndRuleCheck("localPort");
	if(checkResult==1)
	{
		addErrorMsg("[sip Local Port] is Empty\n");
		setFirstErrorEmptyItem("localPort","basic");
	}
	checkResult = emptyAndRuleCheck("proxyAddr");
	if(checkResult==1)
	{
		addErrorMsg("[Sip Server Address] is Empty\n");
		setFirstErrorEmptyItem("proxyAddr","basic");
	}else if(checkResult==2)
	{
		addErrorMsg("Please change value for [SIP Server Address] \n");
		setFirstErrorEmptyItem("proxyAddr","basic");
	}
	checkResult = emptyAndRuleCheck("proxyPort");
	if(checkResult==1)
	{
		addErrorMsg("[Sip Server Port] is Empty\n");
		setFirstErrorEmptyItem("proxyPort","basic");
	}
	checkResult = emptyAndRuleCheck("regAddr");
	if(checkResult==1)
	{
		addErrorMsg("[Register Server Address] is Empty\n");
		setFirstErrorEmptyItem("regAddr","basic");
	}else if(checkResult==2)
	{
		addErrorMsg("Please change value for [Register Server Address] \n");
		setFirstErrorEmptyItem("regAddr","basic");
	}
	checkResult = emptyAndRuleCheck("regPort");
	if(checkResult==1)
	{
		addErrorMsg("[Register Server Port] is Empty\n");
		setFirstErrorEmptyItem("regPort","basic");
	}else if(checkResult==2)
	{
		addErrorMsg("Please change value for [Register Server Port] \n");
		setFirstErrorEmptyItem("regPort","basic");
	}
	
	checkResult = emptyAndRuleCheck("domainName");
	if(checkResult==1)
	{
		addErrorMsg("[SIP Service Domain] is Empty\n");
		setFirstErrorEmptyItem("domainName","basic");
	}else if(checkResult==2)
	{
		addErrorMsg("Please change value for [SIP Service Domain] \n");
		setFirstErrorEmptyItem("domainName","basic");
	}
	
	if(showVoipMsg!="")
	{
		return -1;
	}
	else
	{
		return 0;
	}
}
function rtpRangeCheckSrart(rangeMin,rangeMax,defaultValue,itemName)
{
	var startValue=0,isOddPort=0;
	startValue = document.getElementById(itemName).value;	
	if(rangeCheck(rangeMin,rangeMax,defaultValue,document.getElementById(itemName),0,0) == -1)
	{
		addErrorMsg("RTP Port Range : [Start Port] is invalid\n");
		setFirstErrorEmptyItem(itemName,"advance");
		return -1;
	}

	isOddPort = parseInt(startValue)%2;
	if(isOddPort!=0)
	{
		addErrorMsg("RTP Port Range : [Start Port]  shall be configured as even port .\n");
		setFirstErrorEmptyItem(itemName,"advance");		
		return -1;
	}		
	return 0;
}
function rtpRangeCheckEnd(rangeMin,rangeMax,defaultValue,startItem,endItem)
{
	var checkValue=0,startValue=0,rangeValue=0,isOddPort=0;
	var matchValue="";
	var valueRule=/^\d+$/;
	checkValue = document.getElementById(endItem).value;
	startValue = document.getElementById(startItem).value;
	//matchValue=checkValue.match(valueRule);

	if(rangeCheck(rangeMin,rangeMax,defaultValue,document.getElementById(endItem),0,0) != -1)
	{		
		if(parseInt(checkValue) < parseInt(startValue))
		{							  
				addErrorMsg("RTP Port Range : [Start Port] shall be less than [End Port]\n");
				setFirstErrorEmptyItem(endItem,"advance");				
				return -1;
		}
		
		isOddPort = parseInt(checkValue)%2;
		if(isOddPort!=0)
		{
			addErrorMsg("RTP Port Range : [End Port]  shall be configured as even port.\n");
			setFirstErrorEmptyItem(endItem,"advance");		
			return -1;
		}		
		rangeValue = parseInt(checkValue) - parseInt(startValue);
		if(rangeValue < 6)
		{
			addErrorMsg("RTP Port Range : Port range shall be greater than 6 \n");
			setFirstErrorEmptyItem(endItem,"advance");				
			return -1;
		}		
	}
	else
	{
		addErrorMsg("RTP Port Range : [End Port]  is invalid\n");		
		setFirstErrorEmptyItem(endItem,"advance");
		return -1;
	}
	return 0;
}
function formCheck()
{

	var formCheckResult=0,rtpCheckEndResult=0,formCheckResult=0;
	var inviteExpire = document.getElementById("inviteExpTmr").value;
	var minSE = document.getElementById("minSE").value;
	formCheckResult = emptyCheck();
	rtpCheckStartResult = rtpRangeCheckSrart(1026,65494,50000,"rtpPortMin");
	rtpCheckEndResult= rtpRangeCheckEnd(1032,65500,65500,"rtpPortMin","rtpPortMax");
	
	
	if((formCheckResult!=-1) && (rtpCheckStartResult!=-1) && (rtpCheckEndResult!=-1)){
		if(rangeCheck(1025,65535,5060,document.getElementById("localPort"),1,0) == -1){
			alert("SIP Local Port range error\n");
			return false;
		}
		if(rangeCheck(1025,65535,5060,document.getElementById("proxyPort"),1,0) == -1){
			alert("SIP Server Port range error\n");
			return false;
		}
		if(rangeCheck(1025,65535,5060,document.getElementById("regPort"),1,0) == -1){
			alert("REGISTER Server Port range error\n");
			return false;
		}
		if(rangeCheck(0,63,0,document.getElementById("tosByteSip"),1,0) == -1){
			alert("SIP DSCP Mark setting error\n");
			return false;
		}
		if(rangeCheck(0,63,0,document.getElementById("tosByteRtp"),1,0) == -1){
			alert("RTP DSCP Mark setting error\n");
			return false;
		}		
		if(rangeCheck(91,3600,180,document.getElementById("inviteExpTmr"),1,0) == -1){
			alert("Session Expires setting error\n");
			return false;
		}		
		if(rangeCheck(90,1800,120,document.getElementById("minSE"),1,0) == -1){
			alert("Min-SE setting error\n");
			return false;
		}	
		if(parseInt(inviteExpire) < parseInt(minSE)){
			alert("Session Expires value cannot be smaller than Min-SE value\n");
			return false;
		}	
		
		var phcfgarray = new Array();
		if(spainsetting !='1'){		
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("callReturn"),'Call Return')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("oneShotCallidDisplay"),'One Shot Caller Display Call')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("oneShotCallerHiddenCall"),'One Shot Caller Hidden Call')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("CallWaitingEnable"),'Call Waiting Enable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("CallWaitingDisable"),'Call Waiting Disable')){
				return false;
			}
			/*
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("IVR"),'IVR')){
				return false;
			}
			*/
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("InternalCall"),'Internal Call')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("CallTransfer"),'Call Transfer')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("unCallForwardEnable"),'Unconditional Call Forward Enable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("unCallForwardDisable"),'Unconditional Call Forward Disable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("noCallForwardEnable"),'No Answer Call Forward Enable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("noCallForwardDisable"),'No Answer Call Forward Disable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("BusyCallForwardEnable"),'Call Forward When Busy Enable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("BusyCallForwardDisable"),'Call Forward When Busy Disable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("oneShotCallWaitingEnable"),'One Shot Call Waiting Enable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("oneShotCallWaitingDisable"),'One Shot Call Waiting Disable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("dndenable"),'Do Not Disturb Enable')){
				return false;
			}
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("dnddisable"),'Do Not Disturb Disable')){
				return false;
			}

	/*Mask CCBS setting on GUI, because its function not ready now, KeyYang@MSTC 20120830*/	
	/*
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("ccbsDeactive"),'Call Completion on Busy Subscriber - CCBS Deactivate')){
				return false;
			}
	*/
			if(!checkPhoneConfigKey(phcfgarray, document.getElementById("outgoingSip"),'Outgoing SIP')){
				return false;
			}		
		}		
		return true;
		//document.getElementById("SipServerForm").submit();
	}else
	{
		if(hasErrorInAdvance)
		{
			document.getElementById("advanced").style.display = "";
			document.getElementById("showWord").innerHTML = "Basic...";
		}
		if(firstErrorItem!=""||hasErrorInBasic==true)
		{
			if(document.getElementById(firstErrorItem).disabled != true)
			{
				document.getElementById(firstErrorItem).focus();
			}
			//showErrMsg(firstVoipErrorMsg);
			
			alert(showVoipMsg);
			resetGlobleValue();
			return false;

		}
	}
	resetGlobleValue();
	return true;
}
