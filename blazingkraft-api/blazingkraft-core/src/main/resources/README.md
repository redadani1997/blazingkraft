
# Connect To Postgres
BLAZINGKRAFT_DATASOURCE_POSTGRESQL_URL: jdbc:postgresql://localhost:5432/blazingkraft_v3
BLAZINGKRAFT_DATASOURCE_POSTGRESQL_USERNAME: postgres
BLAZINGKRAFT_DATASOURCE_POSTGRESQL_PASSWORD: postgres

# Connect To MySQL
BLAZINGKRAFT_DATASOURCE_MYSQL_URL: jdbc:mysql://localhost:3306/blazingkraft
BLAZINGKRAFT_DATASOURCE_MYSQL_USERNAME: root
BLAZINGKRAFT_DATASOURCE_MYSQL_PASSWORD: mysql

docker run --name mysql \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=mysql \
--restart unless-stopped \
mysql

mysql -u root -p mysql
create database blazingkraft;


# Connect To MariaDB
BLAZINGKRAFT_DATASOURCE_MARIADB_URL: jdbc:mariadb://localhost:3306/blazingkraft
BLAZINGKRAFT_DATASOURCE_MARIADB_USERNAME: root
BLAZINGKRAFT_DATASOURCE_MARIADB_PASSWORD: mariadb

docker run --name mariadb -e MYSQL_ROOT_PASSWORD=mariadb -p 3306:3306 mariadb

mysql -u root -p mysql
create database blazingkraft;

# Connect To SqlServer
BLAZINGKRAFT_DATASOURCE_SQLSERVER_URL: jdbc:sqlserver://;serverName=localhost;databaseName=blazingkraft;encrypt=true;trustServerCertificate=true
BLAZINGKRAFT_DATASOURCE_SQLSERVER_USERNAME: SA
BLAZINGKRAFT_DATASOURCE_SQLSERVER_PASSWORD: SqlServer@123

docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=SqlServer@123" \
-p 1433:1433 --name sqlserver --hostname sql1 \
mcr.microsoft.com/mssql/server:2022-latest

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "SqlServer@123"
CREATE DATABASE blazingkraft;
GO