# Common build stage
FROM node:16.13 as common
ARG ARTIFACTORY_USER
ARG ARTIFACTORY_SECRET
ENV REPO_USER=$ARTIFACTORY_USER
ENV REPO_SECRET=$ARTIFACTORY_SECRET

RUN mkdir /app/
WORKDIR /app

# run yarn install only when package.json is changed
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./.npmrc.template /app/.npmrc

COPY . /app/

RUN yarn

RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "run", "start"]
