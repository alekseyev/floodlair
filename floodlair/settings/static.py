from .utils import root

STATIC_ROOT = root('static')
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    root('static'),
    )

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    )
