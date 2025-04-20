fetchNewsyOncePerDay();

function fetchNewsyOncePerDay() {
  const lastLoad = localStorage.getItem("lastNewsyLoad");
  const now = new Date();
  const todayAtFour = new Date();
  todayAtFour.setHours(4, 0, 0, 0);

  if (!lastLoad || new Date(lastLoad).toDateString() !== now.toDateString() || now > todayAtFour && new Date(lastLoad) < todayAtFour) {
    fetch('data/newsy.json')
      .then(response => response.json())
      .then(newsy => {
        const container = document.getElementById("newsy-container");
        container.innerHTML = "";
        newsy.forEach(item => {
          const card = document.createElement("div");
          card.className = "newsy-card";
          card.innerHTML = `
            <h2>${item.title}</h2>
            <p><strong>Źródło:</strong> ${item.source} | <strong>Data:</strong> ${item.date}</p>
            ${item.description ? `<p>${item.description}</p>` : ""}
            <a href="${item.link}" target="_blank">Czytaj więcej</a>
          `;
          container.appendChild(card);
        });
        localStorage.setItem("lastNewsyLoad", now.toISOString());
      })
      .catch(error => console.error("Błąd podczas wczytywania newsów:", error));
  }
}
