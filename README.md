# leader-board ![test](https://github.com/allevo/leader-board/actions/workflows/node.js.yml/badge.svg)

## How to run locally
Create the file `backend/.env` from `backend/default.env` with the right values.

Open 3 terminals:

- term1
Start the backend
```
cd backend
npm ci
PORT=8080 npm start
```

- term2
Import data into DB
```
curl localhost:8080/admin/import-data
```

- term2
Start the frontend
```
cd frontend
npm ci
npm run dev
```
