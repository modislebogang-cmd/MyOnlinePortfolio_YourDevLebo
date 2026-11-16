# crop-face.ps1 - crop the portrait to the head/face and save a new asset.
Add-Type -AssemblyName System.Drawing

$src = Join-Path $PSScriptRoot 'src\assets\mypic-nobg.png'
$dst = Join-Path $PSScriptRoot 'src\assets\mypic-face.png'

$img = [System.Drawing.Image]::FromFile($src)
Write-Output "source: $($img.Width)x$($img.Height)"

# The face sits in the upper-middle of the portrait. Crop a square region
# around the head so the laptop screen shows the face at a usable size.
$cropW = 120
$cropH = 120
$cropX = 130
$cropY = 100

$bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH), (New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()

Write-Output "saved: $dst"
