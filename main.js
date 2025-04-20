fetch('data/news.json')
  .then(response => response.json())
  .then(news => {
    const container = document.getElementById("news-container");

    news.forEach(item => {
      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <h2>${item.title}</h2>
        <p><strong>Źródło:</strong> ${item.source} | <strong>Data:</strong> ${item.date}</p>
        <a href="${item.link}" target="_blank">Czytaj więcej</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Błąd podczas wczytywania newsów:", error);
  });
