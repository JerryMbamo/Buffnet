FROM python:3

WORKDIR /MLBackend

ENV FLASK_APP=app.py

COPY requirements.txt /MLBackend/
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5000 

CMD [ "python", "app.py"]