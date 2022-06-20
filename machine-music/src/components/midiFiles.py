

from genericpath import isfile
from midiutil import MIDIFile

from sys import argv

notes= ["C", "Db" , "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
patterns=[("major",2, 2, 1, 2, 2, 2, 1),
("minor",2, 1, 2, 2, 1, 2, 2)]

def noteToNum(note="C", number=0):
    notes= ["C", "Db" , "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    if number >= 10 :
        if ((note in notes[8:12]) and (number==10)):
            raise Exception("Note is over max MIDI value: " + note + "\u0332"  + str(number))
        elif number > 10:       
            raise Exception("Note is over max MIDI value: " + note + "\u0332" + str(number))
    
    n = note
    flat = note.count("b") > 0
    if (flat):
        n.replace("b", "&")
      

    num = notes.index(n) + (int(number) * 12)
    if num > 127:
        raise Exception("Note is over max MIDI value: " + note + "\u0332" + str(number))
    
    return num

def generateScale(note="C", pattern="major"):
    num = 0
    for p in range(0, len(patterns)):
        if pattern in patterns[p]:
            num=p
            break
    startingNum=notes.index(note)
    resultList = [note]
    for i in range(1, len(patterns[num]) - 1):        
        tempNum = startingNum + patterns[num][i]
        if tempNum > 11:
            startingNum = (tempNum % 11) - 1
        else:
            startingNum = tempNum
        resultList.append(notes[startingNum])
    print(note + " " + pattern + ": " + str(resultList))
    return resultList


def createMidiFile(notes=[], name=""):
    m = MIDIFile(numTracks=1)
    m.addTempo(0,0,120)
    for n in notes:
        m.addNote(0, 0, noteToNum(n[0], n[1]), n[2], n[3], n[4])    
    with open(name, "wb") as output_file:
        m.writeFile(output_file)
      #("Note", noteNumber(eg: C4 is 4, 10 is max), time, duration, volume (127 is max))
note = ("G", 10, 0, 1, 100)


noteList = [note]
print(noteList)
generateScale("E", "minor")
createMidiFile(noteList,"C:/Users/justm/music_app/machine-music/src/n1.mid")

