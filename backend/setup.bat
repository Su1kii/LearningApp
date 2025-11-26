@echo off
REM Setup script for K-12 LMS Backend (Windows)

echo Setting up K-12 LMS Backend...

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

echo Setup complete!
echo To activate the virtual environment, run: venv\Scripts\activate
echo To start the server, run: uvicorn main:app --reload

