# Project description - Personify

Personify is a stateless web application (no database, no accounts) that gives users a short personality test and assigns them a pixel-art character based on their results. Answers are scored across multiple traits and the resulting profile maps to a self-made character with a name and a short description. The goal is a fast and funny experience for everyone.

# Getting Started

This section covers setting up, running, and formatting both the frontend and backend applications locally.

## Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Formatting

Run `ng format` to run the formatting script using prettier.

### Linting

Run `ng run lint` to run the linter.

## Backend

We're using python version 3.14.7 and poetry version 2.4.1.

### Install dependencies

Run command to install dependencies: `poetry install`

### Start the backend

To start the api, run: `poetry run uvicorn main:app --reload`

### Formatting

To format the files, run: `poetry run ruff format .`

## BBZBL Modul 324: Web-Applikation Template

Dieses Template dient als Vorlage zum Starten eures Projekts.

Ziel ist es ein Repository zu erstellen, welches, [wie das Muster](https://github.com/herrhodel/modul-324-muster) eine
Web-Applikation enthält, welche automatisch getestet, gebaut, released und deployed wird.

> [!NOTE]
> Die Web-Applikation muss in einem Ordner `/app` erstellt werden. Ansonsten müssen Folgescripts angepasst werden.

Je nach Thema, können vom Muster die Grundlagen kopiert und abgeändert werden.
Natürlich soll dieses Repo nicht nur ein Nginx sondern eine eigene Applikation beinhalten.

**Wieso nicht direkt das Muster als Grundlage?**

Dies war tatsächlich mal so. Die Erfahrung hat gezeigt, dass die Komplexität
das Verständnis erschwert. Die Idee ist, dass die einzelnen Schritte bewusster
umgesetzt werden und man nicht am Anfang vor lauter Bäume den Wald nicht mehr sieht.

In der ersten Woche wird bewusst das Muster bei allen zum Laufen gebracht. Dies
soll ermöglichen, dass ein Gesamtüberblick von Anfang an existiert.

> [!NOTE]
> Vorgegebene Ordnerstruktur
> Die Ordnerstruktur soll analog zum Muster aufgesetzt werden.
>
> Der Ordner `docs` wird von Anfang an benötigt und ist direkt im starter
> vorgegeben.
