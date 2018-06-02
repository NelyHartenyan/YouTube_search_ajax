$(function(){
    $(document).on("keyup",".search",function(){
        searchVideoValue = $('.search').val(),
        requestUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAnHlc-s-9rd8otrmRg-3slvxFp8iUfv3Y&maxResults=15&q="+searchVideoValue+"",
        x = requestUrl;
        showVideos(requestUrl);
        })
        
        
     $(document).on("click","#next",function(){
         requestUrl  = x;
         requestUrl+='&pageToken='+token;
         console.log(requestUrl);
         showVideos(requestUrl);
         
     })
        
        
    function showVideos(requestUrl){
        var imageSize = $('#img-size').val();
        var url = 'https://www.youtube.com/watch?v=';
        $.ajax({            
            type:"get",
            url:requestUrl,        
            success:function showResults(results) {
                token = results.nextPageToken;
                console.log(token);
//				console.log(results.items[0]);
                    var k = "";
         for(var key=0; key<results.items.length;key++){
                        var items = results.items[key];
                        var videoId = items.id.videoId;
                        var pic; /* items.snippet.thumbnails.default.url;*/
             switch(imageSize){
                     
                 case "default": pic=items.snippet.thumbnails.default.url;
                     break;
                 case "medium": pic = items.snippet.thumbnails.medium.url;
                     break;
                   case "high": pic = items.snippet.thumbnails.high.url;
                     break;
                 default: pic=items.snippet.thumbnails.default.url;
                     
                             }
     var title = items.snippet.title;
      k += '<span>'+title+'</span><br>';    
      k += '<a href="https://www.facebook.com/sharer/sharer.php?u='+url+videoId+'src=sdkpreparse"><img src="'+pic+'" >Поделиться</a><br>';
            
          }
            $('.videos').html(k);
            }                  
        })
    }
})










