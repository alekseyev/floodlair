# -*- coding:utf-8 -*-
from django import forms
from util.widgets import DateWidget

class DateForm(forms.Form):
    date = forms.DateField(
        input_formats = ['%d.%m.%Y'], 
        label = 'Дата', 
        widget = DateWidget(attrs={'class': 'input-small'}))
