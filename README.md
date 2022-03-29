# <div align="center">FantasyMVP</div>  

### <div align="center">Fantasy Football Season in Review</div>

View Insights into your team's performance over the course of the NFL season extracted from the Sleeper.app API and supplemented missing information with ESPN's API! Once you login to FantasyMVP, it shows you insights about the players on your selected roster in your Sleeper.app League. You can view their avatars and see the points they scored over the course of the 2021 season. If you don't have a Sleeper App account, just use my username -> IceyTShaun 

[Sleeper API Documentation](https://docs.sleeper.app)
### Deployment/Installation
You can easily deploy a local instance on your own environment using Docker. Install the latest Docker CE from https://docs.docker.com/get-docker/  and Docker-Compose to get started!
  
Just change the MySQL environmental variables in the .env.sample file and rename it to .env  
Then just run ```docker-compose up -d``` and the app and MySQL backend will deploy and start running w/ database persistence! I'd recommend an extra step of using a reverse proxy such as Traefik or Nginx to securely expose your services to outside your LAN and secure with certificates. I used Nginx and a wildcard cloudflare certificate on my instance.

View a demo @ https://fantasymvp.vaidyan.me  

Here's a sample of my nginx configuration for reference
```
# Forward both apex and www from non-SSL to https://www

server {
	listen 80;
	server_name fantasymvp.vaidyan.me www.fantasymvp.vaidyan.me;
	return 301 https://fantasymvp.vaidyan.me$request_uri;
}
server {
	listen 443 ssl;
	server_name fantasymvp.vaidyan.me www.fantasymvp.vaidyan.me;
	ssl_certificate /etc/letsencrypt/live/vaidyan.me/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/vaidyan.me/privkey.pem;
	include /etc/nginx/snippets/ssl-params.conf;
	location / {
		proxy_hide_header X-Powered-By;
		proxy_pass_header Authorization;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Host $host;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_buffering off;
		proxy_set_header Connection "";
		proxy_read_timeout 36000s;
		proxy_redirect off;
		proxy_pass http://docker-host-ip:3000;
	}
}

```
  
  
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
