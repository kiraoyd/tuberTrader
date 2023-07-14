"""tuberTrader URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
#include() is used by Django, when it is encoutnered Django chops off whatever part of
#the URL matches up to that point and sends the remaining string to the included URL (url) for processing

#root of the URL conf, here we point it at all the app's models
"""path() takes two required args: route and view, and two optional kwargs and name
route contains a url pattern, Django starts at the first patter in urlpatters and makes its way down the list, comparing
the requested incoming URL against each until it finds a match. Patterns do NOT search GET and POST parameters, or the
domain name: i.e. www.example.com/myapp/?page=3 will only look for the myapp/ pattern
The view is the function that gets called when Django matches the requested URL to the pattern. This view functions gets
passed an HttpRequest object and any captures values fro the route as keyword args.
The kwargs optional is for arbitrary keyword args, adn the name optional allows you to name your URL to refer to it from
elsewhere in Django, allowing global changes to the URL pattern from a single file.
"""
urlpatterns = [
    path('admin/', admin.site.urls),
    path('search/', include('searchApp.urls')), #connects root to the search apps urls
    #If more apps are added to the project, include them here

]
