# KAMAL

## Was ist Kamal?

[Kamal](https://kamal-deploy.org/) ist ein "Utility-Framework" mit deren Hilfe eine Web-Applikation als docker-image,
auf einen beliebigen ubuntu Server ausgeliefert (deployt) werden kann.

## Wieso verwenden wir Kamal im Modul?

Durch das _AWS-Learner-Lab_ haben wir die Möglichkeit eine beliebige AWS Infrastruktur aufzubauen.
Dieses Modul liegt jedoch den Fokus auf DevOps und nicht auf Cloud Infrastruktur.

Durch `Kamal` brauchen wir auf AWS "nur" eine Ubuntu Instanz (mit all den Netzwerkpolicies und co.) aufzusetzen.
Der Rest wird durch `Kamal` automatisiert. Es könnte z.B. Auch einfach eine DB gestartet werden.

> [!TIP]
>
> `Kamal` funktioniert Cloud-Provider unabhängig! Ihr könnt damit überall deployen, sogar auf eigene Server zu Hause!

## Was macht `kamal setup`?

1. Via SSH zur `KAMAL_SERVER_IP` Verbinden
2. `docker` und `curl` auf dem Server installieren, wenn nicht schon vorhanden
3. In die Docker Registry einloggen.
4. Das `Dockerfile` bauen.
5. Das Docker-Image von lokal in die Registry hochladen (pushen)
6. Das Docker-Image auf dem Server von der Docker Registry herunterladen (pullen)
7. Alle Environment Variablen vom .env zum Server laden
8. Garantiert dass [Traefik](https://doc.traefik.io/traefik/) (ein Load-Balancer) auf Port 80 läuft
9. Verbindet die App im Docker-Image via `Traefik`. Verwendet dazu einen Healthcheck auf dem Pfad `/up`
10. Startet einen neuen Container mit dem neuen Docker-Image
11. Stoppt den alten Container, sofern vorhanden, sobald das neue Image läuft.
12. Löscht alte Container

> [!INFO]
>
> Dies alles erhält ihr durch `Kamal` gratis! So kann ohne downtime, einfach WebApps überall deployed werden.

> [!TIP]
>
> Nach einem Setup kann auch `kamal deploy` verwendet werden.

## Mehrere Services (Frontend + Backend)

Frontend und Backend sind zwei unabhängige Kamal-Apps, die auf derselben
EC2-Instanz laufen: dieser Ordner (`kamal/`) fürs Frontend (`personify-ui`),
[`../kamal-backend/`](../kamal-backend) fürs Backend (`personify-api`) —
eine 1:1-Kopie mit eigenem `config/deploy.yml`.

Beide Apps landen auf demselben Server und teilen sich denselben
`kamal-proxy`, der beim ersten Deploy automatisch gebootet wird. Da wir
keine eigene Domain haben, wird das Backend nicht über einen eigenen
Hostnamen, sondern über einen Pfad-Präfix erreichbar gemacht:
`http://<server-ip>/api/...` (siehe `proxy.path_prefix` in
[`kamal-backend/config/deploy.yml`](../kamal-backend/config/deploy.yml)).

Deployt wird jede App für sich, aus ihrem eigenen Ordner:

```bash
cd kamal && bundle exec kamal deploy --skip-push --version=$VERSION
cd kamal-backend && bundle exec kamal deploy --skip-push --version=$VERSION
```

Die CI-Pipeline ([deploy.yml](../.github/workflows/deploy.yml)) macht das
bei jedem Release automatisch, in dieser Reihenfolge.

## Wieso Ruby?

`Kamal` ist von den Machern von RubyOnRails. Ist jedoch nicht darauf isoliert, wird aber vor allem in der Ruby Welt eingesetzt.
Lasst euch nicht von Ruby stören, ihr könnt euer Projekt in jeder beliebigen Sprache erstellen!
