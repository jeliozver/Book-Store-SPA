@echo off
echo Seeding Books..
mongoimport --db BookStore --collection books --file books.json
:finish
pause
