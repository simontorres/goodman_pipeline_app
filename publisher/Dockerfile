FROM python:3

RUN apt-get update && apt-get clean

WORKDIR /app

COPY . ./

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN chmod +x ./run.sh

CMD ["./run.sh"]