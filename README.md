# Microservices tech test project
### Project overview:
This monorepo contains two microservices built with **TypeScript**, **Express.js**, and **MongoDB**, managed using **Nx**.  

### Endpoints and services:
**ms-get-profile**

| Method    | Endpoint |Description 
| -------- | ------- | --------
| `GET`  | `/profile/get?email=user@example.com`    | Get user profile by the email. 

**ms-crud-profile**

| Method    | Endpoint |Description 
| -------- | ------- | --------
| `POST`  | `/profile/create`    | Create new profile.
| `DELETE`  | `/profile/delete`    | Delete profile by email. 
