#!/bin/bash

SCRIPT_PATH=$(dirname $(realpath -s $0))

fatal(){
  printf "\033[0;31mFATAL  $1\033[0m\n"
  exit 1
}

try_cmd(){
  $1 > /dev/null || exit 1
}

echo
echo "************************************************"
echo "This script sets up a new production enviroment!"
echo "************************************************"
echo

read -p "Are you sure you want to continue? (yes/no) "
[ "$REPLY" != "yes" ] && exit 0
echo

read -p "Are you sure? (type production to continue) "
[ "$REPLY" != "production" ] && exit 0
echo

printf "Checking Secrets ... "
[ ! -f "$SCRIPT_PATH/secrets.json" ] && fatal "Missing secrets.json!"
echo "done"

printf "Creating virtual enviroment ... "
try_cmd "virtualenv --python=python3 $SCRIPT_PATH/venv"
echo "done"

printf "Entering virtual enviroment ... "
try_cmd "source $SCRIPT_PATH/venv/bin/activate"
echo "done"

printf "Upgrading pip ... "
try_cmd 'pip install -U pip'
echo "done"

printf "Installing prerequisites ... "
try_cmd 'pip install -r requirements.txt'
echo "done"

printf "Applying migrations ... "
try_cmd "python $SCRIPT_PATH/manage.py migrate --settings=config.settings.prod"
echo "done"

printf "Collecting static files ... "
try_cmd "mkdir -p $SCRIPT_PATH/static"
try_cmd "python $SCRIPT_PATH/manage.py collectstatic --clear --noinput --settings=config.settings.prod"
try_cmd "python $SCRIPT_PATH/manage.py collectstatic --noinput --settings=config.settings.prod"
echo "done"

printf "Touching WSGI for server reload ... "
try_cmd "touch $SCRIPT_PATH/config/wsgi.py"
echo "done"

echo -e "\nEnvironment Ready!\n"

# 2021.07.11-DEA
