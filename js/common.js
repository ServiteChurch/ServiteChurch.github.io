function expand(s)
{
    var td = s;
    var d = td.getElementsByTagName("div").item(0);

    td.className = "menuHover";
    d.className = "menuHover";
}

function collapse(s)
{
    var td = s;
    var d = td.getElementsByTagName("div").item(0);

    td.className = "menuNormal";
    d.className = "menuNormal";
}

// initial function called when document loaded to load in common banner, menu etc
$(function(){
  var content = document.getElementById("content");
  if(typeof(content) == 'undefined' || content == null){
     return false;
   }

   var main = document.getElementById("main");
   if(typeof(main) == 'undefined' || main == null){
     return false;
   }

  content.style.display = "none";
  $("#main").load("../common/main.htm", function() {
    var placedContent = document.getElementById("placedContent");
    if(typeof(placedContent) == 'undefined' || placedContent == null){
     content.style.display = "block";
     return false;
   }

    $('#placedContent').append($("#content"));
    placedContent.style.display = "block";
    content.style.display = "block";
  }); 
});

function SetupSlideshow()
{   
    $(window).load(function() {
    $('#slider').nivoSlider({ controlNavThumbs: true });
    });

    $("#content").on('click', 'a.playpause', function(){
        var vars = $('#slider').data('nivo:vars');
        vars.stop = !vars.stop;
        position = vars.stop ? "0" : "-20px 0";
        document.getElementById("playpause").style.backgroundPosition = position;
    });
}
