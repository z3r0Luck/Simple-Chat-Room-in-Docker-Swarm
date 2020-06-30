Σε αυτό το project υλοποιήσαμε μια web εφαρμογή σε Node Js και Express, η οποία τρέχει σε ένα docker swarm. Το docker swarm επίσης περιλαμβάνει ένα replica set mongodb για την αποθήκευση των δεδομένων. Η αρχιτεκτονική του mongodb replica set φαίνεται παρακάτω.

![](https://media.discordapp.net/attachments/646803567747006475/721113347713531934/docker_swarm.jpg)

### MongoDB replicas set

Μπαίνουμε στο φάκελο mongoDB_swarm και εκτελούμε 

docker-compose build

Στην συνέχεια κάνουμε deploy το stack

docker stack deploy -c docker-compose.yml db

Για να δούμε που τρέχουν το καθένα service εκτελούμε το παρακάτω

docker service ps db_rs1 db_rs2 db_rs3

Με την παρακάτω εντολή βλέπουμε τα δίκτυα του docker και πιο συγκεκριμένα του mongodb:

docker network ls


### NodeJS - ExpressJS web app

Στο αρχείο server.js αλλάζουμε τα hostnames κατάλληλα

var connectionString = "mongodb://*hostname1*,*hostname2*,*hostname3*/?replicaSet=*setname*&readPreference=secondaryPreferred";

Στην συνέχεια για να δημιουργήσουμε το image τρέχουμε:

docker build -t *image-name*

Τέλος για την δημιουργία του container τρέχουμε:

docker run --network *network-name* --name *container-name* -p 3000:8080 *image-name*


Η web εφαρμογή τρέχει στον παρακάτω σύνδεσμο: http://83.212.77.69:3000/


References
    * https://medium.com/lucjuggery/mongodb-replica-set-on-swarm-mode-45d66bc9245
    * https://medium.com/statuscode/dockerising-a-node-js-and-mongodb-app-d22047e2806f
    * https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/

Μέλη Ομάδας
    * AM 71343868
    * AM 711141081