SETUP LOG:
To make virtual environment already done for virtual environment:

    Install python3.10-venv:  sudo apt install python3.10-venv

    Build a virtual environment for the project (we named it env):python -m venv env

Activate the virtual environment, then:

To install Django: pip install Django==4.1.7 and sudo apt install python3-django
Django docs: https://docs.djangoproject.com/en/4.1/intro/tutorial01/
Check Django version: python3 -m django --version

To install postgres:  sudo apt-get install postgresql-client-common

To install psycopg:  pip install psycopg2-binary
This library can now be imported with: import psycopg2
https://www.psycopg.org/docs/install.html

Change settings.py in the searchService directory to work with existing Tuber database: https://hevodata.com/learn/django-postgresql/
SEARCH SERVICE DIRECTORY FILE KEY

searchService --> container for project

searchService/manage.py --> command-line utility allowing Django interaction, details at: https://docs.djangoproject.com/en/4.1/ref/django-admin/

searchService/searchService/__init__.py  --> empty, lets python know this directory is a python project
searchService/searchService/asgi.py --> entry point for ASGI-compatible web servers, details at: https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
searchService/searchService/settings.py  --> setting/config for this project, details at: https://docs.djangoproject.com/en/4.1/topics/settings/
searchService/searchService/urls.py --> URL declarations for this project, details at: https://docs.djangoproject.com/en/4.1/topics/http/urls/
searchService/searchService/wsgi.py --> entry point for WSGI-compatible web servers, details at: https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/

To build new app in searchService directory: python3 manage.py startapp <name>

TUBERSEARCH DIRECTORY FILE KEY (might not be a necessary app, as it has it's own DB): https://docs.djangoproject.com/en/4.1/intro/tutorial01/
searchService/tuberSearch/__init__.py  --> empty, lets python know this directory is a python project
searchService/tuberSearch/admin.py
searchService/tuberSearch/apps.py
searchService/tuberSearch/models.py
searchService/tuberSearch/tests.py
searchService/tuberSearch/views.py

searchService/tuberSearch/migrations



TO RUN PROJECT

Activate the virtual enviornment with the command:

source env/bin/activate

OR source venv/Scripts/activate

Command line prompt will change to (env) at the start, when virtual environment is active

naviagate to: ~/workspace/FSProject/tuberTrader/searchPyService/searchService

To run dev-server: python manage.py runserver

Go to http://127.0.0.1:8000/ on browser to see the congrats page

To change the django server port: python manage.py runserver 8080



