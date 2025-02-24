import axios from 'axios';

const params = new URLSearchParams({
    showCompleted: false,
    showDeleted: false
})

async function getTasks(userToken) {
    let allTasks = [];

    try {
        const tasklists = await axios.get("https://tasks.googleapis.com/tasks/v1/users/@me/lists",
            {headers: {
                'Authorization': `Bearer ${userToken}`
            }}
        );

        for (const tasklist of tasklists.data.items) {
            try {
                const tasks = await axios.get(`https://tasks.googleapis.com/tasks/v1/lists/${tasklist.id}/tasks?${params.toString()}`,
                    {headers: {
                        'Authorization': `Bearer ${userToken}`
                    }}
                );

                if (tasks.data.items) {
                    for (const task of tasks.data.items) {
                        allTasks.push({
                            id: task.id,
                            title: task.title,
                            due: task.due
                        });
                    }

                }
            } catch (error) {
                console.error(`Error fetching tasks for task list ${tasklist.id}:`, error.response?.data || error.message);
            }
        }

    } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
    }

    return allTasks;
    
}

export {getTasks}