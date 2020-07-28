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

ContentManager = function(contentURL, isJson)
{
    function _notifyHandlers(data)
    {
        console.log('notifying ' + _loadedHandler.length + ' handlers ' + data);
        _content = data;
        for (i=0; i<_loadedHandler.length; i++) {
        // $.each(_loadedHandler, function(handler) {
           // console.log(handler);
            _loadedHandler[i](data);  
		}
	}

    function _jsonReviver(key, value)
    {
        if (key.toLowerCase().search('date') >= 0)
        {
            return new Date(value);  
		}
        else
        {
            return value;  
		}
	}

    var _loadedHandler = [];
    var _content;
    if (isJson)
    {
        console.log('calling getjson');
        $.ajax({url:contentURL, datatype:"json", cache:false, success:function(data) { 
            result = JSON.parse(data, _jsonReviver);
            _notifyHandlers(result);
            }});
        // $.getJSON(contentURL,  _notifyHandlers);
    }
    else
    {
        $.ajax({url:contentURL, cache:false, success:_notifyHandlers});
	}

    this.Listen = function(listeningFunc)
    {
        if (_content)
        {
            console.log('content available already. value ' + _content);
            listeningFunc(_content);  
		}
        else
        {
            console.log('content not available. adding to list' + listeningFunc);
            _loadedHandler.push(listeningFunc);  
		}
	}
}

// var MonthLookup = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

function FormatDate(date)
{
    var dom = date.getDate();
    // var dom = date.toLocaleString('default', { day: '2-digit' });
    var domlastDigit = dom % 10;
    var domSuffix = domlastDigit == 1 ? "st" : (domlastDigit == 2 ? "nd" : (domlastDigit == 3 ? "rd" : "th"));
    var month = date.toLocaleString('default', { month: 'long' });
    return dom + domSuffix + " " +  month + " " + date.getFullYear();
}


function showmarkdown(contentData, divelement)
{
    var converter = new showdown.Converter(); 
    html = converter.makeHtml(contentData);
    document.getElementById(divelement).innerHTML = html;
}

function loadmarkdown(contenturl, divelement)
{
    
    $.get(contenturl, function(response) {
         // alert(response);
         showmarkdown(reponse, divelement);
    }); 
}

function loadJsonFile(jsonURL)
{
    // var json = $.getJSON({url:jsonURL, async:false});
    var json = $.ajax({dataType: "jsonp", url:jsonURL, async:false});
  
    console.log(json.responseText);
    var data = eval("(" +json.responseText + ")");
    return data;
}

var headline = new ContentManager('../content/headline.md', false);
var newsletters = new ContentManager('../documents/newsletters/contentlist.txt', true);

function loadmainContent()
{
    headline.Listen(function(data){
         console.log('maincontent got data' + data);
         showmarkdown(data, 'banner');
	});

    newsletters.Listen(function(data){
        console.log('got JSON data' + data);
        var latestHtml = document.getElementById('latestNewsletter').innerHTML;
        latestHtml = latestHtml.replace('%LATEST%', data[0].newsFileName);
        document.getElementById('latestNewsletter').innerHTML = latestHtml;
	});
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

   loadmainContent();

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
