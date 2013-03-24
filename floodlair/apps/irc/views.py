import sqlite3
from datetime import date, datetime, timedelta
from time import mktime, strftime, localtime
from calendar import timegm
import pytz

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.conf import settings

from .forms import *

tz = pytz.timezone('Europe/Kiev')

def main(request, day = 0, month = 0, year = 0):
    if request.method == 'POST':
        form = DateForm(request.POST)
        if form.is_valid():
            the_date = form.cleaned_data['date']
            return HttpResponseRedirect('/' + the_date.strftime('%d.%m.%Y') + '/')
    if (day):
        the_date = date(int(year), int(month), int(day))
    else:
        the_date = datetime.now(tz)
        if the_date.hour < 6:
            the_date -= timedelta(1)
    curr = the_date.strftime('%d.%m.%Y')
    form = DateForm(initial = { 'date': curr })
    time1 = tz.localize(datetime(the_date.year, the_date.month, the_date.day, 6, 0, 0, 0))
    timestamp1 = timegm(time1.timetuple())
    timestamp2 = timestamp1 + 60 * 60 * 24
    messages = []
    if settings.DB_FILE and settings.BUFFERID:
        conn = sqlite3.connect(settings.DB_FILE)
        c = conn.cursor()
        c.execute("""
            SELECT log.time, s.sender, log.type, log.message, log.messageid
            FROM backlog log
            JOIN sender s ON log.senderid = s.senderid
            WHERE log.time >= %d AND log.time < %d AND log.bufferid = %d
        """ % (timestamp1, timestamp2, settings.BUFFERID))
        for row in c:
            dt = datetime.fromtimestamp(row[0], tz)
            if '!' in row[1]:
                sender = row[1][0:row[1].index('!')]
            else:
                sender = row[1]
            if not sender:
                sender = ''
            msgtype = row[2]
            message = row[3]
            if not message:
                message = ''
            if msgtype == 1 or msgtype == 2:
                sender = '<' + sender + '>'
                message = row[3]
            else:
                if msgtype == 4:
                    sender = '* ' + sender
                else:
                    add = {
                        8: ' is now known as',
                        16: ' sets mode',
                        32: ' has joined',
                        64: ' has left:',
                        128: ' has quit:',
                        256: ' has kicked',
                    }
                    sender += add.get(msgtype, '')
                message = sender + ' ' + message
                sender = ''
            messages.append({ 'time': dt.strftime('%H:%M:%S'), 'type': msgtype, 'sender': sender, 'message': message, 'messageid': row[4] })
    prev = (the_date - timedelta(1)).strftime('%d.%m.%Y')
    next = (the_date + timedelta(1)).strftime('%d.%m.%Y')
    return render(request, 'irc/irc.html', {'ircmessages': messages, 'form': form, 'prev': prev, 'next': next, 'date': curr })
