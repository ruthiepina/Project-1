//* Runs Spotify endpoint against selected holiday
// let selectedSongs = [];
let accessToken = "";
let playlist = "";
const playlistArray = [
   {
      holiday: "christmas",
      spotifyId: "1cSe1tbdYYYnyoP93yJlRA",
   },
   {
      holiday: "halloween",
      spotifyId: "2bWtVAl9VX45x9gAUPiVOF",
   },
   {
      holiday: "new-years",
      spotifyId: "3Kr8SkA44EkGhZlXLlFT8T",
   },
   {
      holiday: "valentines",
      spotifyId: "7awVFZ11ewVYCk0KyMYCka",
   },
   {
      holiday: "cinco-de-mayo",
      spotifyId: "37i9dQZF1DWW6FKfbzAFjW",
   },
   {
      holiday: "saint-patricks",
      spotifyId: "0HzXazYFGhBDrqZk4e3nPI",
   },
];

//* Creates and displays playlist upon holiday selection
const processPlaylist = async () => {
   //* Get dropdown selection
   const selectedHoliday = document.getElementById("dropdown").value;

   //* Gets Spotify playlist id that matches dropdown holiday selection
   let playlistId = "";
   for (let i = 0; i < playlistArray.length; i++) {
      if (playlistArray[i].holiday === selectedHoliday) {
         playlistId = playlistArray[i].spotifyId;
         break;
      }
   }
   await getPlaylist(playlistId); //* Get playlist content: song name, artist name, audio preview (if available)



   const playlistDiv = $("#playlist-div");
   // Removes all child elements from the playlist div before adding new ones in
   playlistDiv.empty();

   // Iterates through the Spotify playlist to extract track name and artist and then creates a DOM element
   for (i = 0; i < playlist.tracks.items.length; i++) {
      let songBlock = document.createElement("div");
      songBlock.setAttribute("class", "card song-block");
      let cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body row px-4");
      let songTitle = document.createElement("div");
      songTitle.setAttribute("class", "col text-center text-dark py-2 song-title");
      songTitle.innerHTML = playlist.tracks.items[i].track.name;
      let songArtist = document.createElement("div");
      songArtist.setAttribute("class", "col text-center text-dark py-2 song-artist");
      songArtist.innerHTML = playlist.tracks.items[i].track.artists[0].name;
      let lyricsBtn = document.createElement("button");
      lyricsBtn.setAttribute("type", "button");
      lyricsBtn.setAttribute("class", "col-2 btn btn-dark lyrics-btn");
      lyricsBtn.setAttribute("data-toggle", "modal");
      lyricsBtn.setAttribute("data-target", "#lyricsModal");
      lyricsBtn.addEventListener("click", generateLyrics);
      lyricsBtn.innerHTML = "Get lyrics";



      //* Preview audio code
      let playTrackEl = "";
      if (playlist.tracks.items[i].track.preview_url !== null) {
         playTrackEl = document.createElement("audio");
         playTrackEl.setAttribute("controls", "true");
         playTrackEl.setAttribute("src", playlist.tracks.items[i].track.preview_url);
      } else {
         playTrackEl = document.createElement("p");
         playTrackEl.setAttribute("id", "no-audio");
         playTrackEl.textContent = "Preview audio is not available";
      }
      playTrackEl.setAttribute("class", "col text-center text-dark py-2 track-audio");



      cardBody.append(songTitle, songArtist, playTrackEl, lyricsBtn);
      songBlock.append(cardBody);
      playlistDiv.append(songBlock);
   }
};

function updateSongInfo() {
   var selectedHoliday = document.getElementById("dropdown").value;

   var songInfo = getSongInfo(selectedHoliday);

document.getElementById("songTitle").textContent = songInfo.title;
document.getElementById("lyrics").textContent = songInfo.lyrics;
document.getElementById("audioPlayer").src = songInfo.audioSrc;

// saveSelectedSong(songInfo);

processPlaylist();
}

// function saveSelectedSong(songInfo) {
//    selectedSongs.push(songInfo);

//    if (selectedSongs.length > 3) {
//       selectedSongs.shift();
//    }
//    updatePreviousSongsDropdown();
// }

