# Build & Deploy Support Desk By Socket.IO & React.JS

![amazona](/frontend/public/support-desk.png)

## Features:

- beautiful UI by react bootstrap
- display chat button on public website to start chat
- browse website while chatting with admin
- pause/resume chat with admin
- display admin dashoard
- show all users with their status (online, offline, new message)
- enable live chat with selected user
- flag new messages from online users
- support multiple users from one single page by admin

## Run

```sh
# clone project in a folder
$ git clone git@github.com:basir/support-desk-react-socket-io-final.git
# open folder in vs code
$ cd support-desk-react-socket-io-final
$ code .
# run backend
$ cd backend
$ npm install
$ npm start
# run frontend in a new terminal
$ cd frontend
$ npm install
$ npm start
```

### Chat with admin

- open http://localhost:3000
- click on Chat with us
- send message to admin

### Admin dashboard

- open http://localhost:3000/admin
- select user in left panel
- send message to user

## Lessons

1. create-react-app
2. create website layout
3. create chat box on home page
4. create admin support page
5. create socket.io server
6. implement user login on socket.io
7. implement send message
8. implement receive message
