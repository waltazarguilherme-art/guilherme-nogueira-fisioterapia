const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const port=process.env.PORT||3000;
const indexPath=path.join(__dirname,'index.html');
http.createServer((req,res)=>{
 const pathname=new URL(req.url||'/', 'http://localhost').pathname;
 if(pathname==='/health'){
  res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
  return res.end(JSON.stringify({ok:true}));
 }
 if(pathname==='/favicon.ico'){
  res.writeHead(204);return res.end();
 }
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
 fs.createReadStream(indexPath).on('error',()=>{if(!res.headersSent)res.writeHead(500);res.end('Erro ao carregar aplicativo')}).pipe(res);
}).listen(port,'0.0.0.0',()=>console.log('Clinic app listening on '+port));