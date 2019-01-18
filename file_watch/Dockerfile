FROM python:3

RUN apt-get update && apt-get clean

WORKDIR /app
RUN mkdir -p /app/host/data
COPY requirements.txt ./
COPY config.yml ./
COPY __init__.py ./
COPY run.sh ./
COPY app.py ./
COPY watch.py ./

RUN pip install --no-cache-dir -r requirements.txt
RUN chmod +x ./run.sh

CMD ["./run.sh"]