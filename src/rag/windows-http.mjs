import { spawnSync } from "node:child_process";

// Explicit Windows HTTP transport for hosts where Node's TLS connection times out.
// No access-control bypass or HTTP-error retry. Secrets travel via child environment,
// never command arguments or diagnostic output.
export function createWindowsHttpFetch() {
  if (process.platform !== "win32") throw new Error("Windows HTTP transport requires Windows");
  return async function windowsFetch(url, options = {}) {
    const script = "$ErrorActionPreference='Stop'; $headers=@{}; $parsed=ConvertFrom-Json $env:YANHUO_HTTP_HEADERS; $parsed.PSObject.Properties | ForEach-Object { $headers[$_.Name]=$_.Value }; $params=@{Uri=$env:YANHUO_HTTP_URL;Method=$env:YANHUO_HTTP_METHOD;Headers=$headers;UseBasicParsing=$true;TimeoutSec=60}; if($env:YANHUO_HTTP_BODY){$params.Body=[Text.Encoding]::UTF8.GetBytes($env:YANHUO_HTTP_BODY)}; try{$r=Invoke-WebRequest @params; @{status=[int]$r.StatusCode;contentType=[string]$r.Headers['Content-Type'];body=[Convert]::ToBase64String($r.RawContentStream.ToArray())}|ConvertTo-Json -Compress}catch{if($_.Exception.Response){$response=$_.Exception.Response;$stream=New-Object IO.MemoryStream;$response.GetResponseStream().CopyTo($stream);@{status=[int]$response.StatusCode;contentType='application/json';body=[Convert]::ToBase64String($stream.ToArray())}|ConvertTo-Json -Compress}else{throw 'Windows HTTP network request failed without retry'}}";
    const result = spawnSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", script], {
      encoding: "utf8", windowsHide: true, maxBuffer: 32 * 1024 * 1024, timeout: 75000,
      env: { ...process.env, YANHUO_HTTP_URL: String(url), YANHUO_HTTP_METHOD: options.method || "GET", YANHUO_HTTP_HEADERS: JSON.stringify(options.headers || {}), YANHUO_HTTP_BODY: options.body || "" }
    });
    if (result.status !== 0) throw new Error("Windows HTTP request failed; no retry or access-control bypass performed");
    const payload = JSON.parse(result.stdout.replace(/^\uFEFF/u, ""));
    return new Response(Buffer.from(payload.body, "base64"), { status: payload.status, headers: { "content-type": payload.contentType } });
  };
}
