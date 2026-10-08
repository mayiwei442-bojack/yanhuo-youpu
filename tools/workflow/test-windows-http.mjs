import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createWindowsHttpFetch } from "../../src/rag/windows-http.mjs";

if (process.platform !== "win32") {
  console.log(JSON.stringify({ skipped: true, reason: "Windows-only transport" }));
} else {
  // A child serves requests while the synchronous PowerShell transport runs.
  const server = spawn(process.execPath, ["-e", `
    const http=require('node:http');
    const server=http.createServer((req,res)=>{
      const parts=[];req.on('data',part=>parts.push(part));req.on('end',()=>{
        res.writeHead(req.url==='/blocked'?403:200,{'Content-Type':'application/json; charset=utf-8'});
        res.end(JSON.stringify({body:Buffer.concat(parts).toString('utf8'),method:req.method,marker:req.headers['x-test-marker'],message:'桂林米粉与博洛尼亚肉酱'}));
      });
    });
    server.listen(0,'127.0.0.1',()=>process.send({port:server.address().port}));
  `], { windowsHide: true, stdio: ["ignore", "ignore", "ignore", "ipc"] });
  try {
    const { port } = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Local HTTP fixture startup timed out")), 10000);
      server.once("message", (value) => { clearTimeout(timeout); resolve(value); });
      server.once("error", (error) => { clearTimeout(timeout); reject(error); });
    });
    const fetchImpl = createWindowsHttpFetch();
    const body = JSON.stringify({ recipeName: "回锅肉", ingredients: ["牛骨", "肉豆蔻一撮"] });
    const options = { method: "POST", headers: { "Content-Type": "application/json", "X-Test-Marker": "synthetic-header" }, body };
    const response = await fetchImpl(`http://127.0.0.1:${port}/echo`, options);
    assert.equal(response.status, 200);
    const echoed = await response.json();
    assert.equal(echoed.body, body);
    assert.equal(echoed.method, "POST");
    assert.equal(echoed.marker, "synthetic-header");
    assert.equal(echoed.message, "桂林米粉与博洛尼亚肉酱");
    const blocked = await fetchImpl(`http://127.0.0.1:${port}/blocked`, options);
    assert.equal(blocked.status, 403);
    assert.equal(blocked.ok, false);
    assert.equal((await blocked.json()).body, body);
    console.log(JSON.stringify({ ok: true, utf8BodyRoundTrip: true, headersPreserved: true, httpErrorsPreserved: true, externalNetworkUsed: false }));
  } finally {
    server.kill();
  }
}
