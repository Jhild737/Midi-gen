
from platform import system
from mido import MidiFile

from sys import argv

def parse(file):
    
    m = MidiFile('C:/Users/justm/music_app/machine-music/src/components/C3D3E3F3.mid')

    print(str(m.tracks))
   

parse('C:/Users/justm/music_app/machine-music/src/components/C3D3E3F3.mid')
