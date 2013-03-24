from django import forms
from django.utils.safestring import mark_safe

class DateWidget(forms.DateInput):
    def __init__(self, **kwargs):
        super(DateWidget, self).__init__(format='%d.%m.%Y', **kwargs)

    def render(self, name, value, attrs=None):
        return mark_safe(
            '<span class="date-widget">' + 
            super(DateWidget, self).render(name, value, attrs) + 
            '</span>'
        )

    class Media:
        js = ('util/jquery-ui.js', 'util/jquery.ui.datepicker-ru.js', 'util/date.js', )
        css = {
            'all': ('util/jquery-ui.css', )
        }