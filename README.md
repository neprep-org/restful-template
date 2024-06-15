# Restful Starter

A monorepo containing backend/frontend starters for a restful project.

## What's in?

- Backend:

  - Ready Authentication & Authorization
  - Tested Endpoints
  - Good project structure

- Frontend:

  - Ready Authentication & Authorization
  - Adaptable Dashboard
  - Responsive web

## Backend's structure

Our project's backend uses modules structure as in nestjs, where each feature (user management) has it's folder with it's routers, controllers, validations, models and repository.

- common : this folder contains utilities that can be used by all of our modules.
- middleware : contains application's middlwares
- utils : contains application's utility functions
- db : contains our app's datasourc provider since we're using typeorm
