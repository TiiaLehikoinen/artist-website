(() => {
  const player = document.querySelector(".music-player");
  if (!player) return;
  const audio = player.querySelector("audio");
  const controls = player.querySelector(".custom-controls");
  const play = player.querySelector(".play");
  const mute = player.querySelector(".mute");
  const seek = player.querySelector(".seek");
  const played = player.querySelector(".played");
  const current = player.querySelector(".current");
  const total = player.querySelector(".total");
  const error = player.querySelector(".error");
  const start = player.querySelector(".start");
  const end = player.querySelector(".end");
  const format = seconds => {
    const s = Math.max(0, Math.floor(seconds || 0));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  };
  function updateTime() {
    const valid = Number.isFinite(audio.duration) && audio.duration > 0;
    seek.disabled = start.disabled = end.disabled = !valid;
    if (!valid) return;
    seek.max = audio.duration;
    seek.value = audio.currentTime;
    current.textContent = format(audio.currentTime);
    total.textContent = format(audio.duration);
    seek.setAttribute("aria-valuetext", format(audio.currentTime) + " / " + format(audio.duration));
    played.style.clipPath = "inset(0 " + (100 - audio.currentTime / audio.duration * 100) + "% 0 0)";
  }
  function updatePlay() {
    const paused = audio.paused;
    play.setAttribute("aria-label", paused ? "Play" : "Pause");
    play.querySelector(".play-icon").hidden = !paused;
    play.querySelector(".pause-icon").hidden = paused;
  }
  play.addEventListener("click", async () => {
    error.textContent = "";
    if (!audio.paused) { audio.pause(); return; }
    if (audio.ended) audio.currentTime = 0;
    try { await audio.play(); }
    catch { error.textContent = "Playback could not start. Please try again."; }
  });
  mute.addEventListener("click", () => { audio.muted = !audio.muted; });
  audio.addEventListener("volumechange", () => {
    mute.setAttribute("aria-label", audio.muted ? "Unmute" : "Mute");
    mute.querySelector(".sound-icon").hidden = audio.muted;
    mute.querySelector(".mute-icon").hidden = !audio.muted;
  });
  seek.addEventListener("input", () => {
    audio.currentTime = Number(seek.value);
    updateTime();
  });
  start.addEventListener("click", () => { audio.currentTime = 0; updateTime(); });
  end.addEventListener("click", () => { audio.pause(); audio.currentTime = audio.duration; updateTime(); });
  ["loadedmetadata", "durationchange", "timeupdate", "seeked"].forEach(event => audio.addEventListener(event, updateTime));
  ["play", "pause", "ended"].forEach(event => audio.addEventListener(event, updatePlay));
  audio.addEventListener("error", () => { error.textContent = "Audio could not be loaded. Check the MP3 file path."; });
  audio.controls = false;
  controls.hidden = false;
  updateTime();
  updatePlay();
})();
