# CRUD - TODO List

Este projeto foi desenvolvido para participação no processo seletivo para a vaga de desenvolvedor Java.

Este é um projeto web. Foi desenvolvido em Java com JSF 2.3, Primefaces e Hibernate/JPA. O frontend foi desenvolvido em HTML, CSS e Javascript com layout responsivo.

A aplicação consiste  num CRUD de lista de tarefas (TODO List).

> Esta aplicação foi inspirada no exemplo: [http://todomvc.com/examples/angularjs/](http://todomvc.com/examples/angularjs/).

## Tecnologias utilizadas

- Java 1.8+
- Servidor TomEE Plume 8.0.1
- Banco de Dados MySQL 5.7
- Eclipse Java EE
- Maven
- JSF 2.3 e Primefaces
- Hibernate 4.2.*
- Frontend HTML, CSS, JS

## Importação do Projeto

O projeto deve ser importando na IDE Eclipse Java EE. Os arquivos do projeto podem ser gerados com o comando:

    mvn eclipse:eclipse

Após importar o projeto no Eclipse, pode ser necessário definir a variável `M2_REPO` no eclipse. [Veja como aqui.](https://mkyong.com/maven/how-to-configure-m2_repo-variable-in-eclipse-ide/)

## Criando e configurando o banco de dados

Execute este script no seu MySQL:

    create database jsf_hibernate;

    CREATE TABLE todo (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        description varchar(255) DEFAULT NULL,
        completed bit(1) DEFAULT false,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

Edite o arquivo `src/main/webapp/WEB-INF/resources.xml` informando os dados de acesso ao seu banco de dados configurado acima.

    <resources>
        <Resource id="jsfHibernateDatasource" type="DataSource">
            JdbcDriver com.mysql.jdbc.Driver
            JdbcUrl jdbc:mysql://<host>:<port>/jsf_hibernate?serverTimezone=UTC
            UserName <user>
            Password <password>
        </Resource>
    </resources> 

## Implantação no TomEE

Execute este comando do maven no prompt de comando, no diretório raiz do projeto, onde se encontra o arquivo `pom.xml`

    mvn package

Pronto! basta fazer o deploy no TomEE do arquivo gerado `target/jsf_hibernate-1.0.war`
