# HabiticaQuestTracker - Installation Instructions

## 1. Install Node Version Manager 

If you already have NVM, Node and NPM installed, then just skip to step number 4. First step will be to install NVM - Node Version Manager (if not already existed from a previous project).

You can find out the latest version of NVM over [here(click me!)](https://github.com/nvm-sh/nvm#installing-and-updating). At the time of writing this it was 0.37.2.

You will have to write something like this in the terminal:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`

This will run the shell script you see above and install it. Next we're going to add a new environment variable by executing the following line:

`export NVM_DIR="$HOME/.nvm"`

And just like in Windows, you need to restart your terminal in order for it to be effective. If not, just reload your "profile" like this:

`source ~/.profile && source ~/.bashrc` (yeah you can't do this in Windows)

Confirm that it's been installed by running the following command:

`nvm --version`

## 2. Install Node.JS

This is where that NVM comes in handy. When downloading using `sudo apt-get install node` it might or might now give you the latest stable version. So, how do you install the latest version. Oh, you're going to love this... Let's run the following, first: 

`nvm list-remote`

It will print a long exhaustive list of node versions, but at the end you'll see something like this in the list:  `v14.15.2   (Latest LTS: Fermium)`

The "Latest LTS" is key, because we want the latest version and LTS because we want that long term support version. 

We'll keep this mind and run:

`nvm install <insert version` (in my case: `nvm install v14.15.2`)

This will install Node. Not the latest version available in the repository, but rather the latest version from Node themselves. Neat right?

Now, let's check that everything worked. Run `nvm list` and/or `node --version`. This will confirm you have the correct version installed.

## 3. Update NPM

This part is easy. Normally NVM should have installed the latest version, but better safe than sorry, right?

First, let's see what version we have currently, shall we?

`npm --version`

Now let's get the latest version by running:

`npm install -g npm@latest`

This will install the latest version. Now let's just check that we have the latest version installed.

`npm --version`

Likely nothing will change, but it's best to have the latest version, before we start working, right?

## 4. NodeMon, Node Modules & Node Run

Let's see if NodeMon was installed in a previous project, if applicable:

`npm list -g nodemon`

If you see nodemon and the version then you're good. Otherwise let's install nodemon, shall we:

`npm install -g nodemon`

Finally let's get all those node modules installed.

`npm install`

Now there's one more step to be able to make it work, locally. 

## 5. Final notes on setting up

The database connection won't work. You need the environment variables, which have to be placed in the .env file in the src folder. But as far as the website loading this should be more than enough.

Testing should also work. 

## 6. Testing

We need to install Jasmine, first of all and initialize it

`npm install --save-dev jasmine`
`npx jasmine init`

Finally to run the tests, simply write: 

`npm test`