@echo off
chcp 65001 >nul
setlocal

set "TARGET=%~1"

if "%TARGET%"=="" (
    set "TARGET=%CD%"
)

if not exist "%TARGET%" (
    echo.
    echo [오류] 폴더를 찾을 수 없습니다.
    echo %TARGET%
    pause
    exit /b 1
)

where magick >nul 2>&1
if errorlevel 1 (
    echo.
    echo [오류] ImageMagick을 찾을 수 없습니다.
    pause
    exit /b 1
)

dir /b "%TARGET%\*.png" >nul 2>&1
if errorlevel 1 (
    echo.
    echo [오류] 이 폴더에 PNG 파일이 없습니다.
    echo %TARGET%
    pause
    exit /b 1
)

set "OUTPUT=%TARGET%\webp"

if not exist "%OUTPUT%" (
    mkdir "%OUTPUT%"
)

echo.
echo ========================================
echo 이미지 변환을 시작합니다.
echo.
echo 원본: %TARGET%
echo 결과: %OUTPUT%
echo 크기: 3180 x 4500
echo 품질: WebP 무손실
echo ========================================
echo.

for %%F in ("%TARGET%\*.png") do (
    echo 변환 중: %%~nxF
    magick "%%~fF" ^
        -filter Lanczos ^
        -resize "3180x4500!" ^
        -strip ^
        -define webp:lossless=true ^
        -define webp:method=6 ^
        "%OUTPUT%\%%~nF.webp"
)

echo.
echo ========================================
echo 변환 완료
echo 결과 폴더: %OUTPUT%
echo ========================================
echo.

pause