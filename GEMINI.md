# Project Overview

This repository contains a collection of official templates for Firebase Studio (formerly Project IDX). These templates provide a starting point for developing various types of applications, from web apps to backends. Each template is self-contained in its own directory and includes the necessary configuration for Firebase Studio.

The main technologies used in this project are:

*   **Nix:** For creating reproducible development environments.
*   **JSON:** For defining the metadata of each template.
*   **Shell scripting:** For bootstrapping the templates.

The project is structured as a monorepo, with each directory representing a single template. The root of the repository contains general information about the project, while each subdirectory contains the template-specific files.

# Building and Running

There is no central build process for this project. Each template is designed to be used within the Firebase Studio environment. To use a template, you can either open this repository in IDX or import a specific template using its URL.

For example, to open this repository in Firebase Studio, you can use the following link:

[https://idx.google.com/import?url=https://github.com/project-idx/official-templates](https://idx.google.com/import?url=https://github.com/project-idx/official-templates)

To use a specific template, you would typically follow the instructions provided by Firebase Studio.

# Development Conventions

The development conventions for this project are centered around the structure of the templates. Each template should have the following files:

*   `idx-template.json`: A JSON file that defines the metadata for the template, such as its name, description, and icon.
*   `idx-template.nix`: A Nix file that defines the environment and bootstrap process for the template.

In addition to these files, templates may also include other configuration files, such as `dev.nix` for defining the development environment and `airules.md` for defining the AI rules for the template.

When creating a new template, it is important to follow the existing structure and conventions. This will ensure that the template is consistent with the other templates in the repository and that it can be easily used by others.
