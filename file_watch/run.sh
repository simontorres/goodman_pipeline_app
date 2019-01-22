#!/usr/bin/env bash


celery worker --app worker_app.app --loglevel=info &

python -u run_app.py