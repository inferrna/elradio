from multiprocessing import Process
import os
from subprocess import call
from datetime import datetime

script = "./runstation.sh"
host  = "localhost"
passw = "ad438a4635b7f6b7cd8b1185278ffbb2"
live_streams = {}
conn = sqlite3.connect(':memory:')
c = conn.cursor()
c.execute('''CREATE TABLE clients(ip text, url text, ldate datetime)''')

def info(title):
    print(title)
    print('module name:', __name__)
    if hasattr(os, 'getppid'):  # only available on Unix
        print('parent process:', os.getppid())
    print('process id:', os.getpid())

def newclient(ip, surl)
    c.execute('''INSERT INTO clients VALUES (?, ?, DateTime('now'));''', ip, surl)

def updateclient(ip)
    c.execute('''UPDATE clients SET ldate=? WHERE ip=?''', datatime.now().strftime('%Y-%m-%d %H%M%S'), ip1)

def checkclient(ip)
    c.execute('''select  from clients WHERE ldate <= DateTime('now', '-1200 seconds');''')


def new_stream(surl, stype, name, client):
    #call(["./runstation.sh", "http://81.19.85.197/echo.mp3", "localhost", "mp3", "ad438a4635b7f6b7cd8b1185278ffbb2", "coge"])
    if not surl in live_streams.keys():
        p = Process(target=call, args=([script, surl, host, stype, passw, name]))
        p.start()
        live_streams[surl] = {'clients':[client], 'proc':p}
    elif not client in live_streams[surl]['clients']:
        live_streams[surl]['clients'].append(client)

if __name__ == '__main__':
    #p2 = Process(target=f, args=('bob',))
    #p2.start()
    #p.join()
    #p2.join()
    info('main line')
