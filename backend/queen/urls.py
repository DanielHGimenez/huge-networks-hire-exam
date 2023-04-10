from django.urls import path

from . import views

urlpatterns = [
    path('combinations', views.find_combinations, name='find_combinations')
]
