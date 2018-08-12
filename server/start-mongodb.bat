@echo off
echo Starting MongoDB...
mkdir Project
mongod --dbpath=Project
:finish
pause