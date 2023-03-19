
#Test views by going to:http://127.0.0.1:8000/search/

from django.shortcuts import render
from django.http import HttpResponse
#from django_handlers import Handler
from django.db import connection
from django.http import JsonResponse
import json

# Create your views here. Views either return an HttpResponse object containing content for requested page, or
#raise an exception.

#db api: https://docs.djangoproject.com/en/4.1/topics/db/queries/
#We can access our DB directly, going around the model layer


#test with: http://127.0.0.1:8000/search/myIsland/findIsland
def findIsland(request, islandRequested):
    if request.method == 'GET':
        with connection.cursor() as cursor: #gets cursor object
            # #%s exists as a placeholder for the values given in the [paramsList]
            query = '''SELECT * FROM profile WHERE "islandName" = %s'''
            #query = '''SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;'''
            cursor.execute(query, [islandRequested]) #executes SQL
            island = cursor.fetchone() #to return row

        #send response as JSON
        #jsonIsland = json.dumps(island, default=str)
        return JsonResponse(island, safe=False)
        #return HttpResponse(jsonIsland, content_type = 'application/json')



#simple tutorial view, named 'index'
#aside from the request object, the functions can take in other args
def index(request):
    return HttpResponse("Hello!")
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)
def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)
def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)

#End tutorial route functions

