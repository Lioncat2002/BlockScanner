# Luganodes SDE Task
Project name: blockscan
## Setup:
### Environment variables:
```
INFURA_MAIN_NET=
BEACON_DEPOSIT_CONTRACT_ADDR=
LOKI_API_KEY=
TELEGRAM_BOT_TOKEN=
USERS="1234546 181234565 6789055" # get your id from: https://web.telegram.org/k/#@getidsbot seperate multiple users with a space
GRAFANA_URL=
```

### Installation with Docker:
- Build the docker image with `docker build -t blockscan .`
- Create a virtual docker volume for the sqlite database with `docker volume create sqlite_data`
- Run the docker image with `docker run -d -p 8080:8080 -v sqlite_data:/app/prisma blockscan`

### Installation without Docker:
- Add the above mentioned envs into a `.env` file
- Run `npm install`
- Run `npx prisma db push` to generate migrations
- Build the application with `npm run build`
- Run the application with `npm run start` you can visit `http://localhost:8080/` for the frontend
- For dev environment you can use `npm run dev`
```
Note: Initial load might take some time depending on the start block number set in the .env file
```
### Visualization with grafana:
- Install the sqlite plugin with `grafana-cli plugins install frser-sqlite-datasource`
- Start the grafana server with `grafana server`
- Visit `http://localhost:3000/` for the running instance
- Load the dashboard template from `grafana\dashboard-template.json`
- Load the sqlite db file from `prisma\dev.db`
- You will be able to see the visualization.

## Gallery:
### Frontend:
![image](https://github.com/user-attachments/assets/b4120ce8-d641-4e9a-89bf-06de731cabca)

### Telegram notification:
![image](https://github.com/user-attachments/assets/f5a799e6-a414-4d0f-b5dd-1866a9dfca62)

### Grafana visualization:
![image](https://github.com/user-attachments/assets/6f745618-158d-4733-afe1-d133ab1c9b91)

