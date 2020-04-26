from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render
from django.views.generic import TemplateView

import apps.irc.views


urlpatterns = [
    url(r'^$', apps.irc.views.main, name="home_page"),
    url(r'^(\d{2})\.(\d{2})\.(\d{4})/$', apps.irc.views.main),
    url(r'^webirc/$', apps.irc.views.webirc, name="webirc"),
    url(r'^schedule/$', TemplateView.as_view(
        template_name='sched.html'), name="sched"),
    url(r'^robots.txt$', TemplateView.as_view(
        template_name='robots.txt', content_type="text/plain")),
]
