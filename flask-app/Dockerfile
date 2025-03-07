FROM python:3.11.9

WORKDIR /app

COPY . .

RUN pip install flask requests pandas

EXPOSE 5000

CMD ["python", "app.py"]