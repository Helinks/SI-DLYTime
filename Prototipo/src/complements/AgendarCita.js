import React from 'react';
import './Css/agendarCitas.css';
import { useEffect } from 'react';
import Header from "./HeaderU";
import './img/flecha-der.png';


function AgendarCita() {

    useEffect(() => {
        const daysContainer = document.querySelector(".dias"),
    nextBtn = document.querySelector(".next-btn"),
    prevBtn = document.querySelector(".prev-btn"),
    month = document.querySelector(".mes"),
    todayBtn=document.querySelector(".today-btn"); 
    
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Marzo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    
    const days = ["Dom","Lun","Mar","Mie","Jue","vie","Sab"];
    const date = new Date();
    
    let currentMonth = date.getMonth();
    
    let currentYear = date.getFullYear();
    
    function renderCalendar(){
        date.setDate(1); 
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const lastDayIndex = lastDay.getDay();
        const lastDayDate = lastDay.getDate();
        const prevLastDay = new Date(currentYear, currentMonth, 0);
        const prevLastDayDate = prevLastDay.getDate();
        const nextDays = 7 - lastDayIndex - 1; 
        
        month.innerHTML = ` ${months[currentMonth]} ${currentYear}`;
    
        let days = ""; 
        
        for(let x = firstDay.getDay(); x > 0; x--){
            days +=`<div class="dia prev">${prevLastDayDate - x + 1} </div>`
        }
    
       
    
        for(let i = 1;i<=lastDayDate; i++ ){
            if(
                i === new Date().getDate() &&
                currentMonth === new Date().getMonth()  && 
                currentYear ===  new Date().getFullYear()
            ){
                days += `<div class="dia today">${i}</div>`;
            }else{
                days +=`<div class="dia">${i}</div>`;
            }
        }
    
        for(let j =1; j<=nextDays;j++){
    
            days += `<div class="dia sig">${j}</div>`;
        }
    
        hideTodayBtn();
        daysContainer.innerHTML = days;
    
    }
    
    renderCalendar();
    
    nextBtn.addEventListener("click", () => {
        currentMonth++;
        if(currentMonth >11){
            currentMonth = 0;
            currentYear++; 
        }
        renderCalendar();
    });
    
    prevBtn.addEventListener("click", () =>{
        currentMonth--;
        if(currentMonth<0){
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    todayBtn.addEventListener("click", () =>{
        currentMonth= date.getMonth();
        currentYear= date.getFullYear();
    
        renderCalendar();
    });
    
    function hideTodayBtn(){
        if(
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
        ){
            todayBtn.style.display = "none";
        }else{
            todayBtn.style.display = "flex";
        }
    }
    
    
    },[]);
  return (
    
    <div>
        <Header></Header>
    <div id="sidebar" class="sidebar">
        <a href="#" id="close-sidebar">&times;</a>
        <a href="#">Agendar Citas</a>
    </div>

    

    <div class="container">
        <div class="calendario">
            <div class="header">
                <div class="mes"></div>
                <div class="btns">
                <div class="btn today-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
</svg>
                </div>
                <div class="btn prev-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
</svg>
                </div>
                <div class="btn next-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>
                </div>
            </div>
            </div>
            <div class="weekdays">
                <div class="day">Dom</div>
                <div class="day">Lun</div>
                <div class="day">Mar</div>
                <div class="day">Mie</div>
                <div class="day">Jue</div>
                <div class="day">Vie</div>
                <div class="day">Sab</div>
            </div>
            <div class="dias">
                
            </div>
        </div>
    </div>
      
    </div>
  )
}

export default AgendarCita
