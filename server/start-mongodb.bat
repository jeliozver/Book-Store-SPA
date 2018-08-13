@echo off
echo Starting MongoDB...
mkdir Project
mongod --dbpath=BookStore
:finish
pause