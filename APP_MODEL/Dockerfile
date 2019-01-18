FROM python:3

RUN apt-get update && apt-get clean

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY config.yml
COPY run.sh ./
COPY app.py ./

RUN chmod +x ./run.sh

CMD ["./run.sh"]