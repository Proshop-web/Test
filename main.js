// Uniwersalny main.js dla wszystkich podstron

const path = window.location.pathname;

if (path.includes("newsy")) fetchNewsy();
if (path.includes("events")) fetchEvents();
if (path.includes("reports")) fetchReports();

function fetchNewsy() {
  const lastLoad = localStorage.getItem("lastnewsyLoad");
  const now = new Date();
  const todayAtFour = new Date();
  todayAtFour.setHours(4, 0, 0, 0);

  if (!lastLoad || new Date(lastLoad).toDateString() !== now.toDateString() || now > todayAtFour && new Date(lastLoad) < todayAtFour) {
    fetch('data/newsy.json')
      .then(response => response.json())
      .then(news => {
        const container = document.getElementById("news-container");
        if (!container) return;
        container.innerHTML = "";
        news.forEach(item => {
          const card = document.createElement("div");
          card.className = "news-card";
          card.innerHTML = `
            <h2>${item.title}</h2>
            <p><strong>Źródło:</strong> ${item.source} | <strong>Data:</strong> ${item.date}</p>
            ${item.description ? `<p>${item.description}</p>` : ""}
            <a href="${item.link}" target="_blank">Czytaj więcej</a>
          `;
          container.appendChild(card);
        });
        localStorage.setItem("lastnewsyLoad", now.toISOString());
      })
      .catch(error => console.error("Błąd podczas wczytywania newsów:", error));
  }
}

function fetchEvents() {
  const miesiacePL = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  let aktualnyMiesiac = new Date().getMonth();
  let aktualnyRok = new Date().getFullYear();

  const label = document.getElementById("miesiac-nazwa");
  const lista = document.getElementById("lista-wydarzen");
  if (!label || !lista) return;

  label.textContent = `${miesiacePL[aktualnyMiesiac]} ${aktualnyRok}`;

  fetch('data/events.json')
    .then(res => res.json())
    .then(events => {
      lista.innerHTML = "";
      events.filter(e => {
        const data = new Date(e.date);
        return data.getMonth() === aktualnyMiesiac && data.getFullYear() === aktualnyRok;
      }).forEach(e => {
        const box = document.createElement("div");
        box.className = "event-entry";
        box.innerHTML = `
          <h3>${e.date} – ${e.title}</h3>
          <p><strong>Miejsce:</strong> ${e.location}</p>
          <p>${e.description}</p>
          <a href="${e.link}" target="_blank">Zobacz</a>
        `;
        lista.appendChild(box);
      });
    });
}

function fetchReports() {
  const container = document.getElementById("raporty-container");
  if (!container) return;

  fetch('data/reports.json')
    .then(res => res.json())
    .then(raporty => {
      container.innerHTML = "";
      raporty.forEach(r => {
        const div = document.createElement("div");
        div.className = "report-entry";
        div.innerHTML = `
          <h3>${r.title}</h3>
          <p><strong>Źródło:</strong> ${r.source} | <strong>Data:</strong> ${r.date}</p>
          <p>${r.description}</p>
          <a href="${r.link}" target="_blank">Zobacz raport</a>
        `;
        container.appendChild(div);
      });
    });
}
