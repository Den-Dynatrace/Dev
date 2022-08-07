# Development repository for SME Tracker 
[SME Tracker](smetracker.dynatrace.com)
## Architecture overview:
### Languages:
SME Tracker tool was developed in JavaScript using node.js as the engine, express.js as the application and express-session as the session hosting tool.  The pages are written in EJS a HTML/JavaScript hybrid and styled in CSS/ 
### Authentication:
Authentication for the application  utilizes Microsoft MSAL engine stored in [authConfig.js]( https://github.com/Den-Dynatrace/Dev/blob/main/authConfig.js) and [routes/auth.js]( https://github.com/Den-Dynatrace/Dev/blob/main/routes/auth.js) .  Additionally we call to Microsoft Graph API for employee name, manager name, and manager direct reports to generate initial user profiles. 
### Database:
SME Tracker is designed to run off a MongoDB style document database (NoSQL).  Meaning queries utilize filters for specific matching documents not tables.  Each employee user will have a collection additionally there is a managers collection containing the ID documents for saved managers.  All DB calls are stored in [db_queries.js]( https://github.com/Den-Dynatrace/Dev/blob/main/db_queries.js).  These queries cover the general CRUD methods.  (Note the DEV database as of 8/6/2022 no longer exists, for continued dev please create free mongo Database on local machine for testing DB connection string can be added to .env)
### OneDrive:
OneDrive save command is a Microsoft JDK added to the [injectDoc.ejs]( https://github.com/Den-Dynatrace/Dev/blob/main/views/injectDoc.ejs) page.  This requires an additional verification and requires heavy user interaction to save file correctly.  The delete operation is completed utilizing saved Onedrive document ID and D1 Onedrive Drive ID to create Graph API Call.  
### Views
[Views]( https://github.com/Den-Dynatrace/Dev/tree/main/views) Contains all HTML code written in ejs.  These views are rendered by the routes assigned to them in [app.js]( https://github.com/Den-Dynatrace/Dev/blob/main/app.js).  Each view is styled by specific CSS document saved in [public/stylesheets]( https://github.com/Den-Dynatrace/Dev/tree/main/public/stylesheets). 
###
