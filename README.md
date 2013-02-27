nodetodo
========

Bare-bones todo list web application in Node.js.

User may input a task, click "Add," and see the task appended to the todo list.
User may then click the checkboxes for some sense of satisfaction upon completing tasks.

The todo list is stored in a MySQL database, so at the moment this does not scale to multiple users
(though a single hive-mind todo list could be interesting...).
This is a problem that will be addressed in future iterations.

Here's a todo list for nodetodo.

Top priority:
- safeguard against sql injection
- generate/display task timestamps

Second priority:
- a means to remove tasks
- a means to reorder tasks
- a means to categorize tasks
- deadlines
- support for multiple users

Big pie-in-the sky features that could be cool:
- a "trophy room" list of completed tasks