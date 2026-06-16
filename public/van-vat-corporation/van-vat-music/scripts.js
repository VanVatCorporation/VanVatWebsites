
// Playlist data
var playlist = [
    //{
    //    title: "Bài hát mẫu 1",
    //    artist: "Nghệ sĩ mẫu",
    //    src: "https://www.vanvatcorp.com/global/VanVatWave/911%20-%20I%20Do%20%20(Music%20Video).mp4",
    //    albumArt: "https://storage.googleapis.com/a1aa/image/061a64da-804c-4aba-4fba-b0f9e1d877b9.jpg",
    //    lyrics: `Đây là lời bài hát mẫu 1.\nNội dung lời bài hát được hiển thị ở đây.\nDòng thứ ba của lời bài hát.\nDòng thứ tư của lời bài hát.`
    //}
];

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const prevBtn = document.getElementById('prev-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playIconClass = 'fas fa-play';
    const pauseIconClass = 'fas fa-pause';
    const playlistEl = document.getElementById('playlist');
    const albumArt = document.getElementById('album-art');
    const songTitleEl = document.getElementById('song-title');
    const songArtistEl = document.getElementById('song-artist');
    const lyricsEl = document.getElementById('lyrics');





    let currentIndex = 0;

    // Format seconds to mm:ss
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Load song by index
    function loadSong(index) {
        const song = playlist[index];
        if (typeof song === "undefined") return;
        audio.src = song.src;
        albumArt.src = song.albumArt;
        songTitleEl.textContent = song.title;
        songArtistEl.textContent = `Nghệ sĩ: ${song.artist}`;
        lyricsEl.textContent = song.lyrics;
        seekBar.value = 0;
        currentTimeEl.textContent = '0:00';
        durationEl.textContent = '0:00';
        playPauseBtn.querySelector('i').className = playIconClass;
        // Update active playlist item
        Array.from(playlistEl.children).forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                item.setAttribute('aria-pressed', 'true');
                item.focus();
            } else {
                item.classList.remove('active');
                item.setAttribute('aria-pressed', 'false');
            }
        });
        currentIndex = index;
    }

    // Update duration display when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
        seekBar.max = Math.floor(audio.duration);
    });

    // Update current time and seek bar as audio plays
    audio.addEventListener('timeupdate', () => {
        currentTimeEl.textContent = formatTime(audio.currentTime);
        seekBar.value = Math.floor(audio.currentTime);
    });

    // Prev toggle
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            loadSong(currentIndex - 1);
            audio.play();
            playPauseBtn.querySelector('i').className = pauseIconClass;
        } else {
            playPauseBtn.querySelector('i').className = playIconClass;
            seekBar.value = 0;
            currentTimeEl.textContent = '0:00';
        }
    });
    // Play/pause toggle
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.querySelector('i').className = pauseIconClass;
        } else {
            audio.pause();
            playPauseBtn.querySelector('i').className = playIconClass;
        }
    });
    // Next toggle
    nextBtn.addEventListener('click', () => {
        if (currentIndex < playlist.length - 1) {
            loadSong(currentIndex + 1);
            audio.play();
            playPauseBtn.querySelector('i').className = pauseIconClass;
        } else {
            playPauseBtn.querySelector('i').className = playIconClass;
            seekBar.value = 0;
            currentTimeEl.textContent = '0:00';
        }
    });


    // Play/pause toggle
    repeatBtn.addEventListener('click', () => {
        if (audio.loop) {
            audio.loop = false;
            repeatBtn.classList.remove("text-red-500");
        } else {
            audio.loop = true;
            repeatBtn.classList.add("text-red-500");
        }
    });

    // Seek bar change
    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    // When audio ends, play next song or reset
    audio.addEventListener('ended', () => {
        if (currentIndex < playlist.length - 1) {
            loadSong(currentIndex + 1);
            audio.play();
            playPauseBtn.querySelector('i').className = pauseIconClass;
        } else {
            playPauseBtn.querySelector('i').className = playIconClass;
            seekBar.value = 0;
            currentTimeEl.textContent = '0:00';
        }
    });

    // Playlist item click handler
    playlistEl.addEventListener('click', (e) => {
        const item = e.target.closest('.playlist-item');
        if (!item) return;
        const index = parseInt(item.getAttribute('data-index'), 10);
        if (index !== currentIndex) {
            loadSong(index);
            audio.play();
            playPauseBtn.querySelector('i').className = pauseIconClass;
        }
    });

    // Keyboard accessibility for playlist items
    playlistEl.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('playlist-item')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = e.target.nextElementSibling || playlistEl.firstElementChild;
                next.focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = e.target.previousElementSibling || playlistEl.lastElementChild;
                prev.focus();
            }
        }
    });

    
    // Initialize
    const loadFirstSong = () => {
        loadToList(playlistEl);
        loadSong(0);
    }
    refreshAvailableFiles(loadFirstSong);

});

function refreshAvailableFiles(loadFirstSong) {
    playlist = [];
    fetch('/api/songs/all-names')
        .then(response => response.json())
        .then(files => {
            files.forEach(file => {
                var aG =
                {
                    title: `Bài hát ${file}`,
                    artist: "Nghệ sĩ mẫu",
                    src: `/category-music/songs/${file}`,
                    albumArt: "https://storage.googleapis.com/a1aa/image/061a64da-804c-4aba-4fba-b0f9e1d877b9.jpg",
                    lyrics: `Đây là lời bài hát mẫu ${file}.\nNội dung lời bài hát được hiển thị ở đây.\nDòng thứ ba của lời bài hát.\nDòng thứ tư của lời bài hát.`
                };
                playlist.push(aG);
            });
            loadFirstSong();
        })
        .catch(error => console.error('Error fetching files:', error));
}
function loadToList(playlistNode) {
    var index = 0;
    playlist.forEach(file => {
        const div = document.createElement("div");
        div.classList = "playlist-item active";
        div.setAttribute('data-index', index);
        div.setAttribute('tabindex', 0);
        div.setAttribute('role', "button");
        div.setAttribute('aria-pressed', "false");
        div.textContent = `${file.title} - ${file.artist}`

        playlistNode.appendChild(div);
        index++;
    });
}