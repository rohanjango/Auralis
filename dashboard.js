const historyList = document.getElementById("historyList");

const history =
  JSON.parse(localStorage.getItem("auralisHistory")) || [];

if (history.length === 0) {
  historyList.innerHTML = "<p>No history available.</p>";
} else {
  history.forEach(item => {
    const card = document.createElement("div");
    card.className = "result";

    card.innerHTML = `
      <p><strong>📍 Location:</strong> ${item.location}</p>
      <p><strong>🧠 Situation:</strong> ${item.situation}</p>
      <p><strong>🔊 Sound:</strong> ${item.soundType}</p>
      <p><strong>📊 Confidence:</strong> ${item.confidence}</p>
      <p><small>${item.timestamp}</small></p>
    `;

    historyList.appendChild(card);
  });
}
