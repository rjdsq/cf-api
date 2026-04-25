import { connect } from 'cloudflare:sockets';

const COUNTRY_MAP = {"BD":"孟加拉国","BE":"比利时","BF":"布基纳法索","BG":"保加利亚","BA":"波黑","BB":"巴巴多斯","WF":"瓦利斯和富图纳","BL":"圣巴泰勒米","BM":"百慕大","BN":"文莱","BO":"玻利维亚","BH":"巴林","BI":"布隆迪","BJ":"贝宁","BT":"不丹","JM":"牙买加","BV":"布韦岛","BW":"博茨瓦纳","WS":"萨摩亚","BR":"巴西","BS":"巴哈马","JE":"泽西岛","BY":"白俄罗斯","BZ":"伯利兹","RU":"俄罗斯","RW":"卢旺达","RS":"塞尔维亚","TL":"东帝汶","RE":"留尼汪","TM":"土库曼斯坦","TJ":"塔吉克斯坦","RO":"罗马尼亚","TK":"托克劳","GW":"几内亚比绍","GU":"关岛","GT":"危地马拉","GS":"南乔治亚岛和南桑威奇群岛","GR":"希腊","GQ":"赤道几内亚","GP":"瓜德罗普","JP":"日本","GY":"圭亚那","GG":"根西岛","GF":"法属圭亚那","GE":"格鲁吉亚","GD":"格林纳达","GB":"英国","GA":"加蓬","SV":"萨尔瓦多","GN":"几内亚","GM":"冈比亚","GL":"格陵兰","GI":"直布罗陀","GH":"加纳","OM":"阿曼","TN":"突尼斯","JO":"约旦","HR":"克罗地亚","HT":"海地","HU":"匈牙利","HK":"香港","HN":"洪都拉斯","HM":"赫德岛和麦克唐纳群岛","VE":"委内瑞拉","PR":"波多黎各","PS":"巴勒斯坦","PW":"帕劳","PT":"葡萄牙","SJ":"斯瓦尔巴岛和扬马延岛","PY":"巴拉圭","IQ":"伊拉克","PA":"巴拿马","PF":"法属波利尼西亚","PG":"巴布亚新几内亚","PE":"秘鲁","PK":"巴基斯坦","PH":"菲律宾","PN":"皮特凯恩群岛","PL":"波兰","PM":"圣皮埃尔和密克隆","ZM":"赞比亚","EH":"西撒哈拉","EE":"爱沙尼亚","EG":"埃及","ZA":"南非","EC":"厄瓜多尔","IT":"意大利","VN":"越南","SB":"所罗门群岛","ET":"埃塞俄比亚","SO":"索马里","ZW":"津巴布韦","SA":"沙特阿拉伯","ES":"西班牙","ER":"厄立特里亚","ME":"黑山","MD":"摩尔多瓦","MG":"马达加斯加","MF":"圣马丁","MA":"摩洛哥","MC":"摩纳哥","UZ":"乌兹别克斯坦","MM":"缅甸","ML":"马里","MO":"澳门","MN":"蒙古","MH":"马绍尔群岛","MK":"马其顿","MU":"毛里求斯","MT":"马耳他","MW":"马拉维","MV":"马尔代夫","MQ":"马提尼克","MP":"北马里亚纳群岛","MS":"蒙特赛拉特","MR":"毛里塔尼亚","IM":"曼岛","UG":"乌干达","TZ":"坦桑尼亚","MY":"马来西亚","MX":"墨西哥","IL":"以色列","FR":"法国","IO":"英属印度洋领地","SH":"圣赫勒拿","FI":"芬兰","FJ":"斐济","FK":"福克兰群岛","FM":"密克罗尼西亚","FO":"法罗群岛","NI":"尼加拉瓜","NL":"荷兰","NO":"挪威","NA":"纳米比亚","VU":"瓦努阿图","NC":"新喀里多尼亚","NE":"尼日尔","NF":"诺福克岛","NG":"尼日利亚","NZ":"新西兰","NP":"尼泊尔","NR":"瑙鲁","NU":"纽埃","CK":"库克群岛","XK":"科索沃","CI":"科特迪瓦","CH":"瑞士","CO":"哥伦比亚","CN":"中国","CM":"喀麦隆","CL":"智利","CC":"科科斯群岛","CA":"加拿大","CG":"刚果","CF":"中非","CD":"刚果(金)","CZ":"捷克","CY":"塞浦路斯","CX":"圣诞岛","CR":"哥斯达黎加","CW":"库拉索","CV":"佛底角","CU":"古巴","SZ":"斯威士兰","SY":"叙利亚","KG":"吉尔吉斯斯坦","KE":"肯尼亚","SR":"苏里南","KI":"基里巴斯","KH":"柬埔寨","KN":"圣基茨和尼维斯","KM":"科摩罗","ST":"圣多美和普林西比","SK":"斯洛伐克","KR":"韩国","SI":"斯洛文尼亚","KP":"朝鲜","KW":"科威特","SN":"塞内加尔","SM":"圣马力诺","SL":"塞拉利昂","SC":"塞舌尔","KZ":"哈萨克斯坦","KY":"开曼群岛","SG":"新加坡","SE":"瑞典","SD":"苏丹","DO":"多米尼加","DM":"多米尼克","DJ":"吉布提","DK":"丹麦","VG":"英属维尔京群岛","DE":"德国","YE":"也门","DZ":"阿尔及利亚","US":"美国","UY":"乌拉圭","YT":"马约特","UM":"美国本土外小岛屿","LB":"黎巴嫩","LC":"圣卢西亚","LA":"老挝","TV":"图瓦卢","TW":"台湾","TT":"特立尼达和多巴哥","TR":"土耳其","LK":"斯里兰卡","LI":"列支敦士登","LV":"拉脱维亚","TO":"汤加","LT":"立陶宛","LU":"卢森堡","LR":"利比里亚","LS":"莱索托","TH":"泰国","TF":"法属南部领地","TG":"多哥","TD":"乍得","TC":"特克斯和凯科斯群岛","LY":"利比亚","VA":"梵蒂冈","VC":"圣文森特和格林纳丁斯","AE":"阿联酋","AD":"安道尔","AG":"安提瓜和巴布达","AF":"阿富汗","AI":"安圭拉","VI":"美属维尔京群岛","IS":"冰岛","IR":"伊朗","AM":"亚美尼亚","AL":"阿尔巴尼亚","AO":"安哥拉","AQ":"南极洲","AS":"美属萨摩亚","AR":"阿根廷","AU":"澳大利亚","AT":"奥地利","AW":"阿鲁巴","IN":"印度","AX":"奥兰群岛","AZ":"阿塞拜疆","IE":"爱尔兰","ID":"印尼","UA":"乌克兰","QA":"卡塔尔","MZ":"莫桑比克"};
const SORT_WEIGHT = { 'HK': 1, 'TW': 2, 'CN': 3, 'JP': 4, 'KR': 5, 'SG': 6, 'US': 7 };

