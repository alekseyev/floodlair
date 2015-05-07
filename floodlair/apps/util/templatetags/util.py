from django import template

from datetime import datetime
import pytz


register = template.Library()


@register.simple_tag
def is_dst():
    isdst_now_in = lambda zonename: bool(datetime.now(pytz.timezone(zonename)).dst())
    return int(isdst_now_in('Europe/Madrid'))
