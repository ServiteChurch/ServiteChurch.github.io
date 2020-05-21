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

$(function(){
  document.getElementById("content").style.display = "none";
  $("#main").load("../common/main.htm", function() {
    $('#placedContent').append($("#content"));
    document.getElementById("placedContent").style.display = "block";
    document.getElementById("content").style.display = "block";
  }); 
});

