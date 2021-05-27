# TaskManager

The Auth for the project is done on Firebase and the Firebase itself is used as a database

The Site is deployed at [TaskManager](https://taskkmanager.netlify.app/)

The Following Collections are used in Firebase 
<ol>
  <li>Users</li>
  <li>Tasks</li>
  <li>Comments</li>
</ol>

All the Collection have following properties: <br/>
  ## User: 
  <ol>
  <li>username</li>
  <li>email</li>
  <li>id</li>
  <li>createdAt</li>
</ol>

## Task
<ol>
  <li>[history]</li>
  <li>task</li>
  <li>id</li>
  <li>createdAt</li>
  <li>type</li>
  <li>assignedTo</li>
</ol>

## Comments
<ol>
  <li>content</li>
  <li>id</li>
  <li>email</li>
  <li>taskID</li>
</ol>
