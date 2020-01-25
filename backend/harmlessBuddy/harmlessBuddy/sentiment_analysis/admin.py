from django.contrib import admin
from .models import Report
from .models import MoodyMessage

admin.site.register(Report)
admin.site.register(MoodyMessage)