const DEF_TEMPLATES = [{id:"t1",name:"默认模板",fmt:["flag","space","country","inc"]}];
const DEF_PATHS = [{name:"默认路径",path:"sub",tid:"t1"}];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    const currentAdmin = await env.PK.get("SYS_ADMIN") || "123";
    const isAuth = cookie.includes(`auth=${currentAdmin}`);

    const pathsStr = await env.PK.get("PATHS") || JSON.stringify(DEF_PATHS);
    const pathsData = JSON.parse(pathsStr);

    let matchedPath = pathsData.find(p => {
      let pt = p.path.startsWith('/') ? p.path : '/' + p.path;
      return pt === url.pathname;
    });

    if (matchedPath) {
      return await handleSub(env, matchedPath.tid);
    }

    let savedAdminPath = await env.PK.get("SYS_ADMIN_PATH");
    if (savedAdminPath === null) savedAdminPath = "admin";
    const expectedAdminPath = savedAdminPath ? (savedAdminPath.startsWith('/') ? savedAdminPath : '/' + savedAdminPath) : '/';

    if (url.pathname === "/login" && request.method === "POST") {
      const { pwd } = await request.json();
      if (pwd === currentAdmin) {
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Set-Cookie": `auth=${currentAdmin}; Path=/; HttpOnly; Max-Age=2592000`, "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify({ ok: false }), { status: 401 });
    }

    if (url.pathname === "/api/logout" && request.method === "POST") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Set-Cookie": "auth=; Path=/; HttpOnly; Max-Age=0", "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/data" && request.method === "GET") {
      if (!isAuth) return new Response("401", { status: 401 });
      return new Response(JSON.stringify({
        groups: JSON.parse(await env.PK.get("GROUPS") || "[]"),
        templates: JSON.parse(await env.PK.get("TEMPLATES") || JSON.stringify(DEF_TEMPLATES)),
        paths: pathsData
      }));
    }

    if (url.pathname === "/api/save-all" && request.method === "POST") {
      if (!isAuth) return new Response("401", { status: 401 });
      const d = await request.json();
      await env.PK.put("GROUPS", JSON.stringify(d.groups));
      await env.PK.put("TEMPLATES", JSON.stringify(d.templates));
      await env.PK.put("PATHS", JSON.stringify(d.paths));
      return new Response(JSON.stringify({ ok: true }));
    }

    if (url.pathname === "/api/sys-get") {
      if (!isAuth) return new Response("401", { status: 401 });
      return new Response(JSON.stringify({
        admin: currentAdmin,
        token: await env.PK.get("SYS_TOKEN") || "",
        admin_path: savedAdminPath,
        kv_ok: !!env.PK
      }));
    }

    if (url.pathname === "/api/sys-set" && request.method === "POST") {
      if (!isAuth) return new Response("401", { status: 401 });
      const data = await request.json();
      if (data.admin !== undefined) await env.PK.put("SYS_ADMIN", data.admin);
      if (data.token !== undefined) await env.PK.put("SYS_TOKEN", data.token);
      if (data.admin_path !== undefined) await env.PK.put("SYS_ADMIN_PATH", data.admin_path);
      return new Response(JSON.stringify({ ok: true }));
    }

    if (url.pathname === "/api/clear-cache" && request.method === "POST") {
      if (!isAuth) return new Response("401", { status: 401 });
      const list = await env.PK.list();
      for (const k of list.keys) {
        if (k.name.includes('.') || k.name.includes(':')) {
          await env.PK.delete(k.name);
        }
      }
      return new Response(JSON.stringify({ ok: true }));
    }

    if (url.pathname === expectedAdminPath || url.pathname === expectedAdminPath + '/') {
      if (!isAuth) return new Response(renderLogin(), { headers: { "Content-Type": "text/html" } });
      return new Response(renderAdmin(), { headers: { "Content-Type": "text/html" } });
    }

    return new Response(render404(), { status: 404, headers: { "Content-Type": "text/html" } });
  }
};

