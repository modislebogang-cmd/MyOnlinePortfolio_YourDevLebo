# time-start.ps1 - time how long vite takes to become ready, with optional debug
param([switch]$Debug)

$port = 5199
$out = Join-Path $PSScriptRoot '..\timing.txt'
Remove-Item $out -ErrorAction SilentlyContinue

$env:DEBUG = if ($Debug) { 'vite:*' } else { '' }
$sw = [Diagnostics.Stopwatch]::StartNew()

$p = Start-Process -FilePath 'cmd.exe' -ArgumentList "/c npx vite --port $port --strictPort > `"$out`" 2>&1" -WindowStyle Hidden -PassThru

while ($sw.Elapsed.TotalSeconds -lt 120) {
  Start-Sleep -Milliseconds 250
  $ready = Select-String -Path $out -Pattern 'ready in' -Quiet -ErrorAction SilentlyContinue
  if ($ready) { break }
}

$sw.Stop()
if ($p -and !$p.HasExited) { Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue }
Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
  Where-Object { $_.LocalPort -eq $port } |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }

Write-Output "startup: $([math]::Round($sw.Elapsed.TotalSeconds,1))s"
Get-Content $out -Raw
