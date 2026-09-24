$dump = Get-Content -Path 'C:\Users\Divyesh Kevadiya\.gemini\antigravity\scratch\electrostatics-3d-lab\dump.html' -Raw
Write-Output ("Length: " + $dump.Length)
Write-Output ("Has Divyesh: " + ($dump -match "By Divyesh Kevadiya"))
Write-Output ("Has DEKZA_FX: " + ($dump -match "team DEKZA_FX"))
Write-Output ("Has CHARUSAT: " + ($dump -match "CHARUSAT"))
Write-Output ("Topic cards count: " + [regex]::Matches($dump, 'topic-card').Count)
Write-Output ("Formula vault cards: " + [regex]::Matches($dump, 'formula-card').Count)
Write-Output ("Undefined count: " + [regex]::Matches($dump, 'undefined').Count)
