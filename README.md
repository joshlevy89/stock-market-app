This app allows users to track stock market trends in real time. 
This project is hosted on heroku at: https://my-stock-watcher.herokuapp.com/.

To run locally,   
npm install stock-market-app  
cd stock-martket-app  
npm run dev...to run in development mode     
npm run prod-test...to run in production mode  

Note that if you run in production mode, you will need to delete the bundle folder in the public folder to make changes. Otherwise, the old bundle will be served from that folder. 

This project fulfills the following user stories:  
-User Story: I can view a graph displaying the recent trend lines for each added stock. 
-User Story: I can add new stocks by their symbol name.  
-User Story: I can remove stocks.  
-User Story: I can see changes in real-time when any other user adds or removes a stock. For this you will need to use Web Sockets.