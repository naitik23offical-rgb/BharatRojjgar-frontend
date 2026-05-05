@echo off
echo Adding MinGit to path...
set PATH=%PATH%;%CD%\mingit\cmd
echo Pushing to remote repository...
git push -u origin main
echo.
pause
