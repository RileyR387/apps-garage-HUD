# apps-garage-HUD
Student Training - Demonstrate basic best practices for web app devlopment

## Requirements
  * node (https://nodejs.org/)
  * git

## How this is built

### Initial repo creation
  1. Create git repo on github or on a remote server via `git init --bare apps-garage-HUD`
  1. From your workstation, clone repo with `git clone ssh://myserver//my/repo/dir/apps-garage-HUD`
  1. Enter repo working directory with `cd apps-garage-HUD`
  1. run `npm init` to create initial `package.json` file, fill in the request inputs.
      * This is unique to the node runtime environment... There are many options/methods for dependency/package management
  1. If expirementing. it's probably a good inital commit at this stage;
      * add package.json with `git add package.json`, follow up with a `git commit` and short message

### Install "express" server/middleware component
Web apps need middleware. Middelware is a broad term and usually theres more than one layer of it in production.

Typically middleware can do things like:
 * load basic config
 * manipulate/add/check HTTP headers
 * restrict HTTP request methods for individual routes (ie: GET, POST, PUT, DELETE)
 * enforce authentication APIs
 * initialize database connections on demand (or maintain pools)
 * ... The List goes on, but in general, this can be called "House Keeping"
   * Languages like php maintain sometimes maintain a poritions of their house via apache+(mod_php|phpfpm) or nginx+fcgi+phpfpm
   * Most other languages use apache/nginx/tomcat as a reverse proxy to their application middleware in *production* for additional security controls

#### We'll use express in this tutorial for our server middleware
  * `npm install express` (or `npm i express` for short)
  * create express hello world and add package script for app launch
  * review the following changeset:
  ```
  git diff 58a1d8a99a354dbf338d0a4c6885a9e6cde2d618..fc2b4861ed350ab11eacccd690a36f5b2136594c
  ```
  * If following along, duplicate above changeset and then run `npm run start`, navigate to `http://localhost:3000` and say hello!

### Application Configuration
Most web apps need configuration. More often than not, web app config contains private/sensitive information you want to **keep out of the repository** such as:
  * service account credentials
  * API keys
  * API endpoints (aka service URL's)
  * debug/log level controls
  * etc... ("/etc/" pun intended)

This presents some questions...
  * How should we work with this sensitive information within a code repository?
  * What if config was dynamically loaded based on something like.. your environment?
  * To what degree can our app function with a demo/example config?
     * Most web apps can't really function without their database/api keys, but we'll compromise with **documentation** in our example config where necessary

Lets cover the first 2 questions by leveraging the **config** package from NPM combined with **js-yaml**
  * `npm i config js-yaml`
  * review changeset:
  ```
  git diff fc2b4861ed350ab11eacccd690a36f5b2136594c..edb9bdc20baeaef5246a1a7219d081a34c1cb999
  ```

Take notice to the additions to .gitignore and package.json... They're important.
  * Create a development config that will correspond to your environments "NODE_ENV=dev" value used in the package "dev" script; like so: `cp config/default.yaml config/dev.yaml`
     * The config api from NPM can also read these values from your shell environment.. by environment, we really mean "$ENV", seen with `echo $ENV` from a terminal/shell
  * `git status` shoudln't show this new file.. and that's intentional, it could eventually contain sensitive information...

Try our your development config...
  * Update the server port to be 3000 in `config/dev.yaml` from 8080.
  * run `npm run start` and it will use the default config unless you've manipulated the parent shell environment vairable "NODE_ENV"
  * `ctrl+c` that process and then run `npm run dev`, the new server should be running on port 3000 rather than 8080.. NEAT!

### Web Templates
##### HTML... its just fancy XML your browser can read
  * It's not really meant for human consumption...
  * UI dev kits in native windows managers are worse though! They're also less future proof and less evolved and harder to maintain (usually)
  * At least it's got javascript support (nearly) every where these days!

#### HTML Template Frameworks
There are too many options, particually within the node/npm runtime.. Generally you want one that supports
  * Basic `for loop` constructs
  * An `if else` constuct

Aside for general programming.. Don't redo work...
   * See: https://ejs.co/#install for info on what we used here, but installl it this way:
   * `npm i ejs`
   * Skip a ton of web/html/resource(bootstrap/javascript) stuff.. and just lift the view code from changeset:
   ```
   git diff edb9bdc20baeaef5246a1a7219d081a34c1cb999..0fea5ee8f26739b0d453b98dd6b33b64db68845c
   ```

## Mull over the above.. Should "contactGroups" be an inline javascript item?
  * No...
  * If it changes a lot.. a relational database and web UI for maintaining that relational database would be sweet.. but...
  * What if this data exist elseware? Did we just build a shadow database??? (if you're displaying phone number... probably)
  * We could integrate with a directory... but that's a lot of code/access.. how do we pick who we pull from the directory? Who will maintain is long term? What if the direcory is masked info...
  * What if my audience is small, changes are minimal, and my timeline is tight?
     * For this "Heads up display", I vote "config/dev.yaml" as a home :) Time to learn some yaml!

