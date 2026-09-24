$edgePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path $edgePath)) {
    $edgePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
}

$pinfo = New-Object System.Diagnostics.ProcessStartInfo
$pinfo.FileName = $edgePath
$pinfo.Arguments = "--headless=new --disable-gpu --virtual-time-budget=3000 --enable-logging=stderr --dump-dom file:///C:/Users/Divyesh%20Kevadiya/.gemini/antigravity/scratch/electrostatics-3d-lab/index.html"
$pinfo.RedirectStandardOutput = $true
$pinfo.RedirectStandardError = $true
$pinfo.UseShellExecute = $false
$pinfo.CreateNoWindow = $true

$p = New-Object System.Diagnostics.Process
$p.StartInfo = $pinfo
$p.Start() | Out-Null
$stdout = $p.StandardOutput.ReadToEnd()
$stderr = $p.StandardError.ReadToEnd()
$p.WaitForExit()

Write-Output "=== STDERR / CONSOLE ERRORS ==="
$lines = $stderr -split "`n" | Where-Object { $_ -match "CONSOLE" -or $_ -match "Error" -or $_ -match "Uncaught" }
if ($lines.Count -eq 0) {
    Write-Output "Zero JS errors or console errors detected!"
} else {
    $lines | ForEach-Object { Write-Output $_ }
}
