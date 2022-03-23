echo "** Initializing DB and users"
mysql -u root -p$SECRET --execute \
"ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '$SECRET';
ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY '$DB_PASSWORD';
flush privileges;"
echo "** Finished configuring Dev MYSQL DB ENVIRONMENT"