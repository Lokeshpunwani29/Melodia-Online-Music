let currentSong = new Audio();
let currentFolder;
let songs
async function getSongs(folder)
{
  currentFolder = folder;
  let a = await fetch(`/${folder}/`)
  let response = await a.text()
  let div = document.createElement("div")
  div.innerHTML= response;
  let as = div.getElementsByTagName("a")
  songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3"))
      {
        let songName = element.href.split(`/${currentFolder}/`)[1]
        songName = songName.split(".mp3")[0]
        songs.push(songName)
      }
  }
  let songsUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
  songsUL.innerHTML = " ";
for (const song of songs) {
  songsUL.innerHTML = songsUL.innerHTML + `<li>
  <div class="song-Info">
  <div>
  <img src="img/music.svg" alt="music-icon">
</div>
  <div>
  <div class="songTitle">${(song.replaceAll("%20"," "))}</div>
    <div class="artistName">Songify Viral Hits</div>
    </div>
  </div>
    <div class="playNow">
      Play Now
      <img src="img/play3.svg" alt="">
    </div>
  </li>`
}

Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(
  e=>{
    e.addEventListener("click", element=>{
      let play = e.querySelector(".songTitle").innerHTML.trim() + ".mp3"
      playMusic(play)
    })
  }
)
return songs;
}

function secondsToMinutes(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
}
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad with leading zeros if needed
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track, pause = false)=>{
  currentSong.src = `/${currentFolder}/` + track;
  if(!pause)
  {
    currentSong.play();
    playbtn.src="img/pause.svg"; 
  }
  track = (track.replaceAll("%20"," ")).split(".mp3")[0];
  document.querySelector(".songInfo").innerHTML = track;
  
  }

async function displayAlbums(){
  let a = await fetch(`/songs/`)
  let response = await a.text()
  let div = document.createElement("div")
  div.innerHTML= response;
  let anchor = div.getElementsByTagName("a");
  let array = Array.from(anchor) 
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if(e.href.includes("/songs") && !e.href.includes(".htaccess"))
      {
        
        let folder = e.href.split("/").slice(-2)[0];
        let a = await fetch(`/songs/${folder}/info.json`)
        let response = await a.json()
        document.querySelector(".cardCont").innerHTML = document.querySelector(".cardCont").innerHTML + `<div data-folder="${folder}" class="card ">
          <div class="play">
            <img src = "img/play.svg" alt="play">
          </div>
          <img src="/songs/${folder}/cover.jpg" alt="thumbnail">
          <h3>${response.title}</h3>
          <p>${response.description}</p>
        </div>` 
      }
  }
    
  Array.from(document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener(("click"), async (item) => {
      
      songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
      playMusic((songs[0]+ ".mp3"))
      document.querySelector(".left").style.left="0%"
  
    }   )
  })  
  
}

  (async function main()
{

await getSongs("songs/bgm")
playMusic((songs[0]+".mp3"),true)

displayAlbums();

playbtn.addEventListener("click", ()=>{
  if(currentSong.paused)
    {
      currentSong.play();
      playbtn.src="img/pause.svg"
    }
      else
      {
        currentSong.pause();
        playbtn.src="img/play2.svg"
      }
})

currentSong.addEventListener(("timeupdate"),()=>{
  let formattedTime = secondsToMinutes(currentSong.currentTime).split(".")[0];
  document.querySelector(".songTime").innerHTML = formattedTime + "/" + secondsToMinutes(currentSong.duration).split(".")[0];
  document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 + "%"
})
document.querySelector(".seekbar").addEventListener(("click"),(e) => {
let percentage = (e.offsetX/e.target.getBoundingClientRect().width) *100;
document.querySelector(".circle").style.left = percentage + "%";
currentSong.currentTime = (currentSong.duration * percentage)/100;
})
document.querySelector(".menu").addEventListener(("click"),() => {
    document.querySelector(".left").style.left="0%"
})
document.querySelector(".cross").addEventListener(("click"),() => {
  document.querySelector(".left").style.left="-100%"
})
nextbtn.addEventListener(("click"),() => {
  let index = songs.indexOf(((currentSong.src.split(`/${currentFolder}/`)[1]).split(".mp3")[0]));
  if(index < (songs.length-1))
  {
    playMusic(songs[index+1] + ".mp3")
  }
  else{
    playMusic(songs[0] + ".mp3")
  }
})

prevbtn.addEventListener(("click"),() => {
  let index = songs.indexOf(((currentSong.src.split(`/${currentFolder}/`)[1]).split(".mp3")[0]));
  if(index > 0)
  {
    playMusic(songs[index-1] + ".mp3")
  }
  else{
    playMusic(songs[songs.length-1] + ".mp3")
  }
})

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener(("change"),(e) => {
  currentSong.volume = parseInt(e.target.value)/100;
})
sound.addEventListener(("click"), (e) => {
  console.log(e.target.src);
  if(e.target.src.includes("img/volume.svg")){
    e.target.src = e.target.src.replace("img/volume.svg","img/mute.svg");
    currentSong.volume = 0;
    document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
  }
  else{
    e.target.src = e.target.src.replace("img/mute.svg","img/volume.svg");
    currentSong.volume = 0.1;
    document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
  }
} )
document.querySelector(".Signup").addEventListener(("click"),()=>{
  window.location.href = "/info.html";
})
document.querySelector(".Login").addEventListener(("click"),()=>{
  window.location.href = "/info.html";
})
document.querySelector(".redirect").addEventListener(("click"),()=>{
  window.location.href = "/info.html";
})
mail.addEventListener(("click"),()=>{
  window.location.href = "mailto:lokeshpunwani29@gmail.com";
})
})()