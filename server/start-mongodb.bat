@echo off
echo Starting MongoDB...
mkdir BookStore
mongod --dbpath=BookStore
:finish
pause