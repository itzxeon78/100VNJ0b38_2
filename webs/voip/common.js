function showtab(){
			var string = document.getElementById("advanced").style.display;
			if (string == ""){
			document.getElementById("advanced").style.display = "none";
			document.getElementById("showWord").value = "Advanced";
			}else if (string =="none"){
			document.getElementById("advanced").style.display = "";
			document.getElementById("showWord").value = "Basic";
			}
}

function doShowMsg(msgType, msg)
{
	var msgDoc = parent.msgFrame.document;
	var okMsgArea = msgDoc.getElementById("okMsg");
	var errMsgArea = msgDoc.getElementById("errMsg");
	switch(msgType) {
		case 0:	/* Normal Message */
			/* Clear error message area */
			errMsgArea.innerHTML="";
			okMsgArea.innerHTML=msg;
			break;
		case 1: /* Error Message */
			errMsgArea.innerHTML=msg;
			okMsgArea.innerHTML="";
			break;
		case 2:
		default:
			errMsgArea.innerHTML="";
			okMsgArea.innerHTML="";
			break;		
	}
	return;
}
function showErrMsg(msg)
{
	doShowMsg(1, msg);
}


function disableItem()
{
	
	var i=0;
	var argument = disableItem.arguments;
	var sourceChcek = document.getElementById(argument[1]).checked;
	var destinationCheck;
	switch(argument[0])
	{
		case 1:
			if(sourceChcek == false)
			{
				for(i=2;i<argument.length;i++)
				{
					document.getElementById(argument[i]).disabled = false;
				}
			}else
			{
				for(i=2;i<argument.length;i++)
				{
					document.getElementById(argument[i]).disabled = true;
				}
			}
		break;
		case 2:
			if(sourceChcek == true)
			{
				for(i=2;i<argument.length;i++)
				{
					document.getElementById(argument[i]).disabled = false;
				}
			}else
			{
				for(i=2;i<argument.length;i++)
				{
					document.getElementById(argument[i]).disabled = true;
				}
			}
		break;
		default:
		break;
	}
}

function rangeCheck(rangeMin,rangeMax,defaultValue,checkItem,recover,alertActive)
{

	
	var checkValue=0;
	var matchValue="";
	var valueRule=/^\d+$/;
	checkValue = checkItem.value;
	matchValue = checkValue.match(valueRule);
	if(matchValue)
	{
		if(checkValue<rangeMin || checkValue>rangeMax)
		{
			
			if(recover==1)
			{
				checkItem.value = defaultValue;
			}
			if(alertActive)
			{
				alert("Value range error");
			}
			return -1;
		}
	}else
	{
		if(recover==1)
		{
			checkItem.value = defaultValue;
			
		}
		if(alertActive)
		{
			alert("Invalid value");
		}
		return -1;
	}
	return 0;
}
function checkGreatThanZero(defaultValue,checkItem,recover,alertActive)
{
	var checkValue=0;
	var checknum=0;
	var matchValue="";
	var valueRule=/^\d+$/;
	checkValue = checkItem.value;
	matchValue = checkValue.match(valueRule);
	if(matchValue)
	{
		if(checkValue<=checknum)
		{
			if(recover==1)
			{
				checkItem.value = defaultValue;
			}
			if(alertActive)
			{
				alert("Value need greater than 0");
			}
			return -1;
		}
	}else
	{
		if(recover==1)
		{
			checkItem.value = defaultValue;
		}
		if(alertActive)
		{
			alert("Invalid value");
		}
		return -1;
	}
	return 0;
}

