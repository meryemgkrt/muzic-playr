 //elmentlere ulasıp obje olarak kullanma, yakalama
 const prevButton = document.getElementById('prev')
 const nextButton = document.getElementById('next')
 const repeatButton = document.getElementById('repeat')
 const shuffleButton = document.getElementById('shuffle')
 
 const audio = document.getElementById('audio')
 const songImage = document.getElementById('song-image')
 const songName = document.getElementById('song-name')
 const songArtist = document.getElementById('song-artist')
 const pauseButton = document.getElementById('pause')
 const playButton = document.getElementById('play')

 const playListButton = document.getElementById('playlist')


 const maxDuration = document.getElementById('max-duration')
 const currentTimeRef = document.getElementById('current-time')
 
 const progressBar = document.getElementById('progress-bar')
 const playListContainer = document.getElementById('playlist-container')
 const closeButton= document.getElementById('close-button')
 const playListSongs = document.getElementById('playlist-songs')
 
 const currentProgress = document.getElementById('current-progress')
 
 //indis sarki icin

let index

 // dongu durumu
 let loop = true

 const songsList= [
    
    
    
    {
        name: "armudun dali",
        link: "img/Armudun dali.mp3",
        artist: "gökghan birben",
        image: "img/gökhan.jpeg" 
    },
    {
         name: "Bu Kente yanlızlık düştüğü zaman",
         link: "img/Bu kente yanlızlık düştüğü zaman.mp3",
         artist: "Nurretin Rencber",
         image: "img/nurettin-rencber.jpg"
     },
     {
        name: "dilan top",
        link: "img/dilan top.mp3",
        artist: "Dilan Top",
        image :"img/dilan-top.png"
     },
     {
        name: "Evin",
        link: "img/Evin.mp3",
        artist: "Mem Ararat",
        image: "img/Evin.jpg"
    },

    {
         name: "Sevda Değil",
         link: "img/Sevda Değil.mp3",
         artist: "Zulfu Livaneli",
         image: "img/zulfu-livaneli.jpg"
     },
     
    

     {
         name: "yagarsa yagmur yagar",
         link: "img/yagarsa yagmur yagar.mp3",
         artist: "Resul Dindar",
         image: "img/resul dindar.jpg"
     },

     {
        name: "Aksam olur karanliga kalirsin",
        link: "img/Aksam olur karanliga kalirsin.mp3",
        artist: "Gulay",
        image: "img/gulay.jpeg"
    }

     
    

  ]
 let events={
     mouse:{
         click:"click"
     },

     touch:{
         click:"touchstart"
     }
 }
 
 let deviceType= ""


 const isToucDevice= ()=>{
     try{
         document.createEvent("TouchEvent") //creat olabilir
         deviceType="touch"
         return true
     }catch(e){
         deviceType="mouse"
         return false
     }
 }
 // zaman formatlama
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" +second : second
    return `${minute}:${second}`
}

 //sarki atama
 const setSong = (arrayIndex) => {
    //tum özellikleri cıkar  
    console.log(arrayIndex)
    let {name, link, artist, image} = songsList[arrayIndex]
     audio.src = link
     songName.innerHTML = name
     songArtist.innerHTML = artist
     songImage.src = image
    
      //sureyi goster metadata  yuklenmesi
     audio.onloadeddata = () =>{
     maxDuration.innerText = timeFormatter(audio.duration)
 }
     playListContainer.classList.add('hide')
     playAudio()
 }


 //sarkıyı oynatma
 const playAudio = () =>{
    
     audio.play()
     pauseButton.classList.remove('hide')
     playButton.classList.add('hide')
 }

 //tekrar et
 repeatButton.addEventListener('click', ()=>{
    if(repeatButton.classList.contains('active')){
          repeatButton.classList.remove('active')
         audio.loop = false
         console.log('tekrar kapatildi');
      }else {
          repeatButton.classList.add('active')          
          audio.loop = true
          console.log('tekrar acik');
      }
  })

 const nextSong = () =>{
     //eger normal calıyorsa sonrakine gec
 if(loop){
     if(index == songsList.length -1){
        //sondaysa basa gec
         index = 0
     }else {
        index += 1
     }
     setSong(index)
     playAudio()
 }else {

     //rast gele bir sıra bul ve oynat
     let randIndex = Math.floor(Math.random() * songsList.length)
     console.log(randIndex)
     setSong(randIndex)
     playAudio()
 }
}

 //sarkıyı durdur
 const pauseAudio = () =>{
     audio.pause()
     pauseButton.classList.add('hide')
     playButton.classList.remove('hide')
 }

 //onceki sarkıya gec
 const previousSong = () =>{
     if(index > 0){
         pauseAudio()
       index -=1
     }else {
         index = songsList.length - 1
     }
     setSong(index)
     playAudio()
 }
 
 //sarki kendisi bitince sıradakine gec
 audio.onended =() =>{
     nextSong()
 }
 

 //shuffle songs
 shuffleButton.addEventListener('click',()=>{
     if(shuffleButton.classList.contains('active')){
         shuffleButton.classList.remove('active')
        loop = true
       } else {
         shuffleButton.classList.add('active')
         loop = false
         console.log('karistirma acik')
     }
})

 //play button
 playButton.addEventListener('click', playAudio)

//next button
 nextButton.addEventListener('click',nextSong)

 //pause button
 pauseButton.addEventListener('click',pauseAudio)

 //prev button
 prevButton.addEventListener('click', previousSong) 

 // cihaz tipini sec
 isToucDevice ()
 progressBar.addEventListener(events[deviceType].click,(event) =>{
    //progress bar i baslat

    let coorStart = progressBar.getBoundingClientRect().left

    //mouse click yapma noktasını yakala
    let cooorEnd = !isToucDevice() ? event.clientX : event.touches[0].clientX
    let progress =(cooorEnd - coorStart) / progressBar.offsetWidth

    //genisligi progress e ata
    currentProgress.style.width = progress * 100 + "%"

    //zamani ata
    audio.currentTimeRef = progress * audio.duration

    //oynat
    audio.play()
    pauseButton.classList.remove('hide')
    pauseButton.classList.add('hide')



})

//progressi guncelle zamana gore
setInterval(()=>{
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime/audio.duration.toFixed(3)) * 100 + "%"
},1000)

//zamani güncelle
audio.addEventListener('timeupdate', ()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//playlist olustur
const initializePlaylist = () =>{
    for(let i in songsList){
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container"> 
          <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
          <span id="playlist-song-name">
            ${songsList[i].name}
          </span>
          <span id="playlist-song-artist-album">
            ${songsList[i].artist}
          </span>
        </div>
        </li>`
    }
}  

//sarki listesini göster
playListButton.addEventListener("click",()=>{
    playListContainer.classList.remove('hide')
    pauseAudio()
})
//sarki listesini goster
closeButton.addEventListener("click", ()=>{
    playListContainer.classList.add("hide")

})
//ekran yuklenirken
window.onload = () =>{
    //baslangıc sarkinin sırası
    index = 0
    setSong(index)
    //sarkı listesi olustur
    initializePlaylist()
}