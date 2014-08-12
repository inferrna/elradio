from multiprocessing import Process
import os
from subprocess import call

script = "./runstation.sh"
host  = "localhost"
passw = "ad438a4635b7f6b7cd8b1185278ffbb2"
live_streams = {}


def info(title):
    print(title)
    print('module name:', __name__)
    if hasattr(os, 'getppid'):  # only available on Unix
        print('parent process:', os.getppid())
    print('process id:', os.getpid())

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
