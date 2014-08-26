
var apiKey = "kp53fa75ed3a75b2.22772296";

function onRandomData(dataURL, maxItem, callback) {
  $.getJSON(dataURL, function(dataJSON) {
    callback(dataJSON);
  });

}

function showRandomAlbums(anchorID, maxItem) {
  var albumDataURL = "http://api.kptaipei.tw/v1/albums/?accessToken=" + apiKey;

  onRandomData(albumDataURL, maxItem, function (dataJSON) {
    var randomAlbums = parseData(dataJSON, maxItem);
    var htmlCode = "";
    for (var i = 0; i < randomAlbums.length; i++) {
      var album = randomAlbums[i];
      htmlCode += '<div class="column">';
      htmlCode += '  <a class="thumbLink" href="' + album.link + '">';
      htmlCode += '    <img class="ui rounded image thumbImage" src="'+ album.thumbnails["large"] + '"/></a>';
      htmlCode += '</div>';
    }
    $(anchorID).html(htmlCode);
  });
}

function showRandomSongs() {
  var maxItem = 3;
  var songDataURL = "http://api.kptaipei.tw/v1/musics/1?accessToken=" + apiKey;

  onRandomData(songDataURL, maxItem, function (dataJSON) {
    var randomSongs = parseData(dataJSON, maxItem);
    for (var i = 0; i < randomSongs.length; i++) {
      console.log(randomSongs[i]);
      var songID = randomSongs[i].soundcloudID;
      var songURL = "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/kptaipei/" + songID + "&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false";
      $('#song' + i).attr('src', songURL);
    }
  });
}

function showRandomPolicy() {
  var maxItem = 4;
  var policyDataURL = "http://api.kptaipei.tw/v1/musics http://api.kptaipei.tw/v1/category/40?accessToken=" + apiKey;
  onRandomData(policyDataURL, maxItem, function (dataJSON) {
    var randomPolicy = parseData(dataJSON, maxItem);
    for (var i = 0; i < randomPolicy.length; i++) {
      console.log(randomPolicy[i]);
      var title = randomPolicy[i].title;
      var content = randomPolicy[i].plain_content.replace("\n", "<br/>");
      $('#policyTitle' + i).html(title);
      $('#policy' + i).html(content);
    }
  });
}


function getRandom(data, maxItem) {

  //+ Jonas Raoni Soares Silva
  //@ http://jsfromhell.com/array/shuffle [v1.0]
  function shuffle (o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  var limitedData = [];
  var randomData = shuffle(data);
  var limit = maxItem < randomData.length ? maxItem : randomData.length;

  for (var i = 0; i < limit; i++) {
    limitedData.push(randomData[i]);
  }
  return limitedData;
}

function parseData(json, maxItem) {
  var data = [];
  for (var i = 0; i < songJSON.data.length; i++) {
    data.push(songJSON.data[i]);
  }

  return getRandom(data, maxItem);
}
