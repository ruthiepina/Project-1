// function updateSongInfo() {
//    var selectedHoliday = document.getElementById("dropdown").value;

//    var songInfo = getSongInfo(selectedHoliday);

//    document.getElementById("songTitle").textContent = songInfo.title;

//    document.getElementById("lyrics").textContent = songInfo.lyrics;

//    document.getElementById("audioPlayer").src = songInfo.audioSrc;
// }

// function getSongInfo(holiday) {
//    // This is a placeholder example!!! This took a while for me so please be careful
//    return {
//       title: "Song Title for " + holiday,
//       lyrics: "Lyrics for the song related to " + holiday,
//       audioSrc: "path/to/audio/file.mp3",
//    };
// }

// // THIS IS THE COLOR CHANGING CODE (VERY IMPORTANT)

// function updateSongInfo() {
//    var selectedHoliday = document.getElementById("dropdown").value;

//    var colorStyles = "";

//    switch (selectedHoliday) {
//       case "Christmas":
//          colorStyles = `
// body {
//     background-color: red;
//     color: white;
// }
// header {
//     background-color: green;
//     color: white;
// }
// footer {
//     background-color: green;
//     color: white;
// }
//         `;
//          break;

//       case "Halloween":
//          colorStyles = `
// body {
//     background-color: orange;
//     color: black;
// }
// header {
//     background-color: black;
//     color: orange;
// }
// footer {
//     background-color: black;
//     color: orange;
// }
// `;
//          break;

//       case "New-Years":
//          colorStyles = `
// body {
//     background-color: red;
//     color: white;
// }
// header {
//     background-color: blue;
//     color: white;
// }
// footer {
//     background-color: blue;
//     color: white;
// }
// `;
//          break;

//       case "Cinco-De-Mayo":
//          colorStyles = `
// body {
//     background-color: white;
//     color: black;
// }
// header {
//     background-color: green;
//     color: black;
// }
// footer {
//     background-color: red;
//     color: black;
// }
// `;
//          break;

//       case "Valentines":
//          colorStyles = `
// body {
//     background-color: pink;
//     color: red;
// }
// header {
//     background-color: red;
//     color: pink;
// }
// footer {
//     background-color: red;
//     color: pink;
// }
// `;
//          break;
//       case "Saint-Patricks":
//          colorStyles = `
// body {
//     background-color: orange;
//     color: white;
// }
// header {
//     background-color: green;
//     color: white;
// }
// footer {
//     background-color: green;
//     color: white;
// }
// `;
//          break;
//    }

//    document.getElementById("colorStyles").textContent = colorStyles;
// }

//* Spotify API Process (Ruthie)
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

   //* Gets Spotify endpoint data for playlists
   const getPlaylist = async (playlistId) => {
      const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId, {
         headers: {
            Authorization: "Bearer " + accessToken,
         },
      });
      const playlist = await response.json(); //* Parses response into playlist object
      console.log("file: script.js:158 ~ playlist:", playlist);
   };

   const playlistId = "1cSe1tbdYYYnyoP93yJlRA"; //*Temporary id, will be using array of ID's
   let accessToken = "";
   const CLIENT_ID = "09492227f96b49f889b2baa58716b1a3";
   const CLIENT_SECRET = "3ac19ec7f05f435195950a492ad9fbd1";
   await spotifyToken(); //* Await until function returns promise
   await getPlaylist(playlistId); //* Await until function returns promise
};
globalAsync(); //* Call main program
