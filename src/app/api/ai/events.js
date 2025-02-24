import axios from 'axios';

const params = new URLSearchParams({
    timeMin: new Date().toISOString()
})

async function getEvents(userToken) {
    const APIRoot = "https://www.googleapis.com/calendar/v3";
    let calendarIDs = [];
    let eventList = [];

    try {
        const calendars = await axios.get("https://www.googleapis.com/calendar/v3/users/me/calendarList",
            {headers: {
                'Authorization': `Bearer ${userToken}`
            }}
        );

        for (const calendar of calendars.data.items) {
            if(calendar.accessRole !== "owner") continue;
            try {
                const events = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendar.id)}/events?${params.toString()}`,
                    {headers: {
                        'Authorization': `Bearer ${userToken}`
                    }}
                ); 

                if (events.data.items) {

                    for (const event of events.data.items) {
                        if(event.status !== "confirmed") continue;

                        eventList.push({
                            id: event.id,
                            name: event.summary,
                            start_datetime: event.start?.date || event.start?.dateTime,
                            end_datetime: event.end?.date || event.end?.dateTime,
                            recurrence: event.recurrence
                        });
                    }
                }

            } catch (error) {
                console.error(`Error fetching events for calendar ${calendar.id}:`, error.response?.data || error.message);
            }
        }
    } catch (error) {
        console.error("Error fetching calendar list:", error.response?.data || error.message);
    }

    return eventList;
    
}

export {getEvents}