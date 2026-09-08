const currentDay = new Date().getDate();
const currentHour = new Date().getHours();
const curentmonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const isFinihedAppointment = (currentDateData, selectedDay) => {
    let isFinished = false;
    if (currentYear == currentDateData.split('-')[0]) {
        if (curentmonth == currentDateData.split('-')[1]) {
            if (currentDay === selectedDay) {
                isFinished = currentDay > selectedDay;
            } else {
                if (currentDay > selectedDay) {
                    isFinished = true;
                }
            }
        } else {
            if (curentmonth > currentDateData.split('-')[1]) {
                isFinished = true;
            }
        }
    } else {
        if (currentYear > currentDateData.split('-')[0]) {
            isFinished = true;
        }
    }
    return isFinished;
}



const isAppoitmentDisabled = (currentDateData, selectedDay, item) => {

    let isDisabled = false;
    if (currentYear == currentDateData.split('-')[0]) {
        if (curentmonth == currentDateData.split('-')[1]) {
            if (currentDay === selectedDay) {
                isDisabled = +item.split(':')[0] <= currentHour;
            } else {
                if (currentDay > selectedDay) {
                    isDisabled = true;

                } else {
                    isDisabled = false;
                }
            }
        } else {
            if (curentmonth > currentDateData.split('-')[1]) {
                isDisabled = true;

            } else {
                isDisabled = false;
            }
        }
    } else {
        if (currentYear > currentDateData.split('-')[0]) {
            isDisabled = true;
        } else {
            isDisabled = false;
        }
    }
    return isDisabled;
}


const converteFbDate = ts => {
    const date = new Date(ts.seconds * 1000);

    // Format: YYYY-MM-DD
    const formatted =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");
    return formatted;
}
// Firestore timestamp → JS Date
const converteFbTime = ts => {
    const date = new Date(ts.seconds * 1000);

    // Format: YYYY-MM-DD
    const formatted =

        String(date.getHours()).padStart(2, "0");
    return formatted;
}

const filterAppoitments = (cpyAppoitments, day) => {
    return cpyAppoitments.filter((appoitment) => {
        const date = converteFbDate(appoitment['from']).split('-');
        if (day.year == +date[0] && day.month === +date[1] && day.day === +date[2]) {
            return appoitment;
        }
    })
}

const appointmentStarted = (ts) => {
    const start = new Date(ts.seconds * 1000);
    const now = new Date();

    const end = new Date(start);
    end.setHours(start.getHours() + 1); // +1 hour duration

    // Active only if: start <= now < end
    return now >= start && now < end;
};


// Return minutes left until the appointment hour ends
const minutesLeft = (ts) => {
    const start = new Date(ts.seconds * 1000);
    const now = new Date();

    const end = new Date(start);
    end.setHours(start.getHours() + 1); // appointment ends 1 hour after start

    // If appointment isn't active → return 0
    if (now < start || now >= end) {
        return 0;
    }

    // Minutes left until the appointment end
    const diffMs = end - now;
    const minutes = Math.floor(diffMs / 60000);

    return minutes;
};





export { isFinihedAppointment, isAppoitmentDisabled, converteFbDate, filterAppoitments, converteFbTime, minutesLeft, appointmentStarted };