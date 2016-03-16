

// variable to hold all the text from the page
var allText;
// Global variable to hold the domain name user wants
var domain;
// This callback function is called when the content script has been 
// injected and returned its results
function onPageInfo(o)  { 
    
    allText = o.summary;
    document.getElementById('summary').innerText = allText; 
}

//function to find email addresses from a string 
function findEmailAddresses(StrObj) {
		StrObj = StrObj.toLowerCase();
		var separateEmailsBy = "\n";
		var email = "<none>"; // if no match, use this
		var emailsArray = StrObj.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
		var e = ArrNoDupe(emailsArray);
		emailsArray = e;
		
		/*
			for (var i = 0; i < emailsArray.length; i++)
			{
				if(emailsArray[i].contains(domain))
				{
					
				}
				else
				{
					emailsArray.splice(i,1);
				}
			}
		*/
		//to remove all the trailing dots form an email string
		for (var i=0;i<emailsArray.length;i++)
		{ 
			while (emailsArray[i][emailsArray[i].length-1] === ".")
    				emailsArray[i] = emailsArray[i].slice(0,-1);

			
		}
		//to remove all the leading dots form an email string
		for (var i=0;i<emailsArray.length;i++)
		{ 
			while (emailsArray[i][emailsArray[i].length-1] === ".")
    				emailsArray[i] = emailsArray[i].substring(1, str.length - 1);

			
		}
		//logic to get all the emails of a particular domain
		for (var i=0;i<emailsArray.length;i++)
		{ 
			
			if(emailsArray[i].indexOf(domain)===-1)
			{
				emailsArray.splice(i,1);
				i=i-1;
			}
		}
		//to remove the duplicates
		e = ArrNoDupe(emailsArray);
		emailsArray = e;
		if (emailsArray) {
			email = "";
			for (var i = 0; i < emailsArray.length; i++) {
				if (i != 0) email += separateEmailsBy;
				email += emailsArray[i];
			}
		}
		
		var copyDiv = document.createElement('div');
                copyDiv.contentEditable = true;
                document.body.appendChild(copyDiv);
                copyDiv.innerHTML = email;
                copyDiv.unselectable = "off";
                copyDiv.focus();
                document.execCommand('SelectAll');
                document.execCommand("Copy", false, null);
                document.body.removeChild(copyDiv);
		
		return email;
}

function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addBookmark() {
    // Cancel the form submit
    event.preventDefault();
    
    // below line gets the text written in the domain text box of popup.html
    // it has been checked and it is working fine
    domain = encodeURIComponent(document.getElementById('domain').value);

    //here the code should use the allText variable and make email addresses from that
    var emails = findEmailAddresses(allText);
    

    //show the user all the emails
    document.getElementById('summary').innerText = emails;

   //set the status that it has been copied to clipboard
   statusDisplay.innerHTML = 'Copied to clipboard';
    
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Call the getPageInfo function in the background page, injecting content_script.js 
    // into the current HTML page and passing in our onPageInfo function as the callback
    chrome.extension.getBackgroundPage().getPageInfo(onPageInfo);
});
