import React, { Component } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from 'react-select'
import { Checkbox, FormControl, TextField } from '@mui/material';



const majMin = [
  { value: 0, label: 'Major' },
  { value: 1, label: 'Minor' }
]

const options = [
  { value: 0, label: 'C' },
  { value: 1, label: 'Db' },
  { value: 2, label: 'D' },
  { value: 3, label: 'Eb' },
  { value: 4, label: 'E' },
  { value: 5, label: 'F' },
  { value: 6, label: 'Gb' },
  { value: 7, label: 'G' },
  { value: 8, label: 'Ab' },
  { value: 9, label: 'A' },
  { value: 10, label: 'Bb' },
  { value: 11, label: 'B' }
]


var parseMidi = require('midi-file').parseMidi
var writeMidi = require('midi-file').writeMidi

const myFiles = document.querySelector("#myfiles");
const patterns = [[2, 2, 1, 2, 2, 2, 1],
[2, 1, 2, 2, 1, 2, 2]
]
const Scales = () => {
  const [scaleList, addNote] = React.useState([])
  const [resultString, setResults] = React.useState("")
  const [note, setNote] = React.useState('0')
  const [m, setMajor] = React.useState('Major')
  const [imageVisable, setVis] = React.useState(false)

  const handleMajorChange = (event) => {
    setMajor(event.target.value)
    addNote([])
    
    addNote(scaleGenerate())
  }


  const midiGen = () =>  {
    
    
    
    alert(myFiles.files.path)
    
    const midi = new Midi()
    var s = ""
    const tracks = midi.tracks.forEach(track => {
    const notes = track.notes
    
    notes.forEach(note => {
        s.concat(note.toJSON())
        alert(note.toJSON())
    })
})
return (
   s
)
}


  const handleNoteChange = (event) => {
    setNote(event.target.value)
    addNote([])
    
    addNote(scaleGenerate())
  }

  const { Midi } = require('@tonejs/midi')

 const generateImg = () => {
    let strBuild = "./" + options[parseInt(note)].label    
  if (m === 1){
    strBuild = strBuild + "m"
  }
  strBuild = strBuild + ".png"
  console.log(strBuild)
  return strBuild
  }

  const scaleGenerate = () => {
    
    let path = generateImg()
    console.log(path)
   
    const noted = parseInt(note)
    const major = (m === "Major") ? 0 : 1


    var maj = patterns[major]
    var scale = []
    scale.push(options[noted].label)
    var iNote = noted
    for (let i = 0; i < 8; i++) {
      iNote = iNote + parseInt(maj[i])
      if (iNote > 11) {
        iNote = (iNote % 11) - 1
      }
      if (i < 6) {
        scale.push(options[iNote].label)
      } else {        
        return scale
      }
    }    
    return scale
  }

  
  return (<div className="App">
    <header className="App-header">
      <img src={require('C:/Users/justm/music app/machine-music/src/components/'+ options[parseInt(note)].label + ((m === 'Minor') ? 'm' : '' ) + '.png')}/>
      
      <div className="Select1">
        <label on>

          {scaleGenerate().toString().replaceAll(',', ' ')}
        </label>
        <br/>
        
        <div className="form">
          
          <FormControl className={"Hey"}>

            <TextField
              id="note-select"
              style={{backgroundColor: "white"}}
              InputProps= {{
                style: {
                  color: "black"
                }
              }}
              select
              value={note}
              onChange={handleNoteChange}>
              {options.map((option) => {
                return (<MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>)
              })}
              
              
            </TextField>
            

            <TextField
              id="maj-select"
              style={{backgroundColor: "white"}}
              InputProps= {{
                style: {
                  color: "black"
                }
              }}
              select
              value={m}
              onChange={handleMajorChange}>
              {majMin.map((option) => {
                return (<MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>)
              })}
            </TextField>

            

          </FormControl>
        </div>

      </div>
      <div className="Select2">

      <input id="myfiles" type="file" onSelect={midiGen}/>
      </div>
    </header>
  </div>);
  

}

export default Scales;
