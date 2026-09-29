Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\FTT\Documents\GitHub\School-Management\frontend\src\assets\logo1.jpg"
$bmp = [System.Drawing.Bitmap]::new($srcPath)
$out = [System.Drawing.Bitmap]::new($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

# Also track emblem bounding box (before text starts)
# Text starts after the bottom point of the shield
$emblemMaxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $r = [int]$c.R
        $g = [int]$c.G
        $b = [int]$c.B
        
        # Determine if pixel is logo content (black icon/text or red text)
        $isDark = ($r -lt 120 -and $g -lt 120 -and $b -lt 120)
        $isRed = ($r -gt 130 -and $g -lt 105 -and $b -lt 105)
        
        if ($isDark -or $isRed) {
            $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        } else {
            $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

# Find gap between emblem and text
# Let's count non-transparent pixels per horizontal scanline from top down
$yGapStart = 0
$yGapEnd = 0
$inEmblem = $false
$foundGap = $false

for ($y = $minY; $y -le $maxY; $y++) {
    $count = 0
    for ($x = $minX; $x -le $maxX; $x++) {
        if ($out.GetPixel($x, $y).A -gt 0) {
            $count++
        }
    }
    if ($count -gt 0 -and -not $inEmblem) {
        $inEmblem = $true
    }
    if ($inEmblem -and $count -eq 0 -and -not $foundGap) {
        $yGapStart = $y
        $foundGap = $true
    }
    if ($foundGap -and $count -gt 0) {
        $yGapEnd = $y
        break
    }
}

Write-Host "Emblem maxY: $yGapStart, Text startY: $yGapEnd"

# 1. Full Logo
$pad = 12
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY) + ($pad * 2))

$rectFull = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
$croppedFull = $out.Clone($rectFull, $out.PixelFormat)
$croppedFull.Save("c:\Users\FTT\Documents\GitHub\School-Management\frontend\src\assets\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Emblem only
$emblemCropH = ($yGapStart - $cropY) + 4
if ($emblemCropH -gt 10) {
    # Find exact X bounds of emblem only
    $embMinX = $bmp.Width
    $embMaxX = 0
    for ($y = $cropY; $y -lt $yGapStart; $y++) {
        for ($x = $minX; $x -le $maxX; $x++) {
            if ($out.GetPixel($x, $y).A -gt 0) {
                if ($x -lt $embMinX) { $embMinX = $x }
                if ($x -gt $embMaxX) { $embMaxX = $x }
            }
        }
    }
    $embCropX = [Math]::Max(0, $embMinX - 8)
    $embCropW = [Math]::Min($bmp.Width - $embCropX, ($embMaxX - $embMinX) + 16)
    $rectEmblem = [System.Drawing.Rectangle]::new($embCropX, $cropY, $embCropW, $emblemCropH)
    $croppedEmblem = $out.Clone($rectEmblem, $out.PixelFormat)
    $croppedEmblem.Save("c:\Users\FTT\Documents\GitHub\School-Management\frontend\src\assets\logo-mark.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $croppedEmblem.Dispose()
    Write-Host "Emblem saved to logo-mark.png! ($embCropW x $emblemCropH)"
}

$bmp.Dispose()
$out.Dispose()
$croppedFull.Dispose()

Write-Host "Success!"
