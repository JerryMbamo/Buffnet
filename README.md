# Buffnet

Buffnet is the place for movie buffs all around the world. A movie recommendation app that also offers a social community for movie buffs to review and discuss movies.

## How to run Buffnet using Docker

### Navigate to Root Folder of Project

Type the following commands on your terminal

**Builds our containers**

```
docker-compose build
```

**Runs our ML Backend container**

```
docker-compose up -d mlbackend
```

**Runs our backend container**

```
docker-compose up -d backend
```

**Runs our frontend**

```
docker-compose up -d client
```

**To view console logs of frontend docker container**

```
docker logs -f client-container
```

**To view console logs of backend docker container**

```
docker logs -f backend-container
```

**To view console logs of ML Backend docker container**

```
docker logs -f mlbackend-container
```

### Go to Google Chrome

Type the following on website entry box of chrome

**To run frontend**

```
localhost:3000
```

## How to run Buffnet Locally

### Navigate to Backend Folder of Project

Type the following command(s) on your terminal

**Downloads any libraries for our backend**

```
npm i
```

**Runs our backend**

```
npm start
```

**If Backend ran properly you should see following terminal output**

```
Server running on port 5000
You are connected to MongoDB
```

### Navigate to client Folder of Project

Type the following command(s) on your terminal

**Downloads any libraries for our client**

```
npm i
```

**Runs our frontend**

```
npm start
```

**If Frontend ran properly you should see it appear on your browser without errors**
