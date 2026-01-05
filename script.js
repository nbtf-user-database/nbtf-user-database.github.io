
const icons = { CMT:'assets/icons/cmt.png', CTR:'assets/icons/ctr.png', JAT:'assets/icons/jat.png' };
let data=[];
function cls(i){return i===0?'gold':i===1?'silver':i===2?'bronze':'';}
async function load(){
  data = await fetch('data/leaderboard.json').then(r=>r.json());
  render(data);
}
function render(d){
  const el=document.getElementById('leaderboard');
  el.innerHTML='<div class="section-title">Leaderboard</div>';
  d.forEach((u,i)=>{
    el.innerHTML+=`
    <div class="lb-row ${cls(i)}">
      <div class="rank">${i+1}</div>
      <img class="avatar" src="${u.avatar}">
      <div class="info">
        <div class="username">${u.username}</div>
        <div class="subtitle">${u.title}</div>
      </div>
      <div class="badges">
        ${u.badges.map(b=>`<div class="badge"><img src="${icons[b.type]}">${b.type} ${b.tier}</div>`).join('')}
      </div>
    </div>`;
  });
}
document.getElementById('search').oninput=e=>{
  const q=e.target.value.toLowerCase();
  render(data.filter(u=>u.username.toLowerCase().includes(q)));
};
load();
