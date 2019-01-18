FROM python:3

RUN apt-get update && apt-get clean

WORKDIR /app
COPY requirements.txt ./
COPY config.yml ./
COPY __init__.py ./
COPY app.py ./
COPY watch.py ./

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "-u", "app.py"]