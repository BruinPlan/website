# BruinPlan Setup

## Prerequisites

- Node.js installed
- MySQL server installed locally or remotely
   - Download link: https://dev.mysql.com/downloads/mysql/
   - MySQL Workbench is  recommended: https://dev.mysql.com/downloads/workbench/

## Installation + Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/BruinPlan/website.git
   cd website
   ```
2. Modify the `move` command in `"scripts"` in `frontend/package.json` depending on your Operating System:
   
      - Windows:
      ```json
      "scripts": {
         ...
        "build": "react-scripts build && move ./build ../build/frontend",
        ...
      ```
      - Mac/Linux:
      ```json
      "scripts": {
         ...
         "build": "react-scripts build && mv ./build ../build/frontend",
         ...
      ```
2. Install dependencies and build the Node.js app:
   - In the root directory:
      ```bash
      npm install
      npm run build
      ```
   - Install dependencies for the React app and build it:
      ```bash
      cd frontend
      npm install --legacy-peer-deps
      npm run build
      ```

3. Set up the MySQL database:

   - Ensure MySQL server is running, note the host, username, and password
   - Create a MySQL connection in MySQL Workbench
   - Enter the MySQL connection credentials in the connection settings
   - Run the script `bplan.sql` in the MySQL connection to create the database and tables (File -> Open SQL Script -> Run Script (lightning bolt icon))

4. Configure the environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:

     ```sh
     GOOGLE_CLIENT_ID="664712804310-jqok8vvq8as7l3o8o7r5nesehc7cknvs.apps.googleusercontent.com"
     GOOGLE_CLIENT_SECRET="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"
     DB_HOST=your_db_host
     DB_USER=your_mysql_username
     DB_PASS=your_mysql_password
     DB_NAME='bplan'
     PORT='3000'
     ```
   - Replace `your_mysql_username`, `your_mysql_password`, and `your_database_name` with your MySQL credentials.

## Running the App

Start the Node.js app in the root project directory:
   ```bash
   npm start
   ```

## Usage

- Visit `http://127.0.0.1:3000` in your browser to view the React app.
- Login with Google to access the protected route.
- May need to log in twice to access your schedule