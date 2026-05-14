# Aniguess Local PostgreSQL Setup Guide

This guide explains how to set up a local PostgreSQL database for the Aniguess project.

## Requirements

Make sure you have the following installed:

- PostgreSQL
- Node.js
- npm
- Git

---

## 1. Install PostgreSQL

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