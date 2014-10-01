""" Default urlconf for <%= _.camelize(projectName) %> """

from django.conf.urls import include, patterns, url
from django.conf import settings
from django.views.generic import TemplateView
from django.contrib import admin
admin.autodiscover()


def bad(request):
    """ Simulates a server error """
    1 / 0

urlpatterns = patterns('',
     url(r'^$', TemplateView.as_view(template_name='demo.html')),

    # Examples:
    # url(r'^$', '<%= _.camelize(projectName) %>.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^bad/$', bad),
)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += patterns('',
        url(r'^__debug__/', include(debug_toolbar.urls)),
    )
