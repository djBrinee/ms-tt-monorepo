# 🧩 Microservices Architecture – Technical Test
This project is built with the intention to demostrate backend skills and use case analysis, considering backend dev position. Requirements of this projects include the following microservices and components:

* **`ms-get-profile`** – retrieves user profile data and requests data from the following ms.
* **`ms-crud-profile`** – handles some CRUD operations for user profiles, just necessary endpoints.
* **MongoDB:** stores profile data.
* **Kubernetes – deployment:** orchestration with secrets, services, PVCs and NodePort services exposing.
* **Basic Auth + API Key:** enhances services communication: external and internal.



## Architecture Overview

[Excalidraw schema](https://excalidraw.com/#json=G8kxWcoQxnDcuukl1-kls,8I6IFQua0NLk_0uZUFWg1w)


## Getting started


### 🐳 Docker Compose (Local Testing)

```
docker-compose build
docker-compose up
```

Test endpoints:

* `http://localhost:3001/get-profile`
* `http://localhost:3002/profile/get`
* `http://localhost:3002/profile/create`

### ☸️ k8S Deployment
**DISCLAIMER:** run `docker-compose down` before setting up k8s.

1. Build docker images (in root folder)
```
docker build -t ms-crud-profile:latest -f ./packages/ms-crud-profile/Dockerfile .
docker build -t ms-get-profile:latest -f ./packages/ms-get-profile/Dockerfile .
```

3. Create K8s env
```
kubectl create namespace microservices-demo

```

2. Apply K8s manifests:
```
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/ms-crud-profile-deployment.yaml
kubectl apply -f k8s/ms-get-profile-deployment.yaml
```

3. Port forward for testing in local env (without exposing containers)
```
kubectl port-forward service/ms-get-profile 3001:3001 -n microservices-demo
```



#

### 🔒 Environment variables

As this is a demo project, there's no problem sharing them

**`./ms-get-profile`** folder:

```
    PORT=3001
    API_KEY=S4MPL3_KeY
    CRUD_SERVICE_URL=http://ms-crud-profile:3002
    BASIC_AUTH_USERNAME=4dm1n
    BASIC_AUTH_PASSWORD=s3cr33t
```


**`./ms-crud-profile`** folder:

```
    MONGO_URI=mongodb://mongo:27017/profiles
    PORT=3002
    SECRET_KEY=my_secret_key
    API_KEY=S4MPL3_KeY
    BASIC_AUTH_USERNAME=4dm1n
    BASIC_AUTH_PASSWORD=s3cr33t
```

#

### 📫 Endpoints:
**ms-get-profile**

| Method    | Endpoint |Description
| -------- | ------- | --------
| `GET`  | `/profile/get?email=user@example.com`    | Get user profile by the email.

**ms-crud-profile**

| Method    | Endpoint |Description
| -------- | ------- | --------
| `POST`  | `/profile/create`    | Create new profile.
| `DELETE`  | `/profile/delete`    | Delete profile by email.


**Headers required**
```
x-api-key: S4MPL3_KeY
Authorization: Basic base64(username:password)
```

#
### 👨‍💻 Author:

**Deivy Jr Peña Rodríguez - SE**