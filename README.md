# Camera-Surveillance-Dashboard--Cloud-Tehnologies
React Surveillance Dashboard


This repository is for a React Dashboard application. The application is a Camera surveillance dashboard that allows its users to hook live streams from their IP Cameras to the dashboard. The application is a fully managed software powered by AI that supports multiple anomaly detection including but not limited to arson, robbery, theft and illegal dumping.


## Application hosting:
The application is hosted on AWS through AWS amplify, which utilizes AWS resources under one umbrella. And on the backend uses CloudFormation to deploy the stack.
## User Login system:
The user login systems is made using AWS Cognito user pools. A private user pool is setup in AWS Cognito, various parameters are set that are application specific. An image of the login screen is shown below:

![image](https://user-images.githubusercontent.com/101527504/235323008-2e72ddf0-5239-450e-aad1-9cc3dcae35ef.png)
<p align="center">
Fig.1 Login page
</p>

The user signup function has been turned off, and a user cannot be created from outside the application. The user when logs in, its credentials are checked against the users credentials in the Cognito user pool.
## Dashboard: Below is an image of the dashboard:

![image](https://user-images.githubusercontent.com/101527504/235323019-b675956e-6d28-4b8d-9919-7ce65f4bbc23.png)

<p align="center">
Fig.2 Dashboard dark mode
</p>

![image](https://user-images.githubusercontent.com/101527504/235323297-e5986bae-8fcb-4eb5-9722-1ee71a72b3c5.png)
<p align="center">Fig.2 Dashboard light mode </p>

The dashboard is made up of multiple UI components, they are enumerated below:
- Top bar: The top bar is made using material UI, it ha various elements, there is a search bar on the left side, and couple of buttons for various operations on the right side. The options include logging out, toggling dark mode, light mode, settings and alerts. An image of top bar is shown in figure 3.

![image](https://user-images.githubusercontent.com/101527504/235323096-79d2de2e-562a-477d-bb89-99e19847de0f.png)
<p align="center">Fig.3 Topbar</p>

- Sidebar: is a collapsible sidebar with different menu items, the user name and user clearance level for easy view is shown on the sidebar. The Sidebar is made using react sidebar and material UI. An image of the sidebar is shown below in figure 4.

<p align="center">
  <img src="https://github.com/kgdash116/Camera-Surveillance-Dashboard--Cloud-Technologies/blob/main/images/Sidebar.png?raw=true">
</p>
<p align="center">Fig.4 Sidebar</p>

- Video feeds: for simulation purposes, 4 static video sources have been added on the dashboard for the user to view, in essence they imitate
live video feeds coming from IP cameras that are meant to be monitored. The video cards are shown in figure 5.

![image](https://user-images.githubusercontent.com/101527504/235323286-76ae4013-8af1-4d7a-83a4-15c13b198bc0.png)
<p align="center">Fig.5 video feeds</p>

- User chart: the user chart is a dynamic chart which shows the number of users that have access to the dashboard. Two types of users are authorized to work on the application and their permissions vary accordingly. The information displayed is dynamic and is queried and displayed from the user pool. The user chart is shown in figure 6.

![image](https://user-images.githubusercontent.com/101527504/235323166-9540934f-b5d6-4a21-8838-a35b6a28c337.png)
<p align="center">Fig.6 User chart</p>

- Alert generated chart: The alerts generated chart compiles the alerts accrued over the year, it represents the count of these alerts separated by months, the graph is dynamic and the number of alerts can be queried when the mouse is hovered over the graph. An image of this graph can be seen in the figure below.

![image](https://user-images.githubusercontent.com/101527504/235323186-32f376fc-a4a5-4fb6-9461-18d15c1dab88.png)
<p align="center">Fig 8. Alerts generated graph</p>

- Recent alerts component: the recent alerts component presents the latest alerts recorded, it gives the name of the building/are the alert was recorded in, the camera name that captured the event, a time stamp and the alert type that was detected. A figure below shows the recent alert component.

<p align="center">
  <img src="https://github.com/kgdash116/Camera-Surveillance-Dashboard--Cloud-Technologies/blob/main/images/recent%20alerts.png">
</p>
<p align="center">Fig 9. Recent alerts</p>

- Alerts by buildings chart: the alerts by building charts compiles all the number of alerts generated separated by the building/area the alert was recorded at. It also presents a count of the particular alert. For the moment only three alert classes have been used that include: Arson, Dumpling and motor accident. The graph is dynamic and the number of alerts can be queried when the mouse is hovered over the graph. An image below shows the graph.

![image](https://user-images.githubusercontent.com/101527504/235323213-76623c87-70fa-49f7-8ffb-5c41425141c4.png)
<p align="center">Fig 10. Alerts (count represented by buildings)</p>

- Create User component: The create user component is used for creating users, it can be accessed through the side bar. The application is set as such that only “Admin” users can create new users. The user can only be created from inside the application, and anyone cannot signup to use the service. For signing up the following are required:
-- User name
-- User email
-- User password
-- Clearance level i.e. if the user is a admin or not.
If the user is not an admin it will automatically be assigned staff level clearance. Once the user has been created, the created user will receive a secret code that they can use to access the application. An image of the component is shown below.

![image](https://user-images.githubusercontent.com/101527504/235323225-a0d8c745-1bc6-4655-8212-49ab84e9c3d8.png)
<p align="center">Fig. 11 Create user component</p>

- Users component: This component displays the active application users in the form of a table, the users name, email address, status and clearance level is shown in this component. Only admin level users
can delete other users. The staff level user does not have delete privileges. A confirm delete prompt is shown when a user is to be deleted. An image of the user’s component is shown below.

![image](https://user-images.githubusercontent.com/101527504/235323236-0deecfb7-3426-4f59-a254-617bb048642a.png)
<p align="center">Fig 12. User table</p>

- Calendar: the calendar component is added to show the alerts generated by the date; the alert was encountered. This component is not yet complete as the backend still need a little working. The calendar component is shown below.

![image](https://user-images.githubusercontent.com/101527504/235323244-fe9202fa-3fea-458f-995a-2780fa0390df.png)
<p align="center">Fig 13. Calendar component</p>

- Charts and graphs: All charts and graphs in full form with all the detailed axis and legends, that are displayed on the dashboard can be viewed independently and they can be accessed through the side bar menu.
