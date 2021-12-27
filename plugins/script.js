$(function(){
  
  var timeoutTimer = null;
  var intervalTimer = null;
  var $win = $(window);
  
  var disable = document.getElementById( 'disable' );

  var tooltip = $('.space-invader');
  
  var invader = $('#space-invader');
  var size = parseFloat(invader.css('font-size'));
  
  // Sound to be played
  var effect = []; for (var i=0; i<5000; i++) effect[i] = 160+Math.round(12*(Math.sin(i*i/16000)));
  effect.reverse();
  var shoot = new RIFFWAVE();
  shoot.header.sampleRate = 22000;
  shoot.Make(effect);
  //
  
  var laserSound = function(){
    var sound =  new Audio(shoot.dataURI);
    sound.play();
  };

  var shootLaser = function(){
    var laser = $('<div class="space-laser"/>');
    
    var pos = invader.position();
    var top = pos.top + parseInt( invader.css('margin-top') ) + (size * 8);
    var left = pos.left;

    var hov = $('#hov');
    var bt1 = $('#bt1');
    var hv = document.querySelector("#hov")
    hvmin = hv.getBoundingClientRect().left
    hvmax = hvmin+hv.getBoundingClientRect().width

    var hov2 = $('#hov2');
    var bt2 = $('#bt2');
    var hv2 = document.querySelector("#hov2")
    hvmin2 = hv2.getBoundingClientRect().left
    hvmax2 = hvmin2+hv2.getBoundingClientRect().width

    var hov3 = $('#hov3');
    var bt3 = $('#bt3');
    var hv3 = document.querySelector("#hov3")
    hvmin3 = hv3.getBoundingClientRect().left
    hvmax3 = hvmin3+hv3.getBoundingClientRect().width

    var hov4 = $('#hov4');
    var bt4 = $('#bt4');
    var hv4 = document.querySelector("#hov4")
    hvmin4 = hv4.getBoundingClientRect().left
    hvmax4 = hvmin4+hv4.getBoundingClientRect().width

    var hov5 = $('#hov5');
    var bt5 = $('#bt5');
    var hv5 = document.querySelector("#hov5")
    hvmin5 = hv5.getBoundingClientRect().left
    hvmax5 = hvmin5+hv5.getBoundingClientRect().width

    if(left > hvmin-50 && left < hvmax-50){
      laser
      .css({
        top: top + 'px',
        left: 48 +left + 'px'
      })
      .appendTo( 'body' )
      .velocity({
        top: '110px'
      }, function(){
        laser.remove();
      });

      var cont = 0;
      var lang = document.childNodes[0].nextSibling.lang
      hov.click(function(){
        if(cont == 1){
          if (lang == "en"){
            window.location.href = 'index.html';
          }else if(lang == "pt-br"){
            window.location.href = 'en.html';
          }
        }
        cont = 1;
        $("#bbt").show(500);
        bt1.addClass('wht');
        setTimeout(function(){bt1.removeClass('wht');}, 4000);
        setTimeout(function(){ $("#bbt").fadeOut();cont = 0;}, 6000);
      })

    }else if(left > hvmin2-50 && left < hvmax2-50){
      laser
      .css({
        top: top + 'px',
        left: 48 +left + 'px'
      })
      .appendTo( 'body' )
      .velocity({
        top: '110px'
      }, function(){
        laser.remove();
      });

      hov2.click(function(){
        bt2.addClass('wht')
        setTimeout(function(){bt2.click();}, 1700);
        setTimeout(function(){bt2.removeClass('wht');}, 2000);
      })
    }else if(left > hvmin3-50 && left < hvmax3-50){
      laser
      .css({
        top: top + 'px',
        left: 48 +left + 'px'
      })
      .appendTo( 'body' )
      .velocity({
        top: '110px'
      }, function(){
        laser.remove();
      });

      hov3.click(function(){
        bt3.addClass('wht')
        setTimeout(function(){bt3.click();}, 1700);
        setTimeout(function(){bt3.removeClass('wht');}, 2000);
      })
    }else if(left > hvmin4-50 && left < hvmax4-50){
      laser
      .css({
        top: top + 'px',
        left: 48 +left + 'px'
      })
      .appendTo( 'body' )
      .velocity({
        top: '110px'
      }, function(){
        laser.remove();
      });

      hov4.click(function(){
        bt4.addClass('wht')
        setTimeout(function(){bt4.click();}, 1700);
        setTimeout(function(){bt4.removeClass('wht');}, 2000);
      })
    }else if(left > hvmin5-50 && left < hvmax5-50){
      laser
      .css({
        top: top + 'px',
        left: 48 +left + 'px'
      })
      .appendTo( 'body' )
      .velocity({
        top: '110px'
      }, function(){
        laser.remove();
      });

      hov5.click(function(){
        bt5.addClass('wht')
        setTimeout(function(){
          window.location.href = 'https://wingsgame.netlify.app';
        }, 1000);
        setTimeout(function(){bt5.removeClass('wht');}, 2000);
      })
    }else{
      laser
      .css({
        top: top + 'px',
        left: 48 +left + 'px'
      })
      .appendTo( 'body' )
      .velocity({
        top: '20px'
      }, function(){
        laser.remove();
      });
    }
    
    if( !disable.checked ){
      laserSound();
    }

  };
  
  $(document)
  .on( 'mousemove' , function( e ){
    invader
    .css({
      'top': e.clientY + 'px',
      'left': -50+ e.clientX + 'px'
    });
  })
  .on( 'mousedown' , function( e ){
    shootLaser( e );
    tooltip.fadeOut();


  })
  .on( 'mouseup' , function(){
    if (timeoutTimer !== null) {
      clearTimeout( timeoutTimer );
    }
    
    if (intervalTimer !== null) {
      clearTimeout( intervalTimer );
      intervalTimer = null;
    }
  });
});









(function (window, document, undefined) {
/* 
 * RIFFWAVE.js v0.03 - Audio encoder for HTML5 <audio> elements.
 * Copyleft 2011 by Pedro Ladaria <pedro.ladaria at Gmail dot com>
 *
 * Public Domain
 *
 * Changelog:
 *
 * 0.01 - First release
 * 0.02 - New faster base64 encoding
 * 0.03 - Support for 16bit samples
 *
 * Notes:
 *
 * 8 bit data is unsigned: 0..255
 * 16 bit data is signed: âˆ’32,768..32,767
 *
 */

var FastBase64 = {

    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encLookup: [],

    Init: function() {
        for (var i=0; i<4096; i++) {
            this.encLookup[i] = this.chars[i >> 6] + this.chars[i & 0x3F];
        }
    },

    Encode: function(src) {
        var len = src.length;
        var dst = '';
        var i = 0;
        while (len > 2) {
            n = (src[i] << 16) | (src[i+1]<<8) | src[i+2];
            dst+= this.encLookup[n >> 12] + this.encLookup[n & 0xFFF];
            len-= 3;
            i+= 3;
        }
        if (len > 0) {
            var n1= (src[i] & 0xFC) >> 2;
            var n2= (src[i] & 0x03) << 4;
            if (len > 1) n2 |= (src[++i] & 0xF0) >> 4;
            dst+= this.chars[n1];
            dst+= this.chars[n2];
            if (len == 2) {
                var n3= (src[i++] & 0x0F) << 2;
                n3 |= (src[i] & 0xC0) >> 6;
                dst+= this.chars[n3];
            }
            if (len == 1) dst+= '=';
            dst+= '=';
        }
        return dst;
    } // end Encode

}

FastBase64.Init();

var RIFFWAVE = function(data) {

    this.data = [];        // Array containing audio samples
    this.wav = [];         // Array containing the generated wave file
    this.dataURI = '';     // http://en.wikipedia.org/wiki/Data_URI_scheme

    this.header = {                         // OFFS SIZE NOTES
        chunkId      : [0x52,0x49,0x46,0x46], // 0    4    "RIFF" = 0x52494646
        chunkSize    : 0,                     // 4    4    36+SubChunk2Size = 4+(8+SubChunk1Size)+(8+SubChunk2Size)
        format       : [0x57,0x41,0x56,0x45], // 8    4    "WAVE" = 0x57415645
        subChunk1Id  : [0x66,0x6d,0x74,0x20], // 12   4    "fmt " = 0x666d7420
        subChunk1Size: 16,                    // 16   4    16 for PCM
        audioFormat  : 1,                     // 20   2    PCM = 1
        numChannels  : 1,                     // 22   2    Mono = 1, Stereo = 2...
        sampleRate   : 8000,                  // 24   4    8000, 44100...
        byteRate     : 0,                     // 28   4    SampleRate*NumChannels*BitsPerSample/8
        blockAlign   : 0,                     // 32   2    NumChannels*BitsPerSample/8
        bitsPerSample: 8,                     // 34   2    8 bits = 8, 16 bits = 16
        subChunk2Id  : [0x64,0x61,0x74,0x61], // 36   4    "data" = 0x64617461
        subChunk2Size: 0                      // 40   4    data size = NumSamples*NumChannels*BitsPerSample/8
    };

    function u32ToArray(i) {
        return [i&0xFF, (i>>8)&0xFF, (i>>16)&0xFF, (i>>24)&0xFF];
    }

    function u16ToArray(i) {
        return [i&0xFF, (i>>8)&0xFF];
    }

    function split16bitArray(data) {
        var r = [];
        var j = 0;
        var len = data.length;
        for (var i=0; i<len; i++) {
            r[j++] = data[i] & 0xFF;
            r[j++] = (data[i]>>8) & 0xFF;
        }
        return r;
    }

    this.Make = function(data) {
        if (data instanceof Array) this.data = data;
        this.header.blockAlign = (this.header.numChannels * this.header.bitsPerSample) >> 3;
        this.header.byteRate = this.header.blockAlign * this.sampleRate;
        this.header.subChunk2Size = this.data.length * (this.header.bitsPerSample >> 3);
        this.header.chunkSize = 36 + this.header.subChunk2Size;

        this.wav = this.header.chunkId.concat(
            u32ToArray(this.header.chunkSize),
            this.header.format,
            this.header.subChunk1Id,
            u32ToArray(this.header.subChunk1Size),
            u16ToArray(this.header.audioFormat),
            u16ToArray(this.header.numChannels),
            u32ToArray(this.header.sampleRate),
            u32ToArray(this.header.byteRate),
            u16ToArray(this.header.blockAlign),
            u16ToArray(this.header.bitsPerSample),    
            this.header.subChunk2Id,
            u32ToArray(this.header.subChunk2Size),
            (this.header.bitsPerSample == 16) ? split16bitArray(this.data) : this.data
        );
        this.dataURI = 'data:audio/wav;base64,'+FastBase64.Encode(this.wav);
    };

    if (data instanceof Array) this.Make(data);

}; // end RIFFWAVE
  
window.RIFFWAVE = RIFFWAVE;
})(window, document);
