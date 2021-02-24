let cfxlink = process.argv[2];
const request = require('request');



if(!cfxlink.startsWith("http"))
    cfxlink = "https://"+cfxlink;

if(!cfxlink.match( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/))
    console.log("[CFX RESOLVER] LINK INVALIDO");
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
        tentativas++;
        console.log(`[CFX RESOLVER] RESOLVENDO, TENTATIVA NUMERO ${tentativas}`)
        r = await getCFXHeader(r);
    }
    console.log(`[CFX RESOLVER] CFX ${cfxlink} RESOLVIDO PARA ${r}`);
})

} catch {console.log("[CFX RESOLVE] ERRO NÃO ESPERADO!")}
