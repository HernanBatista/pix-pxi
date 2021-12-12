(function (w, d) {
    var iframes = [], genericIds = 0;

    function responsiveIframe(element)
    {
        var originalWidth = element.dataset.youtubeWidth || element.clientWidth;
        var originalHeight = element.dataset.youtubeHeight || element.clientHeight;

        element.dataset.youtubeWidth = originalWidth;
        element.dataset.youtubeHeight = originalHeight;

        element.width = "100%";

        if (originalWidth != originalHeight) {
            element.height = element.clientWidth / (originalWidth / originalHeight);
        } else {
            element.height = element.clientWidth;
        }
    }

    function putPlayer(youtubeId, elementId)
    {
        var player = new YT.Player(elementId, {
            videoId: youtubeId,
            events: {
                onReady: function() {
                    var el = d.getElementById(elementId);
                    responsiveIframe(el);
                    iframes.push(el);
                }
            },
			autoplay: 1
        });
    }

    w.onYouTubeIframeAPIReady = function ()
    {
        //Busca todos elementos com o atributo data-youtube (tem que ter "id")
        var els = d.querySelectorAll("[data-youtube]");

        for (var i = 0, j = els.length; i < j; i++) {
            var el = els[i];

            if (!el.id) {
                genericIds++; //Incrementa para usar nos elementos sem ID
                el.id = "youtube-responsive-" + genericIds;
            }

            putPlayer(el.dataset.youtube, el.id);
        }

        w.addEventListener("resize", function() {
            if (iframes.length) {
                for (var i = 0, j = iframes.length; i < j; i++) {
                    responsiveIframe(iframes[i]);
                }
            }
        });
    };

    //Injeta a API do Youtube
    var tag = d.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = d.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})(window, document);