#where we map views to URLS

from django.urls import path
from . import views

#wire in the views you write for the search app here
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
    path('<str:islandRequested>/findIsland', views.findIsland, name='findIsland'),
]