import './style.css'

const mainVideo = document.querySelector('#main-video')
const streamButton = document.querySelector('#stream-button')
const videoButton = document.querySelector('#video-button')
const audioButton = document.querySelector('#audio-button')

let isVideoEnabled = true;
let isAudioEnabled = true;

let videoTracks = [];
let audioTracks = [];


streamButton.addEventListener('click', async () => {
  let stream = mainVideo.srcObject;

  streamButton.textContent = stream ? '開始' : '結束';

  if(stream) {
    stream.getTracks().forEach(element => {
      element.stop()
    });
    mainVideo.srcObject = null;
    return;
  }

  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: {ideal: 4096},
      height: {ideal: 2160},
    }
  })
  videoTracks = stream.getVideoTracks();
  audioTracks = stream.getAudioTracks();
  videoTracks[0].enabled = isVideoEnabled;
  audioTracks[0].enabled = isAudioEnabled;
  mainVideo.srcObject  = stream
})

videoButton.addEventListener('click', () => {
  isVideoEnabled = !isVideoEnabled;
  videoButton.textContent = isVideoEnabled ? '關閉視訊' : '開啟視訊';
  if (videoTracks.length > 0) {
    videoTracks[0].enabled = isVideoEnabled;
  }
});

audioButton.addEventListener('click', () => {
  isAudioEnabled = !isAudioEnabled;
  audioButton.textContent = isAudioEnabled ? '關閉音訊' : '開啟音訊';
  if (audioTracks.length > 0) {
    audioTracks[0].enabled = isAudioEnabled;
  }
});