async function handleSub(env, tid) {
  const kvGroups = JSON.parse(await env.PK.get("GROUPS") || "[]");
  const templates = JSON.parse(await env.PK.get("TEMPLATES") || JSON.stringify(DEF_TEMPLATES));
  let tpl = templates.find(t => t.id === tid);
  if (!tpl) tpl = DEF_TEMPLATES[0];

  const allUrls = [...new Set(kvGroups.flatMap(g => g.urls))].map(u => u.trim()).filter(u => u.startsWith('http'));
  const resps = await Promise.all(allUrls.map(u => fetch(u).then(r => r.text()).catch(() => "")));
  const ipMap = new Map();
  const v4Reg = /^(\d{1,3}\.){3}\d{1,3}$/;
  const token = await env.PK.get("SYS_TOKEN") || "";

  resps.forEach(t => {
    t.split('\n').forEach(l => {
      const c = l.trim(); if (!c || c.startsWith('<')) return;
      const m = c.split('#')[0].split(' ')[0].trim();
      let h, p = "443";
      if (m.startsWith('[')) {
        const e = m.indexOf(']');
        if (e > -1) { h = m.substring(0, e + 1); const a = m.substring(e + 1); if (a.startsWith(':')) p = a.substring(1); }
      } else {
        const pts = m.split(':'); h = pts[0]; if (pts[1]) p = pts[1];
      }
      if (h) ipMap.set(h, p);
    });
  });

  let externalFetchCount = 0;
  const list = await Promise.all(Array.from(ipMap.entries()).map(async ([h, p]) => {
    const isV6 = h.startsWith('['), isV4 = v4Reg.test(h);
    if (!isV4 && !isV6) return { type: 3, h, p, flag: "", cn: h, w: 999 };
    const q = h.replace(/[\[\]]/g, '');
    let geo = JSON.parse(await env.PK.get(q) || "null");
    if (!geo && externalFetchCount < 40) {
      externalFetchCount++;
      try {
        const r = await fetch(`https://ipinfo.io/${q}?token=${token}`);
        const d = await r.json();
        if (d.country) {
          geo = { cn: COUNTRY_MAP[d.country] || d.country, code: d.country };
          await env.PK.put(q, JSON.stringify(geo), { expirationTtl: 604800 });
        }
      } catch (e) {}
    }
    return { type: isV4 ? 1 : 2, h, p, flag: geo ? codeToFlag(geo.code) : "🏳️", cn: geo ? geo.cn : "未知", w: geo ? (SORT_WEIGHT[geo.code] || 50) : 100 };
  }));

  list.sort((a, b) => a.type !== b.type ? a.type - b.type : a.type === 1 ? a.w - b.w : a.h.length - b.h.length);
  const ct = {};
  const out = list.map(i => {
    if (i.type === 3) return `${i.h}:${i.p}#${i.cn}`;
    ct[i.cn] = (ct[i.cn] || 0) + 1;
    let nameStr = "";
    for(const tk of tpl.fmt){
      if(tk==='flag') nameStr += i.flag;
      else if(tk==='space') nameStr += ' ';
      else if(tk==='country') nameStr += i.cn;
      else if(tk==='inc') nameStr += ct[i.cn];
      else if(tk.startsWith('txt:')) nameStr += tk.substring(4);
    }
    return `${i.h}:${i.p}#${nameStr}`;
  });

  return new Response(out.join('\n'), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

function codeToFlag(c) { return c.toUpperCase().replace(/./g, x => String.fromCodePoint(x.charCodeAt(0) + 127397)); }

function render404() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><style>
    :root{--c:#00ff41;--b:#0a0a0a}
    body{background:var(--b);color:var(--c);font-family:'Courier New',monospace;height:100vh;margin:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
    body::after{content:"";position:fixed;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,65,0.02) 2px,rgba(0,255,65,0.02) 4px);pointer-events:none;z-index:1}
    .clk{position:fixed;border:1.5px solid rgba(0,255,65,0.6);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;animation:ca 0.6s ease-out forwards;z-index:9999}
    @keyframes ca{0%{width:0px;height:0px;opacity:0.8}100%{width:80px;height:80px;opacity:0}}
  </style></head><body>
    <canvas id="cvs" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.6;pointer-events:none;"></canvas>
    <div style="position:relative;z-index:10;text-align:center;">
      <div style="font-size:48px;font-weight:100;letter-spacing:15px;text-shadow:0 0 8px rgba(0,255,65,0.4);margin:0;">404</div>
    </div>
    <script>
      const c=document.getElementById('cvs'),ctx=c.getContext('2d');
      let w=c.width=window.innerWidth,h=c.height=window.innerHeight,pts=[];
      window.onresize=()=>{w=c.width=window.innerWidth;h=c.height=window.innerHeight;};
      for(let i=0;i<80;i++)pts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8});
      function d(){
        ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(0,255,65,0.5)';ctx.strokeStyle='rgba(0,255,65,0.15)';
        for(let i=0;i<pts.length;i++){
          let p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
          ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,Math.PI*2);ctx.fill();
          for(let j=i+1;j<pts.length;j++){
            let p2=pts[j],dx=p.x-p2.x,dy=p.y-p2.y;
            if(dx*dx+dy*dy<10000){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();}
          }
        }
        requestAnimationFrame(d);
      }
      d();
      document.addEventListener('click',e=>{
        let b=document.createElement('div');b.className='clk';
        b.style.left=e.clientX+'px';b.style.top=e.clientY+'px';
        document.body.appendChild(b);setTimeout(()=>b.remove(),600);
      });
    </script>
  </body></html>`;
}

function renderLogin() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><style>
    :root{--c:#00ff41;--b:#0a0a0a}
    *{-webkit-tap-highlight-color:transparent!important;outline:none!important;box-sizing:border-box;appearance:none}
    body{background:var(--b);color:var(--c);font-family:'Courier New',monospace;height:100vh;margin:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
    body::after{content:"";position:fixed;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,65,0.02) 2px,rgba(0,255,65,0.02) 4px);pointer-events:none;z-index:998}
    input{width:100%;background:rgba(0,0,0,0.5);border:1px solid rgba(0,255,65,0.3);color:var(--c);font-size:14px;padding:15px;margin-bottom:30px;text-align:center;letter-spacing:2px;transition:0.3s;border-radius:2px}
    input:focus{border-color:var(--c);box-shadow:0 0 15px rgba(0,255,65,0.2)}
    input::placeholder{color:rgba(0,255,65,0.3)}
    button{background:transparent;color:var(--c);border:1px solid var(--c);padding:15px 0;width:100%;font-size:14px;letter-spacing:4px;cursor:pointer;transition:0.3s}
    button:hover{background:rgba(0,255,65,0.1);box-shadow:0 0 15px rgba(0,255,65,0.3)}
    .clk{position:fixed;border:1.5px solid rgba(0,255,65,0.6);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;animation:ca 0.6s ease-out forwards;z-index:9999}
    @keyframes ca{0%{width:0px;height:0px;opacity:0.8}100%{width:80px;height:80px;opacity:0}}
  </style></head><body>
    <canvas id="cvs" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.6;pointer-events:none;"></canvas>
    <div style="position:relative;z-index:10;width:300px;text-align:center;">
      <div style="font-size:24px;font-weight:300;margin-bottom:40px;letter-spacing:8px;text-shadow:0 0 15px rgba(0,255,65,0.5);">[ 终 端 核 心 ]</div>
      <input type="password" id="p" placeholder="> 输 入 访 问 密 钥 _">
      <button onclick="l()">[ 进 入 系 统 ]</button>
    </div>
    <script>
      const c=document.getElementById('cvs'),ctx=c.getContext('2d');
      let w=c.width=window.innerWidth,h=c.height=window.innerHeight,pts=[];
      window.onresize=()=>{w=c.width=window.innerWidth;h=c.height=window.innerHeight;};
      for(let i=0;i<80;i++)pts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8});
      function d(){
        ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(0,255,65,0.5)';ctx.strokeStyle='rgba(0,255,65,0.15)';
        for(let i=0;i<pts.length;i++){
          let p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
          ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,Math.PI*2);ctx.fill();
          for(let j=i+1;j<pts.length;j++){
            let p2=pts[j],dx=p.x-p2.x,dy=p.y-p2.y;
            if(dx*dx+dy*dy<10000){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();}
          }
        }
        requestAnimationFrame(d);
      }
      d();
      document.addEventListener('click',e=>{
        let b=document.createElement('div');b.className='clk';
        b.style.left=e.clientX+'px';b.style.top=e.clientY+'px';
        document.body.appendChild(b);setTimeout(()=>b.remove(),600);
      });
      async function l(){
        const i=document.getElementById('p');
        const r=await fetch('/login',{method:'POST',body:JSON.stringify({pwd:i.value})});
        if(r.ok)location.reload();else{
          i.value='';i.placeholder='> 密 钥 错 误 _';
          i.style.borderColor='#ff4444';i.style.color='#ff4444';i.style.boxShadow='0 0 15px rgba(255,68,68,0.4)';
          setTimeout(()=>{i.placeholder='> 输 入 访 问 密 钥 _';i.style.borderColor='';i.style.color='';i.style.boxShadow=''},2000);
        }
      }
    </script>
  </body></html>`;
}

