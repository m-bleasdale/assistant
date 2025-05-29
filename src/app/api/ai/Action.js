import axios from 'axios';
import { throwIfDisallowedDynamic } from 'next/dist/server/app-render/dynamic-rendering';

class Action {
    constructor(action, token){
        this.scope = action.scope;
        this.type = action.type;
        this.content = action.content;
        this.userToken = token
    }

    ExecuteAction(){
        if(this.scope === "event"){
            if(this.type === 'add') this.AddEvent();
            if(this.type === 'modify') this.ModifyEvent();
            if(this.type === 'remove') this.RemoveEvent();
        }
        else if(this.scope === "task"){
            if(this.type === 'add') this.AddTask();
            if(this.type === 'modify') this.ModifyTask();

        }
    }

    async GetCalendar() {
        let calendarToReturn;

        let calendars;
        try{
            calendars = await axios.get("https://www.googleapis.com/calendar/v3/users/me/calendarList",
                {headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }}
            );
        }
        catch (error){
            console.error(`Error adding calendar:`, error.response?.data || error.message);
        }

        let calendarExists = false;
        for (const calendar of calendars.data.items) {
            if(calendar.summary === "Assistant AI"){
                calendarExists = true
                calendarToReturn = calendar.id;
            };
        }

        if(calendarExists === false){
            try{
                const newCalendar = await axios.post(
                    'https://www.googleapis.com/calendar/v3/calendars',
                    {
                        summary: 'Assistant AI',
                        description: 'This calendar was made by Assistant AI',
                        timeZone: 'Europe/London'
                    },
                    {
                        headers: {
                        Authorization: `Bearer ${this.userToken}`,
                        'Content-Type': 'application/json'
                        }
                    }
                )

                calendarToReturn = newCalendar.data.id;

            } catch (error){
                console.error(`Error adding calendar:`, error.response?.data || error.message);
            }

        }

        return calendarToReturn;
    }

    async AddEvent(){
        
        const calendar = await this.GetCalendar();

        let start;
        let end;
        if(this.content.all_day === true){
            start = {date: this.content.start_datetime};
            end = {date: this.content.end_datetime};
        }
        else {
            start = {dateTime: this.content.start_datetime, timeZone: 'Europe/London'};
            end = {dateTime: this.content.end_datetime, timeZone: 'Europe/London'};
        }
        
        try{
            await axios.post(
                `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`,
                {
                    summary: this.content.name,
                    description: this.content.description ? this.content.description : null,
                    start: start,
                    end: end,
                    recurrence: this.content.recurrence,
                    colorId: this.content.colorId
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.userToken}`,
                    'Content-Type': 'application/json'
                    }
                }
            );
        }
        catch (error){
            console.error(`Error adding event:`, error.response?.data || error.message);
        }
    }

    async ModifyEvent() {

        const calendar = await this.GetCalendar();

        let start;
        let end;
        if(this.content.all_day === true){
            start = {date: this.content.start_datetime};
            end = {date: this.content.end_datetime};
        }
        else {
            start = {dateTime: this.content.start_datetime, timeZone: 'Europe/London'};
            end = {dateTime: this.content.end_datetime, timeZone: 'Europe/London'};
        }
        
        try{
            await axios.put(
                `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events/${this.content.id}`,
                {
                    summary: this.content.name,
                    description: this.content.description ? this.content.description : null,
                    start: start,
                    end: end,
                    recurrence: this.content.recurrence,
                    colorId: this.content.colorId
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.userToken}`,
                    'Content-Type': 'application/json'
                    }
                }
            );
        }
        catch (error){
            console.error(`Error adding event::`, error.response?.data || error.message);
        }
    }

    async RemoveEvent() {

        const calendar = await this.GetCalendar();

        try {
            await axios.delete(
            `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events/${this.content.id}`,
            {
                headers: {
                Authorization: `Bearer ${this.userToken}`
                }
            }
            );
        } catch (error) {
            console.error('Error deleting event:', error.response?.data || error.message);
        }

    }

    async AddTask() {
        try {
            await axios.post(
                `https://www.googleapis.com/tasks/v1/lists/@default/tasks`,
                {
                    title: this.content.name,
                    notes: this.content.description,
                    due: this.content.due
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.userToken}`,
                    'Content-Type': 'application/json'
                    }
                }
            );

        } catch (error) {
            console.error('Error creating task:', error.response?.data || error.message);
        }
    }

    async ModifyTask() {

        const res = await axios.get('https://www.googleapis.com/tasks/v1/lists/@default/tasks', {
            headers: {
                Authorization: `Bearer ${this.userToken}`
            }
            });

            console.log(res.data.items.map(t => t.id)); // See if your ID is there


        try {
            await axios.patch(
            `https://www.googleapis.com/tasks/v1/lists/@default/tasks/${this.content.id}`,
            {
                title: this.content.name,
                notes: this.content.description,
                due: this.content.due,
                status: this.content.status
            },
            {
                headers: {
                Authorization: `Bearer ${this.userToken}`,
                'Content-Type': 'application/json'
                }
            }
            );

        } catch (error) {
            console.error('Error updating task:', error.response?.data || error.message);
            console.log(error.response.data.error.errors);
            console.log(`https://www.googleapis.com/tasks/v1/lists/@default/tasks/${this.content.id}`)
        }

    }
}

export default Action;