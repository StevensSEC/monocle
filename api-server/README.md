# Monocle API Server

# Setup

```
yarn
```

# Run

```
yarn start
```

The default port is 3000.

After running, you should be able to view API docs here: http://localhost:34444/apis/1/documentation

## Manual Heroku Deployment

```
heroku git:remote -a sec-monocle
git subtree push --prefix pythonappsd heroku master
```
