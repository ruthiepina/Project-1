let lyricsBox = document.querySelector('.lyricsBox')
let songTitle = document.querySelector('#songTitle')
let accordianBtn = document.querySelector('.accordian-button')

let songId = 0
let songLyrics = ''

function searchSong(){
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${songTitle.innerHTML}&per_page=10&page=1&text_format=plain`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3068fd5e1emsh633ef23a0b73354p13ebc2jsncd0eb40a278f',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        songId = response.hits[0].result.id
        searchLyrics()
    });
}

function searchLyrics(){
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}&text_format=plain`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3068fd5e1emsh633ef23a0b73354p13ebc2jsncd0eb40a278f',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        songLyrics = response.lyrics.lyrics.body.plain
        lyricsBox.append(songLyrics)
    });
}

searchSong()