# AI Scheduling Assistant
[assistant-opal.vercel.app](assistant-opal.vercel.app)

This tool is designed to take a simple free text input and update a user's events and tasks.

Most people's calendars are full of events, and they have long to-do lists. When something comes up, moving events around in your calendar, or planning time to dedicate to a task, can be a hassle. I designed this tool to reduce the stress that comes with trying to make a busy timetable work.

Built with Next.js, Gemini API, Google Calender API, Google Tasks API and OAuth.

Google Calendar and Tasks APIs are used to keep track of all events and tasks; as well as edit and modify events and tasks.

## Features
By simply sending a message, the user's assistant can:

- Add, modify or remove events
- Create and keep track of tasks
- Intelligently schedule events around due dates and other events
- Give scheduling advice
- Discuss future events
- These are examples, the system can be used in mulitple ways

### Working with Google Calendar

In the following situation I asked the system to tell me what events I had in the future. It was able to read my Google Calendar and determine the dates.

<br/>

![image](https://github.com/user-attachments/assets/9ee79a33-3b78-4a93-9930-82a71e9b3446)

<br/>

I then told it I had an exam next Monday. It automatically recommended time for me to revise, ensuring revision time did not clash with other events scheduled in that same day.

<br/>

![image](https://github.com/user-attachments/assets/62f8a081-4ba7-48bc-a890-1bf7fbe7e496)

<br/>

The timeslots to revise were added to my Google Calendar and can be seen from any device where it is installed.

<br/>

![image](https://github.com/user-attachments/assets/4eb12bd2-471d-463e-a395-162fddb22333)

![image](https://github.com/user-attachments/assets/28d59676-0c98-4040-a3d9-7739152e2af2)

### Working with Google Tasks

I was also able to give it tasks that I had to do. It placed this on my Google Tasks to-do list. It is also possible to tell the system that the task was completed for it to be automatically marked as completed. 

<br/>

![image](https://github.com/user-attachments/assets/8dbd98c5-8d11-42d3-8b38-089f054cc9bf)

![image](https://github.com/user-attachments/assets/482071db-d2da-41bd-8428-457e8bfad0dd)

## Assistant Response

Using the Gemini API, the assistant will respond with a text response which is displayed to the user, as well as a series of actions. Actions are placed inside `<Action>` tags. Actions may involve adding, modifying or removing events or tasks. Data inside the `<Action>` tag is interpreted and executed in order to manipulate the user's Google Calendar. The exact schema can be found in the system prompt.

## Disclaimer
No account information is stored anywhere. A Google account is only needed to access Google Calendar and Tasks.
