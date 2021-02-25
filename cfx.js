let cfxlink = process.argv[2];
const request = require('request');
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
function getCFXHeader(link) 
{
    return new Promise((finish,reject) =>{
        request(link, (err, res, body) => {
            if (err) { return console.log(err); }
            finish(res.headers["x-citizenfx-url"])
        });
    });
}



try {
let tentativas = 0;
setTimeout(async () => {
    console.log("[CFX RESOLVER] COMEÇANDO A RESOLVER...");

    let r = await getCFXHeader(cfxlink);

    while (r.includes("users.cfx.re")) {
        r = await getCFXHeader(r);
        tentativas++;
        console.log(`[CFX RESOLVER] RESOLVENDO, TENTATIVA NUMERO ${tentativas}, IP RESOLVIDO : ${r}`)
        if (tentativas == 3) {
            console.log("[CFX RESOLVER] NUMERO DE TENTATIVAS EXCEDIDO, TROCANDO DE METODO!")
            r = await (new Promise((finish,reject) =>{
                request(`https://servers-frontend.fivem.net/api/servers/single/${cfxlink.split("/")[4]}`, (err, res, body) => {
                    if (err) { return console.log(err); }
                    finish(JSON.parse(body).Data.connectEndPoints[0]);
                });
            }));
            break;
        }
    }
    console.log(`[CFX RESOLVER] CFX ${cfxlink} RESOLVIDO PARA ${r}`);
})

} catch {console.log("[CFX RESOLVE] ERRO NÃO ESPERADO!")}
