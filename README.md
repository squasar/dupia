# dupia

An Angular-based social/community web application prototype with real-time and collaborative features.

This project is more than a default Angular starter. It includes a structured frontend application with:

- authentication-related flows
- multiple user-facing pages
- profile/network-oriented UI
- chat features
- collaborative document/socket modules
- internationalization support
- service worker integration

It is best understood as an evolving frontend product prototype rather than a finished production application.

## Project overview

`dupia` is a frontend web application built with Angular.  
The app appears to target a social, networking, or community-style experience, combining:

- user onboarding
- profile/network views
- messaging/chat
- post/timeline-oriented UI
- collaborative document experiments
- multilingual support

## Main technologies

- **Angular 15**
- **Angular Material**
- **Bootstrap / ng-bootstrap**
- **ngx-socket-io**
- **@ngx-translate**
- **Angular Service Worker**
- **cookie/session-related packages**
- **country/flag UI packages**

## What the project contains

### 1. Multi-page Angular application
The repo includes several application pages and routed views such as:
- main page
- login
- signup
- forgot password
- timeline
- profile
- network-related pages

Some routes are currently active, while others are still present in the codebase as part of a larger application direction.

### 2. Authentication and session logic
The app includes:
- login/signup page structure
- route protection through an auth guard
- localStorage-based login state checks
- session/device-related utilities

### 3. Real-time and collaborative features
One of the most interesting parts of this repo is its real-time layer:
- socket-based document list / document loading
- new document creation
- document editing events
- chat-oriented components and message flow
- socket-driven frontend interactions

### 4. Social/community UI structure
The component tree shows clear intent toward a social/networking application, with modules such as:
- friends list
- related users
- profile cards
- post list / post item
- messaging list
- chat box / friend chat list

### 5. Internationalization support
The app includes translation libraries and a language-management area, suggesting a multilingual product direction.

### 6. PWA-oriented setup
The presence of Angular service worker integration indicates that the project was moving toward a more app-like frontend experience.

## Why this repo is meaningful

This repo is meaningful because it shows:
- a real application structure
- multiple feature domains
- component organization beyond a trivial demo
- frontend integration with real-time systems
- early product-oriented thinking

The strongest signal is not visual polish, but architectural scope.

## Limitations

- The current README does not describe the actual project at all.
- Some parts of the application appear unfinished or partially disabled.
- Not every declared component has equally deep business logic yet.
- Some routes/features suggest an in-progress migration or redesign.
- Public presentation is currently much weaker than the actual codebase.

## Best way to interpret this repository

This is best presented as:

**an Angular social/community frontend prototype with real-time collaboration and chat-oriented features**

rather than as a generic Angular sample.

## Future improvements

- document the intended product vision clearly
- explain active vs. planned features
- document backend expectations / socket endpoints
- clean up unused or transitional routes/components
- add screenshots or a simple architecture overview
- clarify old vs. new sections of the app if both are intentionally kept

## Summary

`dupia` is a meaningful Angular frontend project that demonstrates:

- multi-page SPA structure
- authentication flow
- profile/network/community UI
- socket-based document collaboration
- chat/messaging direction
- internationalization support
- PWA/service-worker setup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
