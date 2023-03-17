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
urlpatterns = [
    path('admin/', admin.site.urls),
    path('search/', include('search.urls')), #connects root to search apps urls

]
