# CRS Redux


## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
- [Python](https://python.org/downloads) 3.7
- [Node.js](https://nodejs.org/en/) LTS 10 or above
- [Git](https://git-scm.com/)

### Installing
A step by step series of examples that tell you how to get a development env running

1. Install Git, Python, and Node.js (links above).

2. Install and update Python package manager (`pipenv`).
```shell
> python -m pip install -U pipenv
```

3. Clone and extract repository to your machine
```shell
> git clone https://github.com/kvdomingo/upirisorg.git
```

4. Checkout a new `develop` branch. **DO NOT** make any modifications directly in the `master` branch. Similarly, **DO NOT** push directly to the `master` branch.
```shell
> git checkout -b develop
```

5. Install remaining prerequisites
```shell
> pipenv install --dev
> npm i -D
```

### Deploying locally
1. Open a terminal and run
```shell
> pipenv run python manage.py runserver
```

2. Open another terminal and run
```shell
> npm run dev
```

Access the local server at `http://localhost:8000`.

### Running the tests
```shell
> pipenv run python manage.py test
```

## Deployment
```shell
> git add .
> git commit -m <DESCRIPTIVE_COMMIT_MESSAGE>
> git push origin <GITHUB_BRANCH>
```
where `GITHUB_BRANCH` should reflect the type of changes you are implementing (e.g., `feature/some-amazing-new-feature`, `bugfix/crush-critical-bug`).

## Contributing
Email us :email:

## Authors
- **Kenneth V. Domingo** - [Email](mailto:hello@kvdomingo.xyz) | [Website](https://kvdomingo.xyz) | [GitHub](https://github.com/kvdomingo)