function updatePreviousSongsDropdown() {
   // Get the previous songs dropdown element
   var previousSongsDropdown = document.getElementById("previousSongs");

   if (!selectedSongs || selectedSongs.length === 0) {
   
   previousSongsDropdown.innerHTML = '<option value="">No Previous Songs</option>';
   return;
   }

   // Add options for each selected song
   for (var i = 0; i < selectedSongs.length; i++) {
      var option = document.createElement("option");
      option.value = i; // Use the index as the value
      option.textContent = selectedSongs[i].title + " by ";
      previousSongsDropdown.appendChild(option);
   }

   // Add event listener to the dropdown
   previousSongsDropdown.addEventListener("change", function () {
      console.log("Dropdown changed");
      // Get the selected index
      var selectedIndex = this.value;

      // Check if an option is selected
      if (selectedIndex !== "") {
         // Get the corresponding songInfo
         var selectedSongInfo = selectedSongs[selectedIndex];

         // Update the current song information
         document.getElementById("songTitle").textContent = selectedSongInfo.title;
         document.getElementById("lyrics").textContent = selectedSongInfo.lyrics;
         document.getElementById("audioPlayer").src = selectedSongInfo.audioSrc;
      }
   });
}
// function updatePreviousSongsDropdown() {
//    var previousSongsDropdown = document.getElementById("previousSongs");

//    if (!selectedSongs || selectedSongs.length === 0) {
//       previousSongsDropdown.innerHTML = '<option value="">No Previous Songs</option>';
//       return;
//    }

//    previousSongsDropdown.innerHTML = "";

//    for (var i = 0; i < selectedSongs.length; i++) {
//       var option = document.createElement("option");
//       option.value = i;
//       option.textContent = selectedSongs[i].title + " by " + selectedSongs[i].artist;
//       previousSongsDropdown.appendChild(option);
//    }

//    previousSongsDropdown.addEventListener("change", function () {
//       var selectedIndex = this.value;

//       if (selectedIndex !== "") {
//          var selectedSongInfo = selectedSongs[selectedIndex];

//          document.getElementById("songTitle").textContent = selectedSongInfo.title;
//          document.getElementById("lyrics").textContent = selectedSongInfo.lyrics;
//          document.getElementById("audioPlayer").src = selectedSongInfo.audioSrc;
//       }
//    });
// }

//* Updated to javascript only, styling in css file.
function updateSongInfo() {
   var selectedHoliday = document.getElementById("dropdown").value;

   //* Assigns css class to color the page to match the holiday
   document.querySelector("body").className = selectedHoliday;
   document.querySelector("header").className = selectedHoliday;
   document.querySelector("footer").className = selectedHoliday;

   processPlaylist(); //* Process the selected holiday playlist
}

//* Gets Spotify endpoint data for playlists
const getPlaylist = async (playlistId) => {
   const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId, {
      headers: {
         Authorization: "Bearer " + accessToken,
      },
   });
   playlist = await response.json(); //* Parses response into playlist object
   return playlist;
};





//* Spotify API Process
const globalAsync = async () => {
   //* Get Spotify Token
   const spotifyToken = async () => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
         method: "POST",
         body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
         }),
      });
      const tokenData = await response.json(); //* Parses response into object tokenData
      accessToken = tokenData.access_token; //* Gets access token
   };

   const CLIENT_ID = "09492227f96b49f889b2baa58716b1a3";
   const CLIENT_SECRET = "3ac19ec7f05f435195950a492ad9fbd1";
   
   await spotifyToken(); //* Await until function returns promise
};
globalAsync(); //* Call main program

let modalTitle = document.querySelector("#modalTitle");
let modalBody = document.querySelector('.modal-body');
let songTitle = '';
let artistName = '';
let songId = '';

async function generateLyrics(e) {
   e.preventDefault();
   songTitle = e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
   artistName = e.target.previousElementSibling.previousElementSibling.innerHTML;
   if (e.target.nodeName === "BUTTON"){
      modalTitle.innerHTML = songTitle;
      const url = `https://musixmatch-lyrics-songs.p.rapidapi.com/songs/lyrics?t=${songTitle}&a=${artistName}&type=text`;
      const options = {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': 'ab0036b305msh762ff5f3f5560e4p1c4594jsn319a9a8d0b8a',
            'X-RapidAPI-Host': 'musixmatch-lyrics-songs.p.rapidapi.com'
         }
      };

      try {
         const response = await fetch(url, options);
         let result = await response.text();
         for(i=0;i<=result.length;i++){
            let slicer = result.substring(result.indexOf('['), result.indexOf(']')+1)
            result = result.replace(slicer, '')
         }
         modalBody.innerHTML = result;
      } catch (error) {
         modalBody.innerHTML = 'Unable to find lyrics';
         console.error(error);
      }
   }
}
