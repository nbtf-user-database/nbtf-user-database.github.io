const points = {
  LT1: 100,
  LT2: 200,
  LT3: 300,
  HT1: 150,
  HT2: 300,
  HT3: 450
};

function getTier(total) {
  if (total >= 1800) return ["tiers/combat_ace.webp", "Combat Ace"];
  if (total >= 1000) return ["tiers/combat_grandmaster.webp", "Combat Grandmaster"];
  return ["tiers/combat_master.webp", "Combat Master"];
}

const leaderboard = document.getElementById("leaderboard");

users.forEach((user, index) => {
  const total = user.categories.reduce(
    (a, c) => a + (points[c.level] || 0), 0
  );

  const [icon, tierName] = getTier(total);

  const card = document.createElement("div");
  card.className = "entry";

  card.innerHTML = `
    <img class="shimmer" src="${user.shimmer}">
    <div class="rank">#${index + 1}</div>

    <img class="avatar" src="${user.avatar}">

    <div class="info">
      <div class="username">${user.username}</div>
      <div class="tier">
        <img src="${icon}">
        ${tierName} • ${total} pts
      </div>
    </div>

    <div class="badges">
      ${user.categories.map(c => `
        <div class="medal">
          <div class="medal-circle">
            <img src="${c.icon}">
          </div>
          <div class="medal-rank">${c.level}</div>
        </div>
      `).join("")}
    </div>
  `;

  leaderboard.appendChild(card);
});
