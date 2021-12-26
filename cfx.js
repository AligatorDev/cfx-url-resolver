let cfxlink = process.argv[2];
const fetch = require('node-fetch');
if(!cfxlink) 
{
    console.log("[CFX RESOLVER] cfx (link)");
    process.exit(0);
}

if(!cfxlink.startsWith("http"))
    cfxlink = "https://"+cfxlink;

if(!cfxlink.match( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/))
{
    console.log("[CFX RESOLVER] LINK INVALIDO");
    process.exit(0);
}   

const headers = {
    Host: "servers-frontend.fivem.net",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip, deflate, br",
    "Alt-Used": "servers-frontend.fivem.net",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "cross-site",
    "Sec-GPC": "1",
    "DNT": "1",
    "Cache-Control": "max-age=0"
}

try {
setTimeout(async () => {

    console.log("[CFX RESOLVER] COMEÇANDO A RESOLVER...");
    r = await (new Promise((finish,reject) =>{
        fetch(`http://servers-frontend.fivem.net/api/servers/single/${cfxlink.split("/")[4]}`,{headers:headers}).then(body => body.json()).then(body=> {
            finish(body.Data.connectEndPoints[0]);
        });
    }))
    if(!r) return  console.log(`[CFX RESOLVER] SERVIDOR OFFLINE!`);
    console.log(`[CFX RESOLVER] CFX ${cfxlink} RESOLVIDO PARA ${r}`);

})

} catch {console.log("[CFX RESOLVE] ERRO NÃO ESPERADO!")}
