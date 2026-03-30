# dupia

An Angular-based social/community web application prototype with real-time and collaborative features.

This project is the **frontend counterpart** of the `backend_two` repository.  
The frontend connects to a Socket.IO backend for collaborative document features and appears designed to work with the broader user/chat/content APIs exposed by that backend.

It is best understood as an evolving frontend product prototype rather than a finished production application.

## Project overview

`dupia` is a frontend web application built with Angular.  
The app appears to target a social, networking, or community-style experience, combining:

- user onboarding
- profile/network views
- messaging/chat
- post/timeline-oriented UI
- collaborative document features
- multilingual support

The current codebase shows both active UI flows and some transitional/in-progress sections.

## Relationship to `backend_two`

This repository is intended to work with the `backend_two` project:

- the frontend opens a Socket.IO connection to `http://localhost:4444`
- it emits events such as:
  - `getAllDocs`
  - `getDoc`
  - `addDoc`
  - `editDoc`

Those same events are implemented on the backend side in `backend_two`, which runs Socket.IO on port `4444` and returns document data to connected clients.

So the cleanest way to describe this repo is:

**`dupia` = frontend client**  
**`backend_two` = backend / API / real-time server**

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

Some routes are currently active, while others remain in the codebase as part of a larger intended application scope.

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
- a clear relationship to a separate backend service

The strongest signal is not visual polish, but architectural scope.

## Limitations

- Some parts of the application appear unfinished or partially disabled.
- Not every declared component has equally deep business logic yet.
- Some routes/features suggest an in-progress migration or redesign.
- Public presentation may still be weaker than the actual codebase unless screenshots and setup notes are added.

## Local development

This frontend is intended to run alongside its backend counterpart.

Typical setup idea:

1. start the `backend_two` server
2. ensure Socket.IO is available on `http://localhost:4444`
3. start the Angular frontend with `ng serve`

## Best way to interpret this repository

This is best presented as:

**an Angular social/community frontend prototype with real-time collaboration and chat-oriented features, designed to work with the `backend_two` backend**

rather than as a generic Angular sample.

## Future improvements

- explain active vs. planned features
- clean up unused or transitional routes/components
- add screenshots
- clarify old vs. new sections of the app if both are intentionally kept
- document expected backend endpoints and environment setup

## Summary

`dupia` is a meaningful Angular frontend project that demonstrates:

- multi-page SPA structure
- authentication flow
- profile/network/community UI
- socket-based document collaboration
- chat/messaging direction
- internationalization support
- PWA/service-worker setup

It is best understood as the frontend side of a broader social/community product prototype paired with `backend_two`.
