from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .queen import achar_quantidade_de_combinacoes

# Create your views here.

def find_combinations(request):
    result = achar_quantidade_de_combinacoes(int(request.GET.get('queens', '1')))
    return JsonResponse({ "result": result[1], "period": result[0] })
