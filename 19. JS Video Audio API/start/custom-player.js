//  <video> 元素，和控制栏。
var media = document.querySelector('video');
var controls = document.querySelector('.controls');

// 播放/暂停，停止，快退，和快进按钮。
var play = document.querySelector('.play');
var stop = document.querySelector('.stop');
var rwd = document.querySelector('.rwd');
var fwd = document.querySelector('.fwd');

// 进度条外面的 <div>，数字计时器的 <span>，以及内部的 <div> 会随着视频播放逐渐变宽。
var timerWrapper = document.querySelector('.timer');
var timer = document.querySelector('.timer span');
var timerBar = document.querySelector('.timer div');

// 从视频中删除默认浏览器控件，并使自定义控件可见。
media.removeAttribute('controls');
controls.style.visibility = 'visible';

// 播放和暂停视频
play.addEventListener('click', playPauseMedia);
// 暂停视频
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
// 搜索快退和快进
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
// 更新已用时间
media.addEventListener('timeupdate', setTime);

function playPauseMedia() {
    // 修复播放和暂停
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);

    if (media.paused) {
        play.setAttribute('data-icon', 'u');
        media.play();
    } else {
        play.setAttribute('data-icon', 'P');
        media.pause();
    }
}


function stopMedia() {
    media.pause();
    media.currentTime = 0;
    // 修复播放和暂停
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);

    play.setAttribute('data-icon', 'P');
}

var intervalRwd;
var intervalFwd;

function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');

    if (rwd.classList.contains('active')) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add('active');
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if (fwd.classList.contains('active')) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add('active');
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward() {
    if (media.currentTime <= 3) {
        // 修复播放和暂停
        // rwd.classList.remove('active');
        // clearInterval(intervalRwd);
        stopMedia();
    } else {
        media.currentTime -= 3;
    }
}

function windForward() {
    if (media.currentTime >= media.duration - 3) {
        // 修复播放和暂停
        // fwd.classList.remove('active');
        // clearInterval(intervalFwd);
        stopMedia();
    } else {
        media.currentTime += 3;
    }
}

// 更新已用时间
function setTime() {
    var minutes = Math.floor(media.currentTime / 60);
    var seconds = Math.floor(media.currentTime - minutes * 60);
    var minuteValue;
    var secondValue;

    if (minutes < 10) {
        minuteValue = '0' + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }

    var mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;

    var barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = barLength + 'px';
}
