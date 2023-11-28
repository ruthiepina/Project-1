         function updateSongInfo() {
            
            var selectedHoliday = document.getElementById("dropdown").value;

            
            var songInfo = getSongInfo(selectedHoliday);

            
            document.getElementById("songTitle").textContent = songInfo.title;

            
            document.getElementById("lyrics").textContent = songInfo.lyrics;

            
            document.getElementById("audioPlayer").src = songInfo.audioSrc;
        }

        
        function getSongInfo(holiday) {
            
            
            // This is a placeholder example!!! This took a while for me so please be careful
            return {
                title: "Song Title for " + holiday,
                lyrics: "Lyrics for the song related to " + holiday,
                audioSrc: "path/to/audio/file.mp3"
            };
        }
        
        // THIS IS THE COLOR CHANGING CODE (VERY IMPORTANT)
        
        function updateSongInfo() {
            
            var selectedHoliday = document.getElementById("dropdown").value;

            
            var colorStyles = ""; 

            switch (selectedHoliday) {
case "Christmas":
    colorStyles = `
body {
    background-color: red;
    color: white;
}
header {
    background-color: green; 
    color: white;
}
footer {
    background-color: green; 
    color: white;
}
        `;
        break;
                    
case "Halloween":
    colorStyles = `
body {
    background-color: orange;
    color: black;
}
header {
    background-color: black; 
    color: orange;
}
footer {
    background-color: black; 
    color: orange;
}
`;
break;

case "New-Years":
    colorStyles = `
body {
    background-color: red;
    color: white;
}
header {
    background-color: blue; 
    color: white;
}
footer {
    background-color: blue; 
    color: white;
}
`;
break;

case "Cinco-De-Mayo":
    colorStyles = `
body {
    background-color: white;
    color: black;
}
header {
    background-color: green; 
    color: black;
}
footer {
    background-color: red; 
    color: black;
}
`;
break;

case "Valentines":
    colorStyles = `
body {
    background-color: pink;
    color: red;
}
header {
    background-color: red; 
    color: pink;
}
footer {
    background-color: red; 
    color: pink;
}
`;
break;
case "Saint-Patricks":
    colorStyles = `
body {
    background-color: orange;
    color: white;
}
header {
    background-color: green; 
    color: white;
}
footer {
    background-color: green; 
    color: white;
}
`;
break;
}


    document.getElementById("colorStyles").textContent = colorStyles;            
}

updateStyles();
   