'use strict'
function assembleHTML(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title></title>
        <style>
            html,body,canvas{
                height:100%;
                width:100%
            }
        </style>
    </head>
    <body>
        <canvas id="canvas"></canvas>
        <script>
            var canvas = document.getElementById('canvas');
            var height = document.body.clientHeight*2;
            var width = document.body.clientWidth*2;
            canvas.height = height;
            canvas.width = width;

            var context = canvas.getContext('2d');

            function drawVolume(grade){

            }

            function drawHorn(){
                
            }

            function playAnimation(){

            }   

            function stopAnimation(){

            }

            function playVoice(){

            }
            function stopVoice(){

            }
            
        </script>
    </body>
    </html>
    `
}

export default assembleHTML;