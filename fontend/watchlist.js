window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("http://localhost:8008/watchlist", {
    credentials: 'include'
  });

  if (!res.ok) {
    alert("You must be logged in to view your watchlist.");
    return;
  }

  const watchlist = await res.json();
  const container = document.querySelector(".watchlist-grid");

  container.innerHTML = "";

  watchlist.forEach(movie => {
    const div = document.createElement("div");
    div.className = "watchlist-item";
    div.innerHTML = `
      <img src="${movie.image_url}" alt="${movie.title}" />
      <div class="watchlist-info">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
      </div>
    `;
    container.appendChild(div);
  });
});
