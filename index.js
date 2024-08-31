
// alarm array to store saved alarm
let alarmObj=[] 
// getting all tags
const timeTag=document.querySelector(".head h1")
const timeTagCont=document.querySelector("#head")
const hour=document.getElementById('choose-hour')
const minutes=document.getElementById('choose-minutes')
const secs=document.getElementById('choose-secs')
const setAlarm=document.getElementById('setAlarm')
const hourOfTheDay=document.getElementById('choose-am-pm')
const alarmsSection=document.querySelector('.alarmSection')
const mainCont=document.querySelector('.mainContainer')
const darkMode=document.getElementById('darkMode')
const heading=document.getElementById('heading')
const body=document.querySelector('body')

// checking current time
let time=new Date().toLocaleTimeString().toUpperCase()

// updating dropdown for mins,secs
for (let i=1 ;i<=12;i++){
    const optionTag=document.createElement('option')
    optionTag.innerHTML=i
    hour.appendChild(optionTag)
}
for (let i=0 ;i<=59;i++){
    const optionTag=document.createElement('option')
    const optionTagForSec=document.createElement('option')
    let digit=String(i).padStart(2,'0')
    optionTag.innerHTML=digit
    optionTagForSec.innerHTML=digit
    minutes.appendChild(optionTag)
    secs.appendChild(optionTagForSec)
}



//checking and updating time every second
setInterval(()=>{
    let time=new Date().toLocaleTimeString().toUpperCase()
    timeTag.innerHTML=time
    if (alarmObj[0]===time){
        const play=document.querySelector('audio')
        alert('Alarm about to play')
        play.play()
        
        setTimeout(function(){
            console.log("entered")
            play.pause();
            play.currentTime=0;
        },2000)
        const toDel=document.getElementById(alarmObj[0])
        toDel.remove()
        alarmObj.splice(0,1)
    }
},1000)

// creation of button and appending to alarms section
setAlarm.addEventListener('click', function(){
    const alarmToSet=`${hour.value}:${minutes.value}:${secs.value} ${hourOfTheDay.value}`
    const val=alarmObj.find(function(e){
        return e===alarmToSet
    })
    console.log(val +'found value')
    if (!val){
        const divTime=document.createElement('div')
        const timeString=document.createElement('h4')
        const deleteBtn=document.createElement('button')
        deleteBtn.classList.add('deleteBtn')
        divTime.setAttribute('id',alarmToSet)
        timeString.textContent=alarmToSet
        deleteBtn.textContent='Delete'
        divTime.classList.add('alarmDisplayItem')
        divTime.append(timeString,deleteBtn)
        alarmsSection.appendChild(divTime)
        alarmObj.push(alarmToSet)
        deleteBtn.addEventListener('click',function(){
            const indexToDel=alarmObj.findIndex(function(e){
                return e===alarmToSet
            })
            alarmObj.splice(indexToDel,1)
            divTime.remove()
        })

    }
    else{
        alert("Alarm for this time already exits")
    }

})


// toggle button
darkMode.addEventListener('click', function(){
    const h3=document.querySelector('h3')
    if (!darkMode.checked===false){
        
        console.log(darkMode.checked+'hi')
        mainCont.style.backgroundColor = 'rgb(183 69 0);';
        mainCont.style.backgroundImage='linear-gradient(to right, rgb(255 122 12), rgb(240 83 23))'
        body.style.backgroundColor='#d9c384'
        timeTagCont.style.backgroundColor='#f1ee97'
        heading.style.color='#080808'
        h3.style.color='black'
    }       
    else{
        mainCont.style.backgroundColor = 'rgb(38, 48, 54)';
        mainCont.style.backgroundImage='linear-gradient(to right, rgb(59, 56, 99) , rgb(37 40 40))'
        body.style.backgroundColor='#293e52'
        timeTagCont.style.backgroundColor='#5a6481'
        heading.style.color='aliceblue'
        h3.style.color='aliceblue'
    }
})
// updating dropdown for select
hour.value=time.split(':')[0]
minutes.value=time.split(':')[1]
secs.value=time.split(':')[2].split(' ')[0]
console.log(time.split(':')[2].split(' ')[1])
hourOfTheDay.value=time.split(':')[2].split(' ')[1]
