# Template API

Template API Using ExpressJS

## How to install and run

**1. Install Volta, Node and Yarn**
This will install and use the version of node and yarn specified in the package.json.
https://volta.sh/
- `volta install node`
- `volta install yarn`

**2. Install MongoDB 3.6 locally.**

    On Mac:

    ```
    brew tap mongodb/brew
    brew install mongodb-community@3.6
    brew link --force mongodb-community@3.6
    ```

    On Windows

    ```
    https://www.mongodb.com/try/download/community
    ```

**4. Install libaries<br><br>**
   `yarn`

**5. Launch dev application<br><br>**
   `yarn run start:dev`

Server should launch bound to local port 3310 connected to local MongoDB instance.
