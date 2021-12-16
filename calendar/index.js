document.addEventListener("DOMContentLoaded", function (event) {

    const flipMonthBack = document.getElementById('flip-month-back');
    const flipMonthNext = document.getElementById('flip-month-next');
    const monthPage = document.getElementById('current-month');
    const yearPage = document.getElementById('year');
    const weekdayContainer = document.getElementById('weekday-container');
    const daysOfWeekContainer = document.getElementById('days-of-week-names-container');

    // array of month in local

    const date = new Date();

    const getMonthsArr = (local, year) => {
        const monthArr = [];

        for(let i = 0; i <= 11; i++) {
            const baseDate = new Date(year, i);

            monthArr.push(baseDate.toLocaleDateString(local, { month: 'long' }));
        }

        return monthArr;
    }

    // object of weeklist

    const getWeekList = (local, year, month) => {
        const weekList = {};

        for(let i = 0; i < 7; i ++) {
            const baseDate = new Date(year, month, i);

            weekList[baseDate.getDay()] = baseDate.toLocaleDateString(local, { weekday: 'short' });
        }

        return weekList;
    }

    const monthsArr = getMonthsArr('en-US', date.getFullYear());
    const weekList =  getWeekList('en-US', date.getFullYear(), date.getMonth());

    const createWeekItem = (el) => {
        return `<li class="days-of-week-names-item">${el}</li>`
    }

    const createWeekList = (obj) => {
        let item = '';
        for(let week in obj) {
            item += createWeekItem(obj[week]);
        }
        return item;
    }

    const renderWeekList = () => {
        const item = `<ul class="days-of-week-names-list">
           ${createWeekList(weekList)}
        </ul>`;

        daysOfWeekContainer.innerHTML = item;

    }

    const dateObj = {
        dateToday: date.getDate(), // число
        indexOfMonth: date.getMonth(),
        year: date.getFullYear(),
        day: date.getDay(), // індекс дня тижня
    }

    const getNameOfMonthLocal = (arr, index) => {
        return arr[index];
    }

    const renderCurrentValue = (el, value) => {
        el.innerHTML = value;
    }

    const createItemOfDays = (year, month) => {

        const dateOfFirstDayOfMonth = new Date(year, month, 1);
        console.log(dateOfFirstDayOfMonth);

        let indexOfFirstDay = dateOfFirstDayOfMonth.getDay();

        month++;
        const countDaysInMonth = new Date(year, month, 0).getDate();

        const arr = [];
        let weekend = [6, 7, 13, 14,  20, 21, 27, 28, 34, 35];

        for (let i = 0; i < (countDaysInMonth + indexOfFirstDay); i++) {

            arr.push(`<li class="weekday-item ${weekend.includes(i) ? "weekend" : ""}">${i < indexOfFirstDay ? '' : i - indexOfFirstDay + 1}</li>`);

        }

        return arr.join('');
    }

    const createListOfDays = (year, month) => {
        return `<ul id="weekday-list">${createItemOfDays(year, month)}</ul>`;
    }

    const renderListOfDays = (year, month) => {
        weekdayContainer.innerHTML = createListOfDays(year, month);
    }

    // ************************************************************************************************   основна ф-ція

    const renderCalendar = () => {
        renderCurrentValue(monthPage, getNameOfMonthLocal(monthsArr, dateObj.indexOfMonth));
        renderCurrentValue(yearPage, dateObj.year);
        renderWeekList();
        renderListOfDays(dateObj.year, dateObj.indexOfMonth);
    }

    renderCalendar();

    // ************************************************************************************************   основна ф-ція

    const switchCalendarForward = () => {
        if (dateObj.indexOfMonth === 11) {
            dateObj.year += 1
            dateObj.indexOfMonth = 0;

        } else {
            dateObj.indexOfMonth++;
        }

       return dateObj;
    }

    const switchCalendarBack = () => {
        if (dateObj.indexOfMonth === 0) {
            dateObj.indexOfMonth = 11;
            dateObj.year -= 1
        } else {
            dateObj.indexOfMonth--;
        }

        return dateObj;
    }

        flipMonthNext.addEventListener('click', () => {
            switchCalendarForward();
            renderCurrentValue(monthPage, getNameOfMonthLocal(monthsArr, dateObj.indexOfMonth));
            renderCurrentValue(yearPage, dateObj.year);
            renderListOfDays(dateObj.year, dateObj.indexOfMonth)

        })

        flipMonthBack.addEventListener('click', () => {
            switchCalendarBack();
            renderCurrentValue(monthPage, getNameOfMonthLocal(monthsArr, dateObj.indexOfMonth));
            renderCurrentValue(yearPage, dateObj.year);
            renderListOfDays(dateObj.year, dateObj.indexOfMonth)
        })

});


