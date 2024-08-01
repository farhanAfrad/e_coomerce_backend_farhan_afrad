# How to run the application locally

### Detailed Steps
1. #### Clone the repo
2. #### Install Node.js Dependencies using npm or yarn
```bash
npm install
```
3. #### Create a .env file in the root directory
4. #### Add Data-base url from mongodb into .env file
```bash
DB_URL=mongodb+srv://<username>:<password>@cluster0.4vd9ngi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
5. #### Create a user in the mongodb database and replace the username and password
6. #### Run the application. You will find the command in the 'pacakge.json' file as "start:dev". Now run the command
```bash
npm run start:dev
```