from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render
from django.views.generic import TemplateView


admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'apps.irc.views.main', name="home_page"),
    url(r'^(\d{2})\.(\d{2})\.(\d{4})/$', 'apps.irc.views.main'),
    url(r'^webirc/$', 'apps.irc.views.webirc', name="webirc"),
    url(r'^robots.txt$', TemplateView.as_view(template_name='robots.txt'))
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )


if settings.IS_TESTING:
    urlpatterns += patterns('',
        url(r'^user/(?P<username>[\w@\.+-]+)/$', 'helpers42cc.views.profile',
            name='profile')
    )
