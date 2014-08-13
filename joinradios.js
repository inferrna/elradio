
var soundSource, ac = new AudioContext();
var audioElement = document.getElementById("player");
var source = context.createMediaElementSource(audioElement);

var request = new XMLHttpRequest({mozSystem: true});
request.open("GET", "http://185.12.94.238:8000/coge.ogg", true);
request.responseType = "arraybuffer";
 
// Our asynchronous callback
request.onload = function() {
    console.log("Data loaded");
    var audioData = request.response;
    audioGraph(audioData);
};
request.send();


function audioGraph(audioData) {
    // create a sound source
     console.log("Start graph");
    // The Audio Context handles creating source buffers from raw binary
    ac.decodeAudioData(audioData, function(soundBuffer){
        soundSource = ac.createBufferSource();
        // Add the buffered data to our object
        soundSource.buffer = soundBuffer;
        console.log("Going split");
        split_ch(monoBuffer);
    });

    // Plug the cable from one thing to the other
    //soundSource.connect(context.destination);

    // Finally
    //playSound(soundSource);
    //soundSource.noteOn(context.currentTime);
    //soundSource.noteOff(context.currentTime);
}



function split_ch(monoBuffer){
     ac.decodeAudioData(monoBuffer, function(data) {
     var source = ac.createBufferSource();
     source.buffer = data;
     var splitter = ac.createChannelSplitter(2);
     source.connect(splitter);
     var merger = ac.createChannelMerger(2);

     // Reduce the volume of the left channel only
     var gain = ac.createGain();
     gain.value = 0.5;
     splitter.connect(gain, 0);

     // Connect the splitter back to the second input of the merger: we
     // effectively swap the channels, here, reversing the stereo image.
     gain.connect(merger, 0, 1);
     splitter.connect(merger, 1, 0);

     //var dest = ac.createMediaStreamDestination();

     // Because we have used a ChannelMergerNode, we now have a stereo
     // MediaStream we can use to pipe the Web Audio graph to WebRTC,
     // MediaRecorder, etc.
     console.log("Start playing");
     merger.connect(ac.destination);
     soundSource.start();
     //soundSource.noteOn(ac.currentTime);
    });
}
