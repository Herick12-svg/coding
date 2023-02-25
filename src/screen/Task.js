import React, {useState, useRef, useEffect} from 'react';
import{View, StyleSheet, TextInput, Button, Text, ImagePropTypes, ImageBackground , TouchableOpacity, Dimensions} from 'react-native';
import TaskList from './TaskList';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { setItem, Keys, getItem} from '../libs/storage';
import {addTasked, getTaskList} from '../libs/api'
import { differenceInHours, toDate ,parseISO} from 'date-fns';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: window.height - 60

    },
    container2:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width:'100%',
        border: '#00FFFF'

    },
    fab: {
        flex:1,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        height:60,
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
      },
    marginLeft: {
        marginLeft:10
    },
    input: {
        height:35,
        margin:12,
        borderWidth:1,
        marginLeft:255,
        padding:5,
        width:100,
        flexGrow:1

        
    },


 

       
  });
  
export default function Task() {
    const nowDate = new Date()
    const [dueDate, setDueDate] = useState(new Date())
    const [tommorowDate, setTommorowDate] = useState('')
    const [tommorowDateMonthYear, setTommorowDateMonthYear] = useState(new Date(year, month, tommorowDate))
    const [Task, setTask] = useState("");
    const [array, setArray] = useState([])
    const [TaskArray, setTaskArray] = useState(array)
    const [show, setShow] = useState(false);
    const month = new Date().getMonth();
    const year = new Date().getFullYear()
    const userId = getItem(Keys.userId)
    const user = getItem(Keys.Username)





    useEffect( () => {
        tommorows()
        getItems()
        console.log("userId",userId) 


    }, [])
    const tommorows = () => {
        let Tdate = new Date().getDate();
        let tommorowDate = Tdate + 1
        setTommorowDate(tommorowDate)
        console.log("hehllo")
    }
    const getItems = async () => {
        const response = await getTaskList(userId)
        console.log("getTaskList ====",response)
    }

    const addTask = () => {
        if (Task.length >= 1 && dueDate )
            addTasked(Task, dueDate, user)
        setTask('')


    }
    const onChangeDueDate = (e, selectedDate) => {
        const currentDate = selectedDate || date
        setDueDate(currentDate)
        setShow(false)
        console.log('due date:' ,  dueDate)

    }
    const onShow = () => {
        setShow(true)
 
    }
    const today = array.filter(item => {
        console.log("duedate: ",item.dueDate)
        console.log("item.duedate",item.dueDate,"new Date : ", new Date(),"diff in hour", differenceInHours(item.dueDate, new Date()))
        if( differenceInHours(item.dueDate, new Date()) < 24)
            
            return true

        else 
            return false
    })
    const tommorow = array.filter(item => {
        if( differenceInHours(item.dueDate, new Date()) > 24 && differenceInHours(item.dueDate, new Date()) < 48 )
            return true
        else 
            return false
    })
    const upcoming = array.filter(item => {
        if( differenceInHours(item.dueDate, new Date()) > 48)
            return true
        else 
            return false
    })
    
   
    console.log("today : ",today,"tmrow : ", tommorow,"upcoming : ", upcoming)
    return(
        
        <View style={style.container}>
             <View style={style.container2}>
                <TaskList name="Today" list={today} ></TaskList>
            </View>
            <View style={style.container2}>
                <TaskList name='Tommorow' list={tommorow} ></TaskList>
                
            </View> 
             <View style={style.container2}>
                <TaskList name='Upcoming' list={upcoming}></TaskList>
            </View> 

            <View  style={style.fab} >
                <TextInput
                    placeholder='New Task'
                    onChangeText={text =>setTask(text)}
                    style={style.input}
                    value = {Task}
                />
                <TouchableOpacity>
                    <Ionicons name="calendar-outline" onPress={onShow}/>
                </TouchableOpacity>
                 
                <TouchableOpacity style={style.marginLeft} >
             
                    <Ionicons name="add-circle-outline" onPress={addTask}/>
                </TouchableOpacity>


                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        mode='date'
                        value={dueDate}
                        display='default'
                        minimumDate={new Date(year, month, tommorowDate)}
                        onChange={onChangeDueDate}

                    />  
                )}
                
            </View>
         

        
        </View>
    )
}