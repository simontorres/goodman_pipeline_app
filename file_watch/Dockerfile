FROM python:3

RUN apt-get update && apt-get clean

WORKDIR /app
COPY __init__.py ./
COPY requirements.txt ./
COPY config.yml ./
COPY app ./
COPY run_app.py ./

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "-u", "run_app.py"]