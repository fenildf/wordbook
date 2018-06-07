'use strict'

/**todos body clientHeight 拿不到 先写死 */
function assembleHTML(voice) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title></title>
        <style>
            html,body{
                overflow:hidden;
            }
            #canvas{
                position:absolute;
                top:0;
                left:0;
            }
            #audio{
                display:none;
            }
        </style>
    </head>
    <body>
        <audio id="audio" src="${voice}"></audio>
        <canvas id="canvas"></canvas>
        
        <script>
            
            var canvas = document.getElementById('canvas');
            var height = 18*2;
            var width = 20*2;

            var audio = document.getElementById('audio');
            canvas.height = height;
            canvas.width = width;
            canvas.style.cssText = "height:"+(height/2)+"px;width:"+(width/2)+"px;";

            var context = canvas.getContext('2d');
            var color = '#1db7fd';
            var isPlaying = false;
            document.addEventListener('touchstart',function(){
                if(isPlaying){
                    stopVoice();
                }else{
                    playVoice();
                }
            },false);

            audio.onended = function(){
                alert();
                stopAnimation();
                isPlaying = false;
            }
            context.fillStyle = color;
            context.strokeStyle = color;

            var hornRectHeight = Math.ceil(height/3);
            var hornRectWidth = Math.ceil(width/5);
            var hornRectStartY = (height-hornRectHeight)/2;
            var hornHeight = height*0.9;
            var hornStartY = (height-hornHeight)/2;
            var hornWidth =  Math.ceil(width/2) - hornRectWidth;
            var oy = height/2;
            var ox = Math.ceil(width/2);
            function canvasClear(){
                context.clearRect(0,0,width,height);
            }
            function drawVolume(grade){
                if(grade == 0){
                    return;
                }
                var r,zt;
                context.save();
                context.lineWidth = height/10;
                context.lineCap="round";
                r = width/6 * grade;
                zt = Math.PI/3*2;
                if(grade == 2){
                    zt = Math.PI/2;
                }else if(grade == 3){
                    //zt = Math.PI/3;
                }
                context.beginPath();
                context.arc(ox,oy,r,-zt/2,zt/2);
                context.stroke();
                context.closePath();
                context.restore();
                return drawVolume(--grade);
            }

            function drawHorn(){
                context.fillRect(
                    0,
                    hornRectStartY,
                    hornRectWidth,
                    hornRectHeight
                );
                context.beginPath();
                context.moveTo(hornRectWidth,hornRectStartY);
                context.lineTo(hornRectWidth+hornWidth,hornStartY);
                context.lineTo(hornRectWidth+hornWidth,hornHeight+hornStartY);
                context.lineTo(hornRectWidth,hornRectStartY+hornRectHeight);
                context.lineTo(hornRectWidth,hornRectStartY);
                context.closePath();
                context.fill();
            }
            var animationid;
            var firstAnimationTime;
            var duration = 1000;
            var gradeDuration = duration/3;
            function terminate(){
                if(animationid){
                    window.cancelAnimationFrame(animationid);
                    animationid = undefined;
                }
                
            }
            function playAnimation(){
                terminate();
                canvasClear();
                drawHorn();
                var now = Date.now();
                if(!firstAnimationTime){
                    firstAnimationTime = now;
                }else{
                    var interval = (now - firstAnimationTime) % duration;
                    var grade = Math.floor(interval / gradeDuration);
                    drawVolume(grade);
                }
                animationid = window.requestAnimationFrame(playAnimation);
            }   

            function stopAnimation(){
                terminate();
                canvasClear();
                drawHorn();
                drawVolume(2);
                firstAnimationTime = undefined;
            }

            function playVoice(){
                nativeWebView && nativeWebView.invokeMethod('play');
                playAnimation();
                audio.currentTime = 0;
                audio.play();
                isPlaying = true;
                
            }
            function stopVoice(){
                stopAnimation();
                isPlaying = false;
                if(audio.played){
                    audio.pause();
                }
                
            }
            document.onNativeLoad = function(){
                try{
                    nativeWebView && nativeWebView.injectMethod('stop',stopVoice);
                }catch(e){
                    
                }
               
            }
            try{
                nativeWebView && nativeWebView.injectMethod('stop',stopVoice);
            }catch(e){
                
            }
            stopVoice();
        </script>
    </body>
    </html>
    `
}

export default assembleHTML;