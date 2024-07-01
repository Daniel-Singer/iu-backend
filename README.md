# PROJEKT SOFTWARE-ENGINEERING

## Backend

### Setup

Gehe sicher dass du node.js und npm installiert hast. Folgende Befehle geben die aktuell installierte Version aus. Wenn keine Version oder ein Fehler angezeigt wird müssen die Installationen ausgeführt werden.

**Kontrolle ob Pakete installiert sind:**

`node -v`

`npm -v`

**Download**

[node.js](https://nodejs.org)

**npm** wird automatisch bei installation von node.js mitinstalliert.

### Einrichten des Projekts

**1. Installieren aller Pakete**

Für die Installation muss das Repository geklont werden.

`git clone git@github.com:Daniel-Singer/iu-backend.git`
`cd iu-backend`
`npm install`

Als nächsten Schritt muss die Datenbankverbindung hergestellt werden.

**2. Einrichten der Datenbankverbindung**

Benenne die **.example.env** Datei um in **.env**. In dieser Datei können die Verbindungsvariablen gesetzt werden. Die benötigten Variablen sind dem Dokument in unserer Gruppe zu entnehmen.

**3. Starten der Anwendung**

Nach erfolgreicher Installation aller Pakete und dem setzten der Verbindungsvariablen muss die Anwendung nur noch gestartet werden.

`npm run dev`

Ein Entwicklungsserver wird gestartet und der Zugriff darauf ist möglich.
