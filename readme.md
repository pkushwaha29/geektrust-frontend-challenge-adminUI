
#Admin UI for User Management
This project is a React-based interface for admins to see and delete users. The users are provided via an API, and the UI allows the admin to search, edit, and delete users as well as select multiple users to delete at once.

##Features
*Column titles stand out from the entries for easy readability
*Search bar can filter on any property
*Edit and delete rows in place (no persistence)
*Pagination with 10 rows per page and buttons to navigate to any page
*Pagination updates based on search/filtering
*Select one or more rows to delete at once
*Checkbox to select or deselect all displayed rows
*Responsive design for mobile and desktop

##Technologies
*React
*React Hooks
*Material UI
*Axios

##API Reference
The Users API provides a list of all users and their properties. The users are sorted by the **id** field, with no alphabetical sorting.

##Endpoint
https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

##Request Type
GET

##Sample Response
[
  {
    "id": "1",
    "name": "Aaron Miles",
    "email": "aaron@mailinator.com",
    "role": "member"
  },
  {
    "id": "2",
    "name": "Aishwarya Naik",
    "email": "aishwarya@mailinator.com",
    "role": "member"
  },
  {
    "id": "3",
    "name": "Arvind Kumar",
    "email": "arvind@mailinator.com",
    "role": "admin"
  }
]

##Screenshots
![AdminUI]/(https://github.com/pkushwaha29/geektrust-frontend-challenege-adminUI/blob/main/AdminUI.jpeg)






