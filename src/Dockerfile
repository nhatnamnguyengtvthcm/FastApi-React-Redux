#
FROM python:3.9
#
#RUN addgroup app && adduser -S -G app app
#USER app
# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PATH /home/Users/namnn/.local/bin:${PATH}
ENV port=8000
ENV timeout=60

WORKDIR /src
#
COPY requirements.txt /src/requirements.txt

#
RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt
RUN  pip install uvicorn[standard]
#
COPY . .
#
CMD ["uvicorn", "/app.main:app", "--host", "0.0.0.0", "--port", "80"]
#CMD ["/bin/sh" ,"-c", "pip install -r requirements.txt && pip install uvicorn[standard] && pip install gunicorn && gunicorn main:app -w $worker_count -k uvicorn.workers.UvicornWorker -b 0.0.0.0:$port --log-level debug --timeout $timeout"]