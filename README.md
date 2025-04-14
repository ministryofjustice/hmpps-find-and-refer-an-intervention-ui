# hmpps-find-and-refer-an-intervention-ui

[![repo standards badge](https://img.shields.io/endpoint?labelColor=231f20&color=005ea5&style=flat&label=MoJ%20Compliant&url=https%3A%2F%2Foperations-engineering-reports-prod.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fendpoint%2Fhmpps-find-and-refer-an-intervention-ui&logo=data:image/png;base64,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)](https://operations-engineering-reports-prod.cloud-platform.service.justice.gov.uk/public-report/hmpps-find-and-refer-an-intervention-ui)
[![CircleCI](https://circleci.com/gh/ministryofjustice/hmpps-find-and-refer-an-intervention-ui/tree/main.svg?style=svg)](https://circleci.com/gh/ministryofjustice/hmpps-find-and-refer-an-intervention-ui)

This repository contains the ui code for the `Find and Refer an Intervention UI`.

## Required software

Most software can be installed using [homebrew](https://brew.sh/).

- Docker
- Node (>=22)

## Running the application locally

After setting up the dependencies (below), run the application locally with with:

```bash
npm run start:dev
```

The dev server comes with Hot Module Reloading (reloads and restarts when any file changes are detected)

### Docker

This project includes docker compose files to start the required dependencies for running the UI locally.

Run the following command to pull the relevant dependencies for the project.

```bash
docker-compose pull
```

and then the following command to run the containers.

```bash
docker-compose up
```

can optionally be run in detached mode in order to retain terminal use

```bash
docker-compose up -d
```

### Environment Files (.env)

Node requires a .env file to start the application, but the project does not make heavy use of environmental variables.

Before starting the application create a new blank .env file by either creating a blank .env file:

```bash
touch .env
```

or copying the example file:

```bash
cp .env.example .env
```

### Connecting to local database

The service uses a postgres database alongside flyaway migrations to create and populate the database. To connect to the
database locally in your preferred database
client ([IntelliJ Ultimate](https://www.jetbrains.com/help/idea/database-tool-window.html), [Dbeaver](https://dbeaver.io/),
[Pgadmin](https://www.pgadmin.org/), etc).

Create new connection using local database credentials;

| Variable | Value |
| -------- | ----- |
| Port     | 5432  |
| Username | root  |
| Password | dev   |

## Authorization and Authentication

The service uses an Oauth 2.0 setup managed through the Hmpps Auth project. To call any endpoints locally a bearer token must be generated. This can be done through calling the auth endpoint in the Hmpps-auth service.

| Variable         | Value                                          |
| ---------------- | ---------------------------------------------- |
| Grant type       | Client credentials                             |
| Access token URL | <http://hmpps-auth:8090/auth/oauth/token>      |
| Client ID        | hmpps-find-and-refer-an-intervention-ui-client |
| Client Secret    | clientsecret                                   |
| Scope            | Read                                           |

For Client ID and Secret refer to the relevant credentials for the Find and Refer Project.

### Client Credentials flow

These are used by the application to request tokens to make calls to APIs. These are system accounts that will have their own sets of roles.

Most API calls that occur as part of the request/response cycle will be on behalf of a user.

To make a call on behalf of a user, a username should be passed when requesting a system token. The username will then become part of the JWT and can be used downstream for auditing purposes.

These tokens are cached until expiration.

These credentials are configured using the following env variables:

- CLIENT_CREDS_CLIENT_ID
- CLIENT_CREDS_CLIENT_SECRET

System tokens are obtained by making a call to HMPPS-Auth using the username of the logged in user. This token can then be added to the appropriate rest client calling to another service.

### Logging in with a test user

Once the application is running you should then be able to login with:

Community User
username: REFER_MONITOR_PP
password: R8Mpassword

Custody User
username: FRI_USER_ACP_REF_TEAM
password: password123456

## Extra commands

### Run linter

- `npm run lint` runs `eslint`.
- `npm run typecheck` runs the TypeScript compiler `tsc`.

### Run unit tests

`npm run test`

## Deployments

Deployments are part of our CI process, on the `main` branch using the `build-test-and-deploy` Workflow.

[This is a link](https://app.circleci.com/pipelines/github/ministryofjustice/hmpps-find-and-refer-an-intervention-ui?branch=main) to the most recent runs of that Workflow.

Deployments require a manual approval step.

### Testing a Deployment

The Find & Refer an Intervention Service is not presently live.  We therefore do not have a Production environment available. 

It is only possible to do User Acceptance Testing (UAT), i.e. click around a browser, on our Dev environment.

To test a deployment to production, we have to examine the logs of a pod, to assert if it has spun up successfully or not.  This is obviously not ideal.

### Kubernetes

All deployments and environments are managed through Kubernetes. 

For information on how to connect to the Cloud Platform's Kubernetes cluster follow the setup
guide [here](https://user-guide.cloud-platform.service.justice.gov.uk/documentation/getting-started/kubectl-config.html#connecting-to-the-cloud-platform-39-s-kubernetes-cluster).

For further Kubernetes commands a useful cheat sheet is
provided [here](https://kubernetes.io/docs/reference/kubectl/quick-reference/).  Similarly, the `--help` flag on any `kubectl` command will give you more information.

### Testing a Deployment

#### 1. Find the deployments in the `hmpps-find-and-refer-an-intervention-prod` namespace:

```zsh
$ kubectl get deployments -n hmpps-find-and-refer-an-intervention-prod

NAME                                           READY   UP-TO-DATE   AVAILABLE   AGE
hmpps-find-and-refer-an-intervention-service   0/0     0            0           41d
hmpps-find-and-refer-an-intervention-ui        2/2     2            2           41d
```

If you have done a deployment of UI, there should be more than 0 Pods marked as `READY` in that response, indicating that they have, indeed, been spun up.

#### 2. Double-check the Pod(s) associated with the Deployment:

Per [Kubernete's docs](https://kubernetes.io/docs/concepts/workloads/pods/):

> A Pod is similar to a set of containers with shared namespaces and shared filesystem volumes.

View the Pods in the namespace, these are what the `READY` column in the `get deployments` refer to:

```zsh
$ kubectl get pods -n hmpps-find-and-refer-an-intervention-prod

NAME                                                       READY   STATUS    RESTARTS   AGE
hmpps-find-and-refer-an-intervention-ui-58b989489d-blprx   1/1     Running   0          2m49s
hmpps-find-and-refer-an-intervention-ui-58b989489d-mkb7p   1/1     Running   0          2m49s
```

#### 3. Check the logs of a Pod

It is possible to read the logs of a given Pod to check that the build and spin-up process for the Pod has been successful.

To view the logs from any of the Pods whose name is given in the previous responses:


```zsh
kubectl logs $POD_NAME -namespace hmpps-find-and-refer-an-intervention-prod

# ...
Application Insights 2.X SDK. []
14:25:13.500Z  INFO HMPPS Find And Refer An Intervention Ui: Server listening on port 3000
```

Where `$POD_NAME` is the full string Pod name given in the `get pods` response.

#### 4. Scale down the Pods

While we are in pre-release, it's important not to leave the pods running.  

We scale down the number of running Pods in the Kubernetes deployment with the following:

```zsh
$ kubectl scale deployment $DEPLOYMENT_NAME -n $NAMESPACE --replicas=0

deployment.apps/hmpps-find-and-refer-an-intervention-ui scaled
```

And then double-check this has taken effect:

```zsh
$ kubectl get deployments --namespace=hmpps-find-and-refer-an-intervention-prod

NAME                                           READY   UP-TO-DATE   AVAILABLE   AGE
hmpps-find-and-refer-an-intervention-service   0/0     0            0           41d
hmpps-find-and-refer-an-intervention-ui        0/0     0            0           41d
```

By checking for the `0` in the `READY` column.


## Change log

A changelog for the service is available [here](./CHANGELOG.md)

## Troubleshooting

For any issues please reach out to the Find and Refer Interventions team in
slack [#find-refer-interventions-team](https://moj.enterprise.slack.com/archives/C06MPNK0AD6)
