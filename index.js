
var channelList = ["esl_sc2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
//get reference to the container div for the channel list
let baseUrl = "https://wind-bow.gomix.me/twitch-api/";
let pathStreams = "streams/";
let pathChannels = "channels/"
let curl= "?callback=?";


function getData(){
   for(var i=0; i<channelList.length; i++){
      $.getJSON(baseUrl+pathStreams+channelList[i]+curl, (data) => {
         var channel = {};
        channel.isLive =false;
        if(data.stream !==null){
            channel.isLive = true;
            cName = data.stream.channel._links.self;
            channel.name = cName.slice(cName.lastIndexOf('/')+1);
            channel.url = "https://www.twitch.tv/"+channel.name;
            channel.image_url = data.stream.channel.logo;
            channel.game = data.stream.game;
            channel.current_stream = data.stream.channel.status; 
             displayData(channel);
        }else{
            cName = data._links.self;
            channel.name = cName.slice(cName.lastIndexOf('/')+1);
            offlineChanelData(channel); 
          }
      });      
   }
}

function offlineChanelData(channel){
  offlineChannel = {};
  $.getJSON(baseUrl+pathChannels+channel.name+curl, result=>{
      offlineChannel.image_url = result.logo;
      offlineChannel.name = result.name;
      offlineChannel.url = "https://www.twitch.tv/"+result.name;
      offlineChannel.image_url = result.logo;
      offlineChannel.isLive = false;
      console.log(offlineChannel);
      displayData(offlineChannel);
  }); 
}


function displayData(channel){
  let output = document.querySelector('.channel-list');
  let chanelLayout = '<div class="card col-md-10 mr-auto ml-auto">';
      chanelLayout +=   '<div class="card-header">';
      chanelLayout +=    '<img src='+channel.image_url+' >';
      chanelLayout +=   '</div>';
      chanelLayout +=   '<div class="ml-2 mt-3 channel-name"><a class="channel-link" href="'+channel.url+'" target="_blank"><h2>'+channel.name+'</h2></a></div>';
      if(channel.isLive === true){
         chanelLayout +=   '<div class="live mt-4 ml-2"></div>';
         chanelLayout +=   '<div class="content"><div class="game mt-3 ml-4"><p>'+channel.game+':</p></div>';
         chanelLayout +=   '&nbsp;<div class="stream">'+channel.current_stream+'</div></div>'
      }else if(channel.isLive === false){
           chanelLayout +=   '<div class="dead mt-3 ml-2"></div>';
      }
      chanelLayout += '</div>';   
      output.innerHTML += chanelLayout;
}



// Handle button click for online and offline channels

let buttons = document.querySelectorAll('.btn-channel');

    Array.prototype.slice.call(buttons).forEach( e=>{ 
          e.addEventListener('click',function(){
             let offline = document.querySelectorAll('.dead');
             let online = document.querySelectorAll('.live');
           console.log(this.dataset.online);
           if(this.dataset.online === "online"){
                Array.prototype.slice.call(offline).forEach(e=>e.parentNode.style.display= "none");
                Array.prototype.slice.call(online).forEach(e=>e.parentNode.style.display= "flex")
           }else if(this.dataset.online === "offline"){
               Array.prototype.slice.call(offline).forEach(e=>e.parentNode.style.display= "flex");
              Array.prototype.slice.call(online).forEach(e=>e.parentNode.style.display= "none")
           }else if(this.dataset.online === "all"){
              Array.prototype.slice.call(offline).forEach(e=>e.parentNode.style.display= "flex");
              Array.prototype.slice.call(online).forEach(e=>e.parentNode.style.display= "flex")
           }
        })
    });


getData();