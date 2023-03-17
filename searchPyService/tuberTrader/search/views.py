
#Test views by going to:http://127.0.0.1:8000/search/


from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

#simple tutorial view, named 'index'
def index(request):
    return HttpResponse("Hello!")

