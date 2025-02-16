# Employee Recognition System  

## Overview  
The Employee Recognition System is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This platform allows organizations to reward employees, motivate them to perform better, and provide encouragement through a recognition and reward system.  

## Features  
- **User Authentication**: Secure login and registration using JWT.  
- **Employee Recognition**: Employees can give and receive recognition for outstanding performance.  
- **Reward System**: Employees can earn points and redeem rewards.  
- **Admin Dashboard**: Manage users, track employee engagement, and oversee reward distribution.  
- **Analytics & Reports**: View engagement metrics and recognition trends.  

## Tech Stack  
- **Frontend**: React, Redux, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Tokens)  

## Installation  

### Prerequisites  
- Node.js  
- MongoDB  
- npm 

### Backend Setup  
```sh
cd backend  
npm install  
npm start  
```  

### Frontend Setup  
```sh
cd frontend  
npm install  
npm start  
```  

## API Endpoints  
| Method | Endpoint        | Description                      |
|--------|---------------|----------------------------------|
| POST   | `/api/auth/register` | Register a new user           |
| POST   | `/api/auth/login`    | Authenticate a user           |
| GET    | `/api/employees`     | Get all employees             |
| POST   | `/api/recognition`   | Give recognition to an employee |
| GET    | `/api/rewards`       | Fetch available rewards       |



## License  
This project is licensed under the Apache 2 License.  


```
