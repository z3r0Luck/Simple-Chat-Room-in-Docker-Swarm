In this project we implemented a web application in Node Js and Express, which runs on a docker swarm. The docker swarm also includes a replica set mongodb for storing data. The architecture of the mongodb replica set is shown below.

![](https://media.discordapp.net/attachments/646803567747006475/721113347713531934/docker_swarm.jpg)

### MongoDB replicas set

Change directory to mongodb_swarm and run: 

docker-compose build

Then deploy the stack:

docker stack deploy -c docker-compose.yml db

To check which service is running to which host we run:

docker service ps db_rs1 db_rs2 db_rs3

With the below command we can check info about network in swarm

docker network ls


### NodeJS - ExpressJS web app

In server.js file we change the hostnames accordingly:

var connectionString = "mongodb://*hostname1*,*hostname2*,*hostname3*/?replicaSet=*setname*&readPreference=secondaryPreferred";

Then run the below command to build the image

docker build -t *image-name*

Finally to run the node container we built run:

docker run --network *network-name* --name *container-name* -p 3000:8080 *image-name*

References
    * https://medium.com/lucjuggery/mongodb-replica-set-on-swarm-mode-45d66bc9245
    * https://medium.com/statuscode/dockerising-a-node-js-and-mongodb-app-d22047e2806f
    * https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/
