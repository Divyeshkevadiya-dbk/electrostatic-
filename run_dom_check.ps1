$edgePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path $edgePath)) {
    $edgePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
}

$pinfo = New-Object System.Diagnostics.ProcessStartInfo
$pinfo.FileName = $edgePath
$pinfo.Arguments = "--headless=new --disable-gpu --virtual-time-budget=3000 --dump-dom file:///C:/Users/Divyesh%20Kevadiya/.gemini/antigravity/scratch/electrostatics-3d-lab/index.html"
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

Write-Output ("Output Length: " + $stdout.Length)
Write-Output ("Has Divyesh: " + ($stdout.Contains("By Divyesh Kevadiya")))
Write-Output ("Has DEKZA_FX: " + ($stdout.Contains("team DEKZA_FX")))
Write-Output ("Has CHARUSAT: " + ($stdout.Contains("CHARUSAT")))
Write-Output ("Topic cards count: " + [regex]::Matches($stdout, 'topic-card').Count)
Write-Output ("Formula vault cards: " + [regex]::Matches($stdout, 'formula-card').Count)
Write-Output ("Undefined in text: " + [regex]::Matches($stdout, '>undefined<').Count)
Write-Output ("Raw frac count: " + [regex]::Matches($stdout, '\\frac').Count)
