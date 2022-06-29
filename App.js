import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

let timer = null
let hh = 0
let mm = 0
let ss = 0

const App = () => {
  const [number, setNumber] = useState('00:00:00')
  const [btnRun, setBtnRun] = useState('RUN!')
  const [lastTimer, setLastTimer] = useState(null)

  const run = () => {
    setBtnRun('STOP!')
      if(btnRun === 'STOP!'){
        setBtnRun('RUN!')
      }

      if(timer !== null){
        clearInterval(timer)
        timer = null
      }else{
        timer = setInterval(() => {
          ss++
          if(ss == 60){
            ss = 0
            mm++
          }
          if(mm == 60){
            mm = 0
            hh++
          }
          
          const hours = (hh < 10 ? '0' + hh : hh)
          const minutes = (mm < 10 ? '0' + mm : mm)
          const secunds = (ss < 10 ? '0' + ss : ss)

          let format = `${hours}:${minutes}:${secunds}`

          setNumber(format)
        }, 1000)
      }

  }

  const clear = () => {
      if(timer !== null){
        clearInterval(timer)
        timer = null
      }

      if(timer == null){
        setLastTimer(number)
        setNumber('00:00:00')
        setBtnRun('RUN!')
      }
      hh = 0
      mm = 0
      ss = 0
  }

  return(
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('./assets/crono.png')}
      />
      <Text style={styles.timer}>{number}</Text>
      <View style={styles.buttonsArea}>
        <TouchableOpacity style={styles.btnStyle} onPress={run}>
          <Text style={styles.btnTextStyle}>{btnRun}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={clear}>
          <Text style={styles.btnTextStyle}>CLEAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastTimeArea}>
          <Text style={styles.lastTimeText}>
            { lastTimer ? `last time: ${lastTimer}` : ''}
          </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#52be80'
  },
  img: {
    width: 270,
    height: 330
  },
  timer: {
    marginTop: -160,
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonsArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 50
  },
  btnStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    margin: 17,
    borderRadius: 9
  },
  btnTextStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#52be80'
  }, 
  lastTimeArea: {
    marginTop: 50
  },
  lastTimeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic'
  }
})

export default App