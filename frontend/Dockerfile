
# Step 1 - Build frontend source code
# Stage 0, "build stage" based on Node.js -- used to build and compile frontend React
# Stage 0 - Does ALL the building

FROM node:18 as build-stage

RUN npm install -g pnpm

WORKDIR /app
COPY ./nginx.conf /nginx.conf
COPY package*.json /app/
RUN pnpm install

COPY ./ /app/
RUN pnpm build


# Step 2 - Give ONLY built files to Nginx server
# Stage 2 - Take ONLY the built files

# Step 3 - Have Nginx serve the built files


FROM nginx:alpine
EXPOSE 80
# This copies all of our files froim the above BUILD STAGE container rather than localhost
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf


#OLD STUFF BELOW-------
## Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM node:18-slim as build-stage
#
#RUN apt-get update && apt-get upgrade -y && apt-get autoclean -y && apt-get autoremove -y
#RUN npm install -g pnpm
#
#WORKDIR /app
##nginx is the http request server that will actually serve our frontend
#COPY ./nginx.conf /nginx.conf
#COPY package*.json /app/
#
#RUN pnpm install
#
#COPY ./ /app/
#RUN pnpm build
#
##We are done with loaclhost:5173 front end, instead we are actually building the site
## Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
## Note it leaves out almost everything from build stage, making a MUCH smaller final container
##nginx is always working, we don't have to run it, per say
#FROM nginx:latest
#COPY --from=build-stage /app/build/ /usr/share/nginx/html
## Copy the default nginx.conf provided by tiangolo/node-frontend
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
#
