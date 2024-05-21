## Journey Orchestrator

As Earth’s coffee supply dwindles and the lure of Martian sunsets grows, humanity sets its sights
on Mars—not just to visit, but to stay. This grand plan requires more than old-school gadgets; it
needs groundbreaking innovation. Relay42 is stepping up with the "Journey Orchestrator,"
designed to seamlessly manage the chaos of setting up shop on another planet. This platform
aims to streamline the complex coordination of interplanetary travel, ensuring that every aspect of
mission planning and execution is meticulously organized and monitored. Your task is to develop
this comprehensive system, incorporating real-time data handling, user interactions, and dynamic
content.

## Start the project

Open the terminal in the repository location

Install packages:

`yarn`

Run react server

`yarn dev`

Open a second terminal without closing the first one,

Move to /server folder

`cd server`

run mock with json-server:

`run npx json-server db.json`

Unit Testing - Jest

`yarn test`

# Missions

### Base url - List of Missions:

Add a new mission or edit existing ones.

Search by name

Date and Days to mission, or departure mission

![Main screen](public/assets/Missions.png 'Missions')

### Create page - Add a new Mission:

Mission name and departure date are required

A mission must have exactly 1 pilot

Pilot should have at least 10 years of experience

All engineers have different job (can't have 2 engineers with the same job)

At least 1 passenger

![Create](public/assets/Create.png 'Create')

### Edit page - Edit a Mission:

Mission name and departure can be edited

Members can be added and removed

Same validations as create a mission page

![Edit](public/assets/Edit.png 'Edit')
