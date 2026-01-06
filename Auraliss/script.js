const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const bars = document.querySelectorAll(".waveform span");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const locationText = document.getElementById("locationText");
const situationText = document.getElementById("situationText");

const audioUpload = document.getElementById("audioUpload");
const fileName = document.getElementById("fileName");

const classText = document.getElementById("classText");
const confidenceText = document.getElementById("confidenceText");
const saveBtn = document.getElementById("saveBtn");


function simulateAudioClassification(audioElement) {
  const duration = audioElement.duration;

  let classification = {};

  if (duration < 5) {
    classification = {
      class: "Emergency Siren",
      confidence: "91%",
      situation: "Short, sharp high-frequency sounds detected. Possible emergency vehicle nearby."
    };
  } else if (duration < 15) {
    classification = {
      class: "Crowd Noise",
      confidence: "84%",
      situation: "Multiple overlapping human voices detected. Public gathering likely."
    };
  } else if (duration < 30) {
    classification = {
      class: "Traffic Noise",
      confidence: "88%",
      situation: "Engine sounds and honking patterns detected. Traffic congestion probable."
    };
  } else {
    classification = {
      class: "Rain / Environmental Noise",
      confidence: "79%",
      situation: "Continuous ambient sound detected. Weather or environmental source."
    };
  }

  return classification;
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {

    // RESET UI
    result.classList.add("hidden");
    loading.classList.remove("hidden");

    playBtn.textContent = "⏳";

    // 🔥 HARDCORE DUMMY BACKEND RESPONSE
    setTimeout(() => {

    const classification = simulateAudioClassification(audio);

    locationText.textContent = "Urban Junction – Smart City Zone";
    situationText.textContent = classification.situation;
    classText.textContent = classification.class;
    confidenceText.textContent = classification.confidence;


      // Inject response into UI
      locationText.textContent = "Urban Junction – Smart City Zone";
      situationText.textContent = classification.situation;

      loading.classList.add("hidden");
      result.classList.remove("hidden");

      // Start audio + waveform
      audio.play();
      playBtn.textContent = "❚❚";
      bars.forEach(bar => bar.style.animationPlayState = "running");

    }, 2000); // ⏱ 2 seconds fake processing time

  } else {
    audio.pause();
    playBtn.textContent = "▶";
    bars.forEach(bar => bar.style.animationPlayState = "paused");
  }
});

// 💾 Save to Dashboard
saveBtn.addEventListener("click", () => {
  const historyItem = {
    id: Date.now(),
    location: locationText.textContent,
    situation: situationText.textContent,
    soundType: classText.textContent,
    confidence: confidenceText.textContent,
    timestamp: new Date().toLocaleString()
  };

  // Get existing history
  const existingHistory =
    JSON.parse(localStorage.getItem("auralisHistory")) || [];

  // Add new entry
  existingHistory.unshift(historyItem);

  // Save back to localStorage
  localStorage.setItem(
    "auralisHistory",
    JSON.stringify(existingHistory)
  );

  alert("Saved to Dashboard ✅");
});


// 🎵 Handle audio upload
audioUpload.addEventListener("change", () => {
  const file = audioUpload.files[0];
  if (!file) return;

  // Show selected file name
  fileName.textContent = file.name;

  // Load uploaded audio
  const audioURL = URL.createObjectURL(file);
  audio.src = audioURL;

  // Reset UI state
  playBtn.textContent = "▶";
  bars.forEach(bar => bar.style.animationPlayState = "paused");
  result.classList.add("hidden");
});


// When audio ends
audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  bars.forEach(bar => bar.style.animationPlayState = "paused");
});
