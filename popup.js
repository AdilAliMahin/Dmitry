function getComments(weburl,startCommnetNo,count){

	var url = "api/comments.json?";
	url = url +"url=" +weburl;
	url = url +"&startCommnetNo"+startCommnetNo;
	url = url + "&count"+count;

	 $.ajax({
        url: url,
        type: "GET",
        dataType: "text json",
        success: function(json) {
            console.log('in success')
            populateComments(json);

        },
       error: function(e){
       	console.log(e);

       }
    });
}

function populateComments(data){
	console.log(data);
}

function clickHandler(e) {
}


function main() {
  // Initialization work goes here.
   getComments('abc.com',0,8);
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#btnPostComment').addEventListener('click', clickHandler);
  main();
});
