const aquarium = document.querySelector("#content");
const sceneButton = document.querySelector("#scene-toggle");
const musicButton = document.querySelector("#music-toggle");
const musicIcon = musicButton.querySelector("i");
const music = document.querySelector("#background-music");
const controlStatus = document.querySelector("#control-status");

const scenes = ["lagoon", "reef", "deep", "sunset"];
let sceneIndex = Math.max(0, scenes.indexOf(aquarium.dataset.scene));

sceneButton.addEventListener("click", () => {
    sceneIndex = (sceneIndex + 1) % scenes.length;
    aquarium.dataset.scene = scenes[sceneIndex];
});

function setMusicButtonState(isPlaying) {
    const label = isPlaying ? "Dừng nhạc" : "Phát nhạc";
    musicIcon.classList.toggle("fa-stop", isPlaying);
    musicIcon.classList.toggle("fa-play", !isPlaying);
    musicButton.setAttribute("aria-label", label);
    musicButton.title = label;
    musicButton.setAttribute("aria-pressed", String(isPlaying));
}

async function playMusic() {
    try {
        await music.play();
        setMusicButtonState(true);
    } catch (error) {
        setMusicButtonState(false);
        if (error.name === "NotAllowedError") {
            console.warn("Trình duyệt chặn phát nhạc:", error);
            return;
        }

        console.error("Không thể phát nhạc nền:", error);
    }
}

musicButton.addEventListener("click", async () => {
    if (!music.paused) {
        music.pause();
        setMusicButtonState(false);
        return;
    }

    await playMusic();
});