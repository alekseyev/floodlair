INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
]

INSTALLED_APPS += [
    'floodlair.apps.core',
    'floodlair.apps.irc',
    'floodlair.apps.util',
]

INSTALLED_APPS += [
    'helpers42cc',
    'sorl.thumbnail',
    'debug_toolbar',
    'south',
    'django_coverage',
]
