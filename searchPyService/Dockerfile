#https://semaphoreci.com/community/tutorials/dockerizing-a-python-django-web-applicationFROM python: 3.10.6
#^^^has a specific example of django docker image....probably not useful
#this could also come in handy: https://adamtheautomator.com/django-docker/

#https://hub.docker.com/_/python/
#standard python image
FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./your-daemon-or-script.py" ]
