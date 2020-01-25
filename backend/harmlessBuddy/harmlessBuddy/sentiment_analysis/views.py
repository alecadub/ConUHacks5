from rest_framework import viewsets
from .serializers import ReportSerializer
from .serializers import MoodyMessageSerializer
from .models import Report
from .models import MoodyMessage


class MoodyMessageViewSet(viewsets.ModelViewSet):
    queryset = MoodyMessage.objects.all().order_by()
    serializer_class = MoodyMessageSerializer


class ReportViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Report.objects.all().order_by()
    serializer_class = ReportSerializer
