# <div align="center">FantasyMVP</div>  

### <div align="center">Fantasy Football Season in Review</div>

View Insights into your team's performance over the course of the NFL season extracted from the Sleeper.app API and supplemented missing information with ESPN's API!

[Sleeper API Documentation](https://docs.sleeper.app)
### Deployment/Installation
You can easily deploy this locally using Docker. Install the latest Docker CE from https://docs.docker.com/get-docker/  
  
Just change the MYSQL environmental variables in the .env.sample file and rename it to .env  
Then just run docker-compose up -d and the application and MySQL backend will automatically build and start running!  

View a demo @ https://fantasymvp.vaidyan.me  

Once you login to FantasyMVP, it shows you insights about the players on your selected roster in your Sleeper.app League. You can view their avatars and see the points they scored over the course of the 2021 season.


## <div align="center">Technologies:  </div>
### <div align="center">Backend:  </div>
<div align="center">NodeJS  </div>
<div align="center">Express.js  </div>
<div align="center">MySQL  </div>  

### <div align="center">Frontend: </div>
<div align="center">Javascript & JQuery</div>
<div align="center">HTML  </div>
<div align="center">CSS</div>
  

### Overview:
I implemented a login frontend that can register and login users by using Express to write API routes and using a MySQL database for storage. I hashed the passwords for security using a NodeJS library: Bcrypt. FantasyMVP fetches data from Sleeper.app API about users on its platform and their metadata like "What leagues are they in?" and "What players do they have and how many points have they scored?".
Sleeper.app deprecated the player scoring statistics from their API so I scraped the missing statistics from ESPN's api and stored the combined stats & info from ESPN and Sleeper in arrays & objects and then visualized it for the users of the app to see in one view. I implemented pagination and search features to help users view large rosters and a separate view to display the indepth statistical breakdown of their players' accomplishments this season.
