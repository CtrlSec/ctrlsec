#!/bin/bash

CONTINUE=true

function ex() {
  CONTINUE=false
}

trap ex INT

if which watch >/dev/null; then
  while $CONTINUE
  do
    echo "*** Waiting for changes ***" && \
    watch -d -t -g ls --time-style=full-iso -lR > /dev/null && \
    ($CONTINUE && \
    cd docker && \
    docker-compose build sails && \
    docker-compose restart sails)
  done
else
  echo "'watch' do not exist"
  echo "Please, install with:"
  echo ""
  echo "    MAC (brew): [sudo] brew install watch"
  echo "    MAC (port): [sudo] port install watch"
fi

