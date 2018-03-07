# Modules Management Dashboard

**This small webapp offers an interface to manage modules.**

It was developped as an exercise to learn React.


## Goals

Expected functionalities were the following :

1. Load modules fixture
2. Display modules
3. Offer the possibility to create / update / delete a module


## Technologies used

- HTML
- CSS
- React library v16 (with CDN)
- Babel compiler v6.5 (with CDN)

## How it works

1. An AJAX fetches data from a json file and passes the resulting array of modules to a "Dashboard" React component.

2. The Dashboard component manages the array of modules and the "create module" Modal.
Dashboard renders the ModuleList component which itself renders a Module component for each module.

A Module consists of a ModuleHeader with a title and buttons to edit or delete the module, and of a ModuleBody with the module description.
By default the ModuleBody is collapsed, it becomes visible when the user clicks on the module title.
The Module component manages the "edit module" and "delete module" Modals.

3. When buttons add/edit/delete module are clicked, a Modal with the corresponding Form is rendered.
When a Form is submitted, the associated event (create, update or delete a module) is passed on to parent components until it reaches Dashboard.
Changes in the array of modules are handled by the same function :

- if the module doesn't have an id, it adds the module to the array ;
- otherwise, and if the facultative boolean argument "toDelete" is true, it removes the module from the array,
- and if not, it updates the module title and description.
