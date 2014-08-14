var source, swnl = document.createElement("input");
var ac = new AudioContext();
swnl.type = 'button';
swnl.addEventListener('click', onclc);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(swnl);


function onclc(){
    var audioElement = document.getElementById("mplayer");
    audioElement.play();
    source = ac.createMediaElementSource(audioElement);
    console.log('source');
    console.log(source);
    //source.connect(ac.destination);
    //var splitter = ac.createChannelSplitter(2);
    //source.connect(splitter);
    var merger = ac.createChannelMerger(2);

    // Reduce the volume of the left channel only
    var gain = ac.createGain();
    gain.value = 0.1;
    //splitter.connect(gain, 0);
    source.connect(gain, 0);

    gain.connect(merger, 0, 1);
    source.connect(merger, 0, 0);

    console.log("Start playing");
    merger.connect(ac.destination);
}