function renderAdmin() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><style>
    :root{--c:#00ff41;--b:#0a0a0a}
    html,body,div,span,a,button,input,textarea,summary,details,select{-webkit-tap-highlight-color:transparent!important;outline:none!important;appearance:none;box-sizing:border-box}
    *:focus{outline:none!important}
    body{background:var(--b);color:var(--c);font-family:'Courier New',monospace;margin:0;padding-top:60px;padding-bottom:60px;line-height:1.4;font-size:12px}
    body::after{content:"";position:fixed;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,65,0.02) 2px,rgba(0,255,65,0.02) 4px);pointer-events:none;z-index:998}
    .sys-frame{position:fixed;top:4px;left:4px;right:4px;bottom:4px;border:1px solid rgba(0,255,65,0.3);pointer-events:none;z-index:9998}
    .main-content{position:relative;z-index:999}
    .container{padding:20px;max-width:800px;margin:0 auto}
    details{border:1px solid var(--c);margin-bottom:15px;background:rgba(0,255,65,0.02)}
    summary{padding:12px;cursor:pointer;border-bottom:1px solid transparent;display:flex;justify-content:space-between;align-items:center}
    details[open] summary{border-bottom:1px solid var(--c);margin-bottom:10px}
    .group-body{padding:15px;padding-top:0}
    input,textarea,select{width:100%;background:#000;border:1px solid var(--c);color:var(--c);padding:10px;margin-bottom:10px;font-family:monospace;font-size:12px;border-radius:0}
    select{padding:8px;background:rgba(0,255,65,0.03)}
    textarea.add-api{height:80px;max-height:100px;resize:vertical;padding:8px;font-size:11px}
    .btn{border:1px solid var(--c);padding:8px 15px;color:var(--c);background:none;cursor:pointer;display:inline-block;font-size:12px;text-transform:uppercase;transition:0.1s}
    .btn:hover{background:rgba(0,255,65,0.1)}
    .btn-main{background:rgba(0,255,65,0.1);font-weight:bold}
    .danger{color:#ff4444;border-color:#ff4444}
    .danger:hover{background:rgba(255,68,68,0.1)}
    .nav{position:fixed;top:4px;left:4px;right:4px;height:40px;background:var(--b);border-bottom:1px solid rgba(0,255,65,0.3);display:flex;align-items:center;z-index:1000}
    .ni{flex:1;text-align:center;font-size:12px;cursor:pointer;opacity:0.6;height:100%;display:flex;align-items:center;justify-content:center;border-right:1px solid rgba(0,255,65,0.3)}
    .ni:last-child{border-right:none}
    .ni.active{opacity:1;font-weight:bold;text-decoration:underline}
    .copy-box{border:1px dashed var(--c);padding:10px;margin-bottom:10px;cursor:pointer;word-break:break-all;font-size:12px;white-space:pre-wrap;background:rgba(0,255,65,0.02)}
    .copy-box:hover{background:rgba(0,255,65,0.05)}
    .kv-status{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px}
    .editable-name{display:inline-block;min-width:20px;padding:2px 4px;line-height:1.2;cursor:text;border:1px solid transparent;border-radius:2px}
    .editable-name:focus{border:1px dashed var(--c)}
    .del-btn-head{padding:0 10px;font-size:14px;font-weight:lighter;color:rgba(255,68,68,0.7);user-select:none}
    .del-btn-head:hover{color:#ff4444}
    .url-row{position:relative;margin-bottom:8px}
    .url-row input{margin:0;padding:0 24px 0 6px;background:rgba(0,255,65,0.03);border:1px solid rgba(0,255,65,0.3);transition:0.2s;font-size:11px;height:26px}
    .url-row input:focus{background:#000;border-color:var(--c)}
    .url-del{position:absolute;right:6px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:14px;line-height:1;color:rgba(0,255,65,0.5);transition:0.1s;user-select:none}
    .url-del:hover{color:#ff4444}
    .ui-ov{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);display:none;align-items:center;justify-content:center;z-index:1002}
    .ui-bx{background:#0a0a0a;border:1px solid var(--c);padding:20px;min-width:260px;box-shadow:0 0 20px rgba(0,255,65,0.05)}
    .toast{position:fixed;bottom:110px;left:50%;transform:translateX(-50%);background:rgba(40,40,40,0.95);color:rgba(0,255,65,0.8);border:1px solid rgba(0,255,65,0.3);padding:8px 16px;z-index:1003;transition:opacity 0.3s;pointer-events:none;opacity:0;border-radius:4px;font-size:12px;white-space:nowrap}
    .clk{position:fixed;border:1.5px solid rgba(0,255,65,0.6);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;animation:ca 0.6s ease-out forwards;z-index:9999}
    @keyframes ca{0%{width:0px;height:0px;opacity:0.8}100%{width:80px;height:80px;opacity:0}}
    .fab-br{position:fixed;bottom:20px;right:20px;display:flex;gap:10px;z-index:1001}
    .tk-tag{display:inline-flex;align-items:center;background:rgba(0,255,65,0.1);border:1px solid var(--c);padding:2px 8px;margin:4px 4px 0 0;font-size:12px;user-select:none}
    .tk-del{cursor:pointer;padding:0 2px;color:#ff4444;margin-left:6px;font-size:14px}
    .tk-add-btn{border:1px dashed var(--c);background:none;color:var(--c);padding:2px 8px;font-size:12px;cursor:pointer;margin:4px 4px 0 0}
    .pv-box{background:#000;border:1px solid var(--c);padding:10px;margin-bottom:15px;text-align:center;font-size:14px;box-shadow:inset 0 0 10px rgba(0,255,65,0.1);line-height:1.6;min-height:45px;display:flex;align-items:center;justify-content:center}
    .path-row{margin-bottom:10px;position:relative}
  </style></head><body>
    <canvas id="cvs" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.6;pointer-events:none;"></canvas>
    <div class="sys-frame"></div>
    <div id="u-ov" class="ui-ov"><div class="ui-bx" id="u-bx"></div></div>
    <div id="u-toast" class="toast"></div>

    <div class="main-content">
      <div id="ta">
        <div class="container" id="list"></div>
        <div class="fab-br">
          <button class="btn" onclick="reqAddG()">新增分组</button>
          <button class="btn btn-main" onclick="reqSaveAll()">保存修改</button>
        </div>
      </div>

      <div id="tc" style="display:none">
        <div class="container">
          <div style="font-weight:bold;margin-bottom:10px;margin-top:10px;border-bottom:1px solid rgba(0,255,65,0.3);padding-bottom:5px">>>> 模板管理</div>
          <div class="pv-box">
             <div id="pv-text" style="font-weight:bold;color:#fff"></div>
          </div>
          <div id="tpl-list"></div>
          
          <div style="font-weight:bold;margin-bottom:10px;margin-top:20px;border-bottom:1px solid rgba(0,255,65,0.3);padding-bottom:5px">>>> API路径映射</div>
          <div id="path-list"></div>
        </div>
        <div class="fab-br">
          <button class="btn" onclick="reqAddPath()">新增路径</button>
          <button class="btn" onclick="reqAddTpl()">新增模板</button>
          <button class="btn btn-main" onclick="reqSaveAll()">保存修改</button>
        </div>
      </div>

      <div class="container" id="ts" style="display:none">
        <div style="margin-bottom:25px">
          <div style="margin-bottom:5px;font-weight:bold;border-bottom:1px solid rgba(0,255,65,0.3);padding-bottom:5px">>>> API地址列表 (点击复制)</div>
          <div id="api-links">请创建 IP API 接口</div>
        </div>
        <div style="border:1px solid var(--c);padding:15px;margin-bottom:15px">
          <div style="margin-bottom:15px">状态: <span id="kv-dot" class="kv-status"></span>KV存储 [<span id="kv-text">...</span>]</div>
          <div style="margin-bottom:10px">后台访问地址 (留空为根目录)</div>
          <input id="sys-admin-path" placeholder="">
          <div style="margin-bottom:10px"><a href="https://ipinfo.io" target="_blank" style="color:var(--c);text-decoration:none">IPINFO_TOKEN (点击前往获取)</a></div>
          <input id="sys-token" placeholder="此项不可留空，请尽快获取填写">
          <div style="margin-bottom:10px">管理密码</div>
          <input id="sys-admin" placeholder="123">
          <button class="btn btn-main" style="width:100%;margin-top:10px" onclick="reqSaveSys()">保存配置</button>
        </div>
        <button class="btn danger" style="width:100%;margin-bottom:15px" onclick="reqCl()">清空地理位置缓存</button>
        <button class="btn danger" style="width:100%" onclick="reqLogout()">退出登录</button>
      </div>
    </div>

    <nav class="nav">
      <div class="ni active" id="n-a" onclick="t('a')">[ 节点池 ]</div>
      <div class="ni" id="n-c" onclick="t('c')">[ API配置 ]</div>
      <div class="ni" id="n-s" onclick="t('s')">[ 系统配置 ]</div>
    </nav>

    <script>
      const c=document.getElementById('cvs'),ctx=c.getContext('2d');
      let w=c.width=window.innerWidth,h=c.height=window.innerHeight,pts=[];
      window.onresize=()=>{w=c.width=window.innerWidth;h=c.height=window.innerHeight;};
      for(let i=0;i<80;i++)pts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*0.8,vy:(Math.random()-.5)*0.8});
      function d(){
        ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(0,255,65,0.5)';ctx.strokeStyle='rgba(0,255,65,0.15)';
        for(let i=0;i<pts.length;i++){
          let p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
          ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,Math.PI*2);ctx.fill();
          for(let j=i+1;j<pts.length;j++){
            let p2=pts[j],dx=p.x-p2.x,dy=p.y-p2.y;
            if(dx*dx+dy*dy<10000){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();}
          }
        }
        requestAnimationFrame(d);
      }
      d();

      let groups=[], templates=[], paths=[], savedPaths=[];
      let isMod = false;
      let activeTplId = 't1';
      let activeTk = { ti: -1, fi: -1 };

      const tkName = { flag:'国旗', space:'空格', country:'国家', inc:'数字递增' };

      document.addEventListener('click',e=>{
        let b=document.createElement('div');b.className='clk';
        b.style.left=e.clientX+'px';b.style.top=e.clientY+'px';
        document.body.appendChild(b);setTimeout(()=>b.remove(),600);
      });

      const UI = {
        close(){ document.getElementById('u-ov').style.display='none'; },
        show(h){ document.getElementById('u-bx').innerHTML=h; document.getElementById('u-ov').style.display='flex'; },
        confirm(msg, cb){
          window._uicb = () => { UI.close(); cb(); };
          UI.show(\`<div style="margin-bottom:15px;font-size:13px">\${msg}</div><div style="display:flex;justify-content:flex-end;gap:10px"><button class="btn" onclick="UI.close()">取消</button><button class="btn btn-main" onclick="_uicb()">确定</button></div>\`);
        },
        prompt(msg, def, cb){
          window._uicb2 = () => { const v=document.getElementById('u-inp').value; UI.close(); cb(v); };
          UI.show(\`<div style="margin-bottom:10px;font-size:13px">\${msg}</div><input id="u-inp" value="\${def}" style="margin-bottom:15px"><div style="display:flex;justify-content:flex-end;gap:10px"><button class="btn" onclick="UI.close()">取消</button><button class="btn btn-main" onclick="_uicb2()">确定</button></div>\`);
        },
        toast(msg){
          const tg = document.getElementById('u-toast');
          tg.innerText = msg; tg.style.opacity = '1';
          setTimeout(() => tg.style.opacity = '0', 2000);
        }
      };

      function markMod(tid = null) {
        isMod = true;
        if(tid) { activeTplId = tid; renderPreview(); }
      }

      async function load(){
        const d = await(await fetch('/api/data')).json();
        groups = d.groups; templates = d.templates; paths = d.paths;
        savedPaths = JSON.parse(JSON.stringify(paths));
        
        const sys=await(await fetch('/api/sys-get')).json();
        document.getElementById('sys-admin-path').value=sys.admin_path;
        document.getElementById('sys-admin').value=sys.admin;
        document.getElementById('sys-token').value=sys.token;
        document.getElementById('kv-dot').style.background=sys.kv_ok?'#0f0':'#f00';
        document.getElementById('kv-text').innerText=sys.kv_ok?'已就绪':'异常/未绑定';
        
        renderGroups();
        renderTpls();
        renderPaths();
        renderPreview();
        renderSubLinks();
      }

      function renderGroups(){
        const b=document.getElementById('list');
        const opens = groups.map((g,i) => document.getElementById('det-'+i)?.open);
        b.innerHTML=groups.map((g,i)=>\`
          <details id="det-\${i}" \${opens[i]?'open':''}>
            <summary>
              <span class="editable-name" contenteditable="false" onclick="this.contentEditable='true';this.focus();event.stopPropagation();" onblur="this.contentEditable='false';groups[\${i}].name=this.innerText.trim();markMod()">\${g.name || '未命名分组'}</span>
              <span class="del-btn-head" onclick="event.preventDefault();event.stopPropagation();reqDelG(\${i})">✖</span>
            </summary>
            <div class="group-body">
              \${g.urls.map((u,ui)=>\`
                <div class="url-row">
                  <input value="\${u}" onchange="groups[\${i}].urls[\${ui}]=this.value;markMod()">
                  <span class="url-del" onclick="groups[\${i}].urls.splice(\${ui},1);markMod();renderGroups();document.getElementById('det-\${i}').open=true">×</span>
                </div>
              \`).join('')}
              <div style="margin-bottom:5px;margin-top:10px">添加新接口 (支持多行粘贴)</div>
              <textarea class="add-api" id="add-api-\${i}" placeholder="在此粘贴新接口，一行一个"></textarea>
            </div>
          </details>
        \`).join('');
      }

      function renderTpls(){
        const b = document.getElementById('tpl-list');
        const opens = templates.map((t,i) => document.getElementById('det-tpl-'+i)?.open);
        b.innerHTML = templates.map((t, i) => \`
          <details id="det-tpl-\${i}" \${opens[i]?'open':''}>
            <summary onclick="markMod('\${t.id}')">
              \${t.id === 't1' ? \`<span class="editable-name" style="cursor:default" onclick="event.stopPropagation();">\${t.name}</span>\` : \`<span class="editable-name" contenteditable="false" onclick="this.contentEditable='true';this.focus();event.stopPropagation();" onblur="this.contentEditable='false';templates[\${i}].name=this.innerText.trim();markMod('\${t.id}')">\${t.name}</span>\`}
              \${t.id === 't1' ? '' : \`<span class="del-btn-head" onclick="event.preventDefault();event.stopPropagation();reqDelTpl(\${i})">✖</span>\`}
            </summary>
            \${t.id === 't1' ? \`
              <div style="padding:15px; border:1px solid rgba(0,255,65,0.3); border-top:none;">
                <div style="opacity:0.7;pointer-events:none">
                  \${t.fmt.map(fk => \`<span class="tk-tag" style="border-color:var(--c)">\${fk.startsWith('txt:') ? '自定义:'+fk.substring(4) : tkName[fk]}</span>\`).join('')}
                </div>
              </div>
            \` : \`
              <div class="group-body" style="border:1px solid rgba(0,255,65,0.3); border-top:none; padding:15px">
                <div style="margin-bottom:12px">
                  \${t.fmt.map((fk, fi) => {
                    let isAct = (activeTk.ti === i && activeTk.fi === fi);
                    let bCol = isAct ? '#fff' : 'var(--c)';
                    return \`<span class="tk-tag" style="border-color:\${bCol}; cursor:pointer;" onclick="activeTk={ti:\${i},fi:\${fi}}; renderTpls(); markMod('\${t.id}')">
                      \${fk.startsWith('txt:') ? '自定义:'+fk.substring(4) : tkName[fk]}
                      <span class="tk-del" onclick="templates[\${i}].fmt.splice(\${fi},1); activeTk={ti:-1,fi:-1}; markMod('\${t.id}'); renderTpls(); event.stopPropagation()">×</span>
                    </span>\`;
                  }).join('')}
                </div>
                <div style="margin-bottom:15px; display:flex; gap:10px;">
                  <button class="btn" style="flex:1; padding:8px;" onclick="mvTk(\${i}, -1)">↑ 前移选中项</button>
                  <button class="btn" style="flex:1; padding:8px;" onclick="mvTk(\${i}, 1)">↓ 后移选中项</button>
                </div>
                <div>
                  <button class="tk-add-btn" onclick="addTk(\${i}, 'flag')">+ 国旗</button>
                  <button class="tk-add-btn" onclick="addTk(\${i}, 'country')">+ 国家</button>
                  <button class="tk-add-btn" onclick="addTk(\${i}, 'space')">+ 空格</button>
                  <button class="tk-add-btn" onclick="addTk(\${i}, 'inc')">+ 递增</button>
                  <button class="tk-add-btn" onclick="addCustomTk(\${i})">+ 自定义文字</button>
                </div>
              </div>
            \`}
          </details>
        \`).join('');
      }

      function renderPaths(){
        const b = document.getElementById('path-list');
        const opens = paths.map((p,i) => document.getElementById('det-path-'+i)?.open);
        b.innerHTML = paths.map((p, i) => \`
          <details class="path-row" id="det-path-\${i}" \${opens[i]?'open':''}>
            <summary>
              <span>
                <span class="editable-name" contenteditable="false" onclick="this.contentEditable='true';this.focus();event.stopPropagation();" onblur="this.contentEditable='false';paths[\${i}].name=this.innerText.trim();markMod()">\${p.name || (i===0?'默认路径':'路径'+(i+1))}</span>
                <span style="opacity:0.6;font-size:11px;margin-left:4px;pointer-events:none"> ( /\${p.path} )</span>
              </span>
              \${paths.length > 1 ? \`<span class="del-btn-head" onclick="event.preventDefault();event.stopPropagation();reqDelPath(\${i})">✖</span>\` : ''}
            </summary>
            <div class="group-body" style="border:1px solid rgba(0,255,65,0.3); border-top:none; padding:15px">
              <div style="margin-bottom:5px">API访问路径 (不含首斜杠)</div>
              <input value="\${p.path}" onchange="paths[\${i}].path=this.value.replace(/^\\//,'');markMod();renderPaths();document.getElementById('det-path-\${i}').open=true">
              <div style="margin-bottom:5px">绑定名称模板</div>
              <select onchange="paths[\${i}].tid=this.value;markMod()">
                \${templates.map(t => \`<option value="\${t.id}" \${t.id===p.tid?'selected':''}>\${t.name}</option>\`).join('')}
              </select>
            </div>
          </details>
        \`).join('');
      }

      function renderPreview() {
        let tpl = templates.find(t => t.id === activeTplId) || templates[0];
        let pStr1 = "", pStr2 = "";
        let hasInc = tpl ? tpl.fmt.includes('inc') : false;
        if(tpl) {
          for(const tk of tpl.fmt){
            if(tk==='flag') { pStr1 += '🇺🇸'; pStr2 += '🇺🇸'; }
            else if(tk==='space') { pStr1 += ' '; pStr2 += ' '; }
            else if(tk==='country') { pStr1 += '美国'; pStr2 += '美国'; }
            else if(tk==='inc') { pStr1 += '1'; pStr2 += '2'; }
            else if(tk.startsWith('txt:')) { pStr1 += tk.substring(4); pStr2 += tk.substring(4); }
          }
        }
        document.getElementById('pv-text').innerHTML = pStr1 + (hasInc ? '<br>' + pStr2 : '');
      }

      function renderSubLinks() {
        if(savedPaths.length === 0) {
          document.getElementById('api-links').innerHTML = '请创建 IP API 接口';
          return;
        }
        let base = window.location.origin.replace(/\\/+$/, '');
        let html = savedPaths.map((p, i) => {
          let pName = p.name || (i === 0 ? '默认路径' : '路径' + (i+1));
          let pt = p.path.startsWith('/') ? p.path : '/' + p.path;
          let url = base + pt;
          return \`<div style="margin-top:10px;margin-bottom:6px;font-weight:bold;opacity:0.8;font-size:11px">>>> \${pName}</div><div class="copy-box" style="margin-bottom:0" onclick="copySub('\${url}')">\${url}</div>\`;
        }).join('');
        const box = document.getElementById('api-links');
        if(box) box.innerHTML = html;
      }

      function copySub(url){
        navigator.clipboard.writeText(url);
        UI.toast('API地址已复制');
      }

      function mvTk(ti, dir) {
        if (activeTk.ti !== ti || activeTk.fi === -1) {
          UI.toast('请先点击选中一个参数');
          return;
        }
        const arr = templates[ti].fmt;
        const fi = activeTk.fi;
        if(fi+dir < 0 || fi+dir >= arr.length) return;
        [arr[fi], arr[fi+dir]] = [arr[fi+dir], arr[fi]];
        activeTk.fi = fi + dir;
        markMod(templates[ti].id);
        renderTpls();
        document.getElementById('det-tpl-'+ti).open = true;
      }

      function addTk(ti, val) {
        templates[ti].fmt.push(val);
        markMod(templates[ti].id);
        renderTpls();
        document.getElementById('det-tpl-'+ti).open = true;
      }

      function addCustomTk(ti) {
        window._uicb2 = () => { 
          const v=document.getElementById('u-inp').value; 
          UI.close(); 
          if(v) {
            templates[ti].fmt.push('txt:' + v);
            markMod(templates[ti].id);
            renderTpls();
            document.getElementById('det-tpl-'+ti).open = true;
          }
        };
        UI.show(\`<div style="margin-bottom:10px;font-size:13px">输入要插入的自定义文字</div><input id="u-inp" value="" style="margin-bottom:15px"><div style="display:flex;justify-content:flex-end;gap:10px"><button class="btn" onclick="UI.close()">取消</button><button class="btn btn-main" onclick="_uicb2()">确定</button></div>\`);
      }

      function reqAddTpl() {
        let idx = 1;
        while(templates.some(t => t.name === '模板' + idx)) idx++;
        const nid = 't' + Date.now();
        templates.push({id: nid, name: '模板' + idx, fmt: ['flag','space','country','inc']});
        markMod(nid);
        renderTpls();
      }

      function reqDelTpl(i) {
        if(templates.length <= 1) { UI.toast('至少保留一个模板'); return; }
        UI.confirm('删除模板会影响绑定的路径，确认删除？', () => {
          const delId = templates[i].id;
          templates.splice(i, 1);
          paths.forEach(p => { if(p.tid === delId) p.tid = templates[0].id; });
          markMod(templates[0].id);
          activeTk = { ti: -1, fi: -1 };
          renderTpls();
          renderPaths();
        });
      }

      function reqAddPath() {
        let idx = 1;
        while(paths.some(p => p.name === '路径' + idx)) idx++;
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        let randStr = '';
        for(let i=0; i<4; i++) randStr += chars.charAt(Math.floor(Math.random() * chars.length));
        paths.push({name: '路径' + idx, path: randStr, tid: templates[0].id});
        markMod();
        renderPaths();
      }

      function reqDelPath(i) {
        UI.confirm('确认删除该路径？', () => {
          paths.splice(i, 1);
          markMod();
          renderPaths();
        });
      }

      function reqAddG(){
        if(groups.filter(g => g.urls.length === 0).length >= 3) {
          UI.toast('最多支持保留3个空分组');
          return;
        }
        let idx = 1;
        while(groups.some(g => g.name === '分组' + idx)) idx++;
        window._uicb2 = () => { 
          const v=document.getElementById('u-inp').value; 
          UI.close(); 
          groups.push({name: v.trim() || '分组' + idx, urls: []});
          markMod();
          renderGroups();
        };
        UI.show(\`<div style="margin-bottom:10px;font-size:13px">请输入新分组名称</div><input id="u-inp" value="\${'分组' + idx}" style="margin-bottom:15px"><div style="display:flex;justify-content:flex-end;gap:10px"><button class="btn" onclick="UI.close()">取消</button><button class="btn btn-main" onclick="_uicb2()">确定</button></div>\`);
      }

      function reqDelG(i){
        UI.confirm('确认删除该分组？', () => {
          groups.splice(i,1);
          markMod();
          renderGroups();
        });
      }

      function flushMultiInputs() {
        groups.forEach((g, i) => {
          const el = document.getElementById('add-api-' + i);
          if(el && el.value.trim()) {
            const lines = el.value.split('\\n').map(l=>l.trim()).filter(l=>l);
            if(lines.length>0) g.urls = [...new Set([...g.urls, ...lines])];
            el.value = '';
          }
        });
      }

      function reqSaveAll(){
        flushMultiInputs();
        if(!isMod){ UI.toast('未修改'); return; }
        UI.confirm('确认保存所有更改？', async () => {
          await fetch('/api/save-all',{method:'POST',body:JSON.stringify({groups, templates, paths})});
          isMod = false;
          UI.toast('数据已保存');
          savedPaths = JSON.parse(JSON.stringify(paths));
          renderGroups();
          renderSubLinks();
          Array.from(document.querySelectorAll('details')).forEach(d=>d.open=false);
        });
      }

      function reqSaveSys(){
        UI.confirm('确认保存配置？', async () => {
          await fetch('/api/sys-set',{method:'POST',body:JSON.stringify({
            admin_path: document.getElementById('sys-admin-path').value,
            admin: document.getElementById('sys-admin').value,
            token: document.getElementById('sys-token').value
          })});
          UI.toast('配置已保存');
          setTimeout(() => {
            let n = document.getElementById('sys-admin-path').value.trim();
            location.href = n ? (n.startsWith('/') ? n : '/' + n) : '/';
          }, 800);
        });
      }

      function reqLogout(){
        UI.confirm('确认退出登录？', async () => {
          await fetch('/api/logout', { method: 'POST' });
          location.reload();
        });
      }

      function reqCl(){
        UI.confirm('确认清空地理位置缓存？', async () => {
          await fetch('/api/clear-cache',{method:'POST'});
          UI.toast('缓存已清空');
        });
      }

      function t(x){
        document.getElementById('ta').style.display=x==='a'?'block':'none';
        document.getElementById('tc').style.display=x==='c'?'block':'none';
        document.getElementById('ts').style.display=x==='s'?'block':'none';
        document.getElementById('n-a').classList.toggle('active',x==='a');
        document.getElementById('n-c').classList.toggle('active',x==='c');
        document.getElementById('n-s').classList.toggle('active',x==='s');
      }

      load();
    </script>
  </body></html>`;
}
