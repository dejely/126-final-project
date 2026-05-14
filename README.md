# Aniguess Local PostgreSQL Setup Guide

This guide explains how to set up a local PostgreSQL database for the Aniguess project.

## Requirements

Make sure you have the following installed:

- PostgreSQL
- Node.js
- npm
- Git

---

## Windows

### Initialization

This guide explains how to install and run Supabase locally on Windows for the Aniguess project.

### Requirements

Before starting, install the following:

- Node.js
- npm
- Git
- Docker Desktop
- Supabase CLI

---

### 1. Install Docker Desktop

Download and install Docker Desktop for Windows.

After installing, open Docker Desktop and make sure it is running.

To check if Docker is working, open PowerShell or Git Bash and run:

```bash
docker --version
docker ps
```

### Supabase CLI
```shell
npm install supabase --save-dev
```
To check:
```shell
npx supabase --help
```

### Initialize Database

```shell
npx supabase init
```

This creates a `supabase/` folder:
```bash
supabase/
└── config.toml
```

### Start Local Supabase
```shell
npx supabase start
```
After that Supabase will generate credentials similar to:
```bash
API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
anon key: your_local_anon_key
service_role key: your_local_service_role_key # Do not expose this!
```

## Linux Distro

### Arch

For arch
```bash
sudo pacman -S postgresql
sudo -iu postgres initdb --locale=C.UTF-8 --encoding=UTF8 -D /var/lib/postgres/data
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Create the database
Create a local database named `aniguess`:
```bash
sudo -u postgres createdb aniguess
```

### Apply the Database Schema
Run the schema file:
```bash
sudo -u postgres psql -d aniguess -f supabase/seeders/schema.sql
```

To check if it was created do:
```bash
sudo -u postgres psql -d aniguess

\dt
```
Summary:

Commands
```bash
sudo -u postgres dropdb aniguess
sudo -u postgres createdb aniguess
sudo -u postgres psql -d aniguess -f supabase/seeders/schema.sql
```