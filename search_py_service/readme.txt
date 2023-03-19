SETUP LOG:
Helpful venv github: https://gist.github.com/harisibrahimkv/8279101
To make virtual environment already done for virtual environment:

    Install python3.10-venv:  sudo apt install python3.10-venv

    Build a virtual environment for the project (we named it env):python -m venv env

Activate the virtual environment, then:

To install Django: pip install Django==4.1.7 and sudo apt install python3-django
Django docs: https://docs.djangoproject.com/en/4.1/intro/tutorial01/
Check Django version: python3 -m django --version

Helpful Django/postgres tutorial: https://blog.nextideatech.com/how-to-create-a-django-app-and-connect-it-to-a-database/#:~:text=Django%2C%20being%20a%20modern%20framework,%2C%20Oracle%2C%20MongoDB%2C%20etc.

To install pip:

To install postgres:  sudo apt-get install postgresql-client-common

To install psycopg:  pip install psycopg2-binary
This library can now be imported with: import psycopg2
https://www.psycopg.org/docs/install.html

Change settings.py in searchPyService/tuberTrader/tuberTrader/settings.py file to work with existing Tuber database: https://hevodata.com/learn/django-postgresql/

To install django-cors-headers: pip install django-cors-headers

To generate a requirements.txt with current dependencies in it:

Naviagte to  /searchPyService and run: pip freeze > requirements.txt

TUBERTRADER PROJECT DIRECTORY FILE KEY
searchPyService/tuberTrader/tuberTrader --> container for project
searchPyService/tuberTrader/manage.py --> command-line utility allowing Django interaction, details at: https://docs.djangoproject.com/en/4.1/ref/django-admin/

TUBERTRADER/TUBERTRADER DIRECTORY FILE KEY
searchPyService/tuberTrader/tuberTrader/__init__.py  --> empty, lets python know this directory is a python project
searchPyService/tuberTrader/tuberTrader/asgi.py --> entry point for ASGI-compatible web servers, details at: https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
searchPyService/tuberTrader/tuberTrader/settings.py  --> setting/config for this project, details at: https://docs.djangoproject.com/en/4.1/topics/settings/
searchPyService/tuberTrader/tuberTrader/urls.py --> URL declarations for this project, details at: https://docs.djangoproject.com/en/4.1/topics/http/urls/
searchPyService/tuberTrader/tuberTrader/wsgi.py --> entry point for WSGI-compatible web servers, details at: https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/

To build new app, naviagte to the searchPyService/tuberTrader directory (same level as manage.py): python3 manage.py startapp <name>

SEARCH APP DIRECTORY FILE KEY (might not be a necessary app, as it has it's own DB): https://docs.djangoproject.com/en/4.1/intro/tutorial01/
searchPyService/tuberTrader/search/__init__.py  --> empty, lets python know this directory is a python project
searchPyService/tuberTrader/search/admin.py
searchPyService/tuberTrader/search/apps.py
searchPyService/tuberTrader/search/models.py <--won't need, no DB work done by Search
searchPyService/tuberTrader/search/tests.py
searchPyService/tuberTrader/search/views.py <--write routes here
searchPyService/tuberTrader/search/migrations <--directory for migrations



RUN PROJECT

You have to be in the virtual environment to run.
Activate the virtual enviornment with the command (from /searchPyService):

source env/bin/activate

OR source venv/Scripts/activate

Command line prompt will change to (env) at the start, when virtual environment is active

naviagate to: ~/workspace/FSProject/tuberTrader/searchPyService/tuber_trader

To run dev-server (searchService) : python3 manage.py runserver

Go to http://127.0.0.1:8000/ on browser to see the congrats page

To change the django server port: python manage.py runserver 8080, but not needed

MIGRATIONS - probably won't be needed, but just FYI

After DB changes:
python manage.py makemigrations

Running migrations:
python manage.py migrate


Note: project build for the View (HTTP req/reply handlers, otherwise known as routes) lives in tuberSearch



