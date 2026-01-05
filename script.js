async function loadFactions() {
  const res = await fetch('data/factions.json');
  const factions = await res.json();
  const container = document.getElementById('factions');
  container.innerHTML = '<h2>Factions</h2>';

  factions.forEach(f => {
    container.innerHTML += `
      <div class="card">
        <img src="${f.logo}">
        <div>
          <h3>${f.name}</h3>
          <p>Members: ${f.members.join(', ')}</p>
        </div>
      </div>`;
  });
}

async function loadLeaderboard() {
  const res = await fetch('data/leaderboard.json');
  const users = await res.json();
  const container = document.getElementById('leaderboard');
  container.innerHTML = '<h2>Leaderboard</h2>';

  users.forEach(u => {
    container.innerHTML += `
      <div class="card">
        <img src="${u.avatar}">
        <div>
          <h3>${u.username}</h3>
          <p>${u.specialty}</p>
          <div>${u.ranks.map(r => `<span class="badge">${r}</span>`).join('')}</div>
        </div>
      </div>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadFactions();
  loadLeaderboard();

  document.getElementById('requestForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log('SERVICE REQUEST:', data);
    document.getElementById('formStatus').innerText =
      'Request submitted successfully (logged to console / backend-ready).';
    e.target.reset();
  });
});

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
