#where we map views to URLS (similar to mapping handlers to the router)

from django.urls import path
from . import views

#wire in the views you write specifically for the search app here
urlpatterns = [
    path('', views.index, name='index'),
    path('<str:islandRequested>/findIsland', views.findIsland, name='findIsland'),
]