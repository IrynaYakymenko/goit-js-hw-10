
import flatpickr from "flatpickr";
import iziToast from "izitoast";
import 'flatpickr/dist/flatpickr.min.css';
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    startBtn: document.querySelector(".btn"),
    inputField: document.querySelector('#datetime-picker'),
    
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let userSelectedDate;

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (!selectedDates.length || isNaN(selectedDates[0].getTime())) {
            iziToast.error({
                title: 'Error',
                message: 'Invalid date selected!',
                position: 'topRight'
            });
            refs.startBtn.disabled = true;
            return;
        }

        userSelectedDate = selectedDates[0];
        let dateNow = new Date();

        if (userSelectedDate <= dateNow) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight'
            });
            refs.startBtn.disabled = true;
        }else {
            refs.startBtn.disabled = false;
        }
        
    },
  };

  flatpickr("#datetime-picker", options);

const onStart = event => {
    if (!userSelectedDate) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please select a date first!',
            position: 'topRight'
        });
        refs.startBtn.disabled = false;
        return;
    }

        
    const timerId = setInterval(() => {
        const diff = userSelectedDate - Date.now();
        refs.startBtn.disabled = true;
        refs.inputField.disabled = true;
        if (diff<=0){
            clearInterval(timerId);
            refs.startBtn.disabled = false;
            refs.inputField.disabled = false;
            return;
        }
        const {days, hours, minutes, seconds} = convertMs(diff);
        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);
    }, 1000);

    function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
        return { days, hours, minutes, seconds };
      } 
     
     function addLeadingZero(value) {
        return String(value).padStart(2, '0');
      }
}
    

refs.startBtn.addEventListener('click', onStart);

