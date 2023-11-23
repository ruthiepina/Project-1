         function updateSongInfo() {
            
            var selectedHoliday = document.getElementById("dropdown").value;

            // you need to implement the song into the selectedHoliday
            var songInfo = getSongInfo(selectedHoliday);

            // Update the song title
            document.getElementById("songTitle").textContent = songInfo.title;

            // Update the lyrics
            document.getElementById("lyrics").textContent = songInfo.lyrics;

            // Updtate the audioplayer
            document.getElementById("audioPlayer").src = songInfo.audioSrc;
        }

        // Mock function to fetch song information based on the selected holiday
        function getSongInfo(holiday) {
            // You need to implement this function to fetch data from your data source
            
            // This is a placeholder example!!! This took a while for me so please be careful
            return {
                title: "Song Title for " + holiday,
                lyrics: "Lyrics for the song related to " + holiday,
                audioSrc: "path/to/audio/file.mp3"
            };
        }
   