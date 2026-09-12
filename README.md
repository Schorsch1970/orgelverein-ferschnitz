# Orgelverein Ferschnitz

Website des Orgelvereins Ferschnitz (Niederösterreich): Sinn & Zweck, Vorstand,
Aktivitäten und Mitgliedschaft. Vorstand und Aktivitäten sind über einen
Admin-Login selbst pflegbar.

## Tech Stack

- React + Vite (Frontend)
- Supabase (Datenbank, Auth, Bild-Storage)
- Vercel (Hosting)

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Läuft auf http://localhost:5173

## Supabase Setup

1. Neues Projekt auf supabase.com anlegen.
2. Im SQL Editor den Inhalt von `supabase/schema.sql` ausführen (legt Tabellen
   `aktivitaeten` und `vorstand` inkl. Row-Level-Security an).
3. Unter Storage zwei **öffentliche** Buckets anlegen: `aktivitaeten-bilder`
   und `vorstand-fotos`.
4. Unter Authentication → Users manuell einen Zugang für Vorstandsmitglieder
   anlegen, die den Admin-Bereich nutzen sollen (kein öffentliches Registrieren
   auf der Website).
5. `.env` anlegen (Vorlage: `.env.example`) mit Project URL und anon key aus
   den Supabase Projekteinstellungen (API).

## Admin-Bereich

Erreichbar über `/login`. Nach Anmeldung: `/admin/aktivitaeten` und
`/admin/vorstand` zum Anlegen, Bearbeiten und Löschen von Einträgen.

## Offene Punkte

- Platzhalter-Kontaktdaten in `src/pages/Kontakt.jsx` durch echte Adresse/
  E-Mail ersetzen.
- Texte auf `src/pages/UeberUns.jsx` (Sinn & Zweck) bei Bedarf anpassen.
- Domain, GitHub-Repo und Vercel-Projekt verbinden.
