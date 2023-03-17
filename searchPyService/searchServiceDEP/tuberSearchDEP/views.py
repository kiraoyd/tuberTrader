from django.shortcuts import render

# Create your views here. This replaces fastify "routes". We will handle HTTP req/reply here
#https://docs.djangoproject.com/en/4.1/intro/tutorial01/

from django.http import HttpResponse

#test view
def index(request):
    return HttpResponse("Hello!")
