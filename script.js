const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1457786468771823776/lW92xFa56RzKHBY1FIsiFUoBWuA89JQXN364mhPD2_zw5cbfFI-IXlD-Y8tvx3Stpusp";

async function loadFactions() {
  const data = await fetch('data/factions.json').then(r=>r.json());
  const el = document.getElementById('factions');
  el.innerHTML = '<h2>Factions</h2>';
  data.forEach(f => {
    el.innerHTML += `
      <div class="card">
        <img src="${f.logo}">
        <div>
          <strong>${f.name}</strong>
          <div>${f.members.length} members</div>
        </div>
      </div>`;
  });
}

async function loadLeaderboard() {
  const data = await fetch('data/leaderboard.json').then(r=>r.json());
  const el = document.getElementById('leaderboard');
  el.innerHTML = '<h2>Rankings</h2>';
  data.forEach((u,i) => {
    el.innerHTML += `
      <div class="card">
        <strong>#${i+1}</strong>
        <img src="${u.avatar}">
        <div>
          <div>${u.username}</div>
          <div>${u.specialty}</div>
          <div>${u.ranks.map(r=>`<span class="badge">${r}</span>`).join('')}</div>
        </div>
      </div>`;
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadFactions(); loadLeaderboard();

  document.getElementById('requestForm').onsubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await fetch(DISCORD_WEBHOOK_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        content:`**New Service Request**
User: ${data.username}
Faction: ${data.faction||'None'}
Type: ${data.requestType}
Budget: ${data.budget}
${data.description}`
      })
    });
    document.getElementById('formStatus').innerText = "Request sent successfully.";
    e.target.reset();
  }
});

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
