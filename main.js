const news = [
    {
      title: "Atak na Zaufaną Trzecią Stronę – fałszywe wiadomości SMS",
      link: "https://zaufanatrzeciastrona.pl",
      source: "Zaufana Trzecia Strona",
      date: "2025-04-20"
    },
    {
      title: "CERT Orange ostrzega przed kampanią phishingową na klientów banków",
      link: "https://cert.orange.pl",
      source: "CERT Orange",
      date: "2025-04-19"
    }
  ];
  
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
  