nodetodo
========

Bare-bones todo list web application in Node.js.

User may input a task, click "Add," and see the task appended to the todo list.
User may then click the checkboxes for some sense of satisfaction upon completing tasks.

The todo list is stored in a MySQL table, so at the moment this does not scale to multiple users
(though a single hive-mind todo list could be interesting...).
This is a problem that will be addressed in future iterations.

Deployment with Heroku
----------------------
Requires ClearDB to be installed:
`heroku addons:add cleardb:ignite`

`package.json` and `Procfile` should be good to go for deployment.

Due to issues with Heroku not wanting to compile static files, todostyle.css is currently loaded from a remote site.

Current functionality
---------------------
* Input a task in the box; click "Add" to add to the list.
* Tasks are appended to the end of the list.
* Navigate to /clearTable to start fresh.

A todo list for nodetodo
------------------------

Top priority:
- safeguard against sql injection, other security issues
- find a more secure way to reset the table
- generate/display task timestamps

Second priority:
- a means to remove individual tasks
- a means to reorder tasks
- a means to categorize tasks
- deadlines
- support for multiple users

Big pie-in-the sky features that could be cool:
- a "trophy room" list of completed tasks