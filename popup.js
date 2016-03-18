function getComments(weburl,startCommnetNo,count){

	var url = "http://khasol.com/comments.json?";
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

  $(document).ready(function() {
    $.each(data, function( index, obj ) {
      $.each(obj, function( index1, obj1 ) {
        console.log(obj1.comment);
        $('#result').append( "<div class='user-data'>"
         +"<div class='user-img'>"
          +"<a href='"+obj1.url+"'><img src='user-img.png' alt='image not found'></a>"
         +"</div>"
        
         +"<div class='user-comment-here'>"
          +"<a href='"+obj1.url+"'><p class='user-name'>"+obj1.user+"</p></a>"
          +"<p>"+obj1.comment+"</p>"
         +"</div>"
        
         +"<div class='comment-time'>"
          +"<p>1 min</p>"
         +"</div>"
       +" </div>"
         
      +" <div class='clr'></div>" );
      });

    });
  });

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
