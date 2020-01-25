from django.shortcuts import render

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import ReportSerializer
from .models import Report


class ReportViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Report.objects.all().order_by('-date_joined')
    serializer_class = ReportSerializer
