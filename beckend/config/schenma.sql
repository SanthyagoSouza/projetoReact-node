CREATE TABLE clientes (
    idcliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    status ENUM('ativo', 'suspenso', 'cancelado') DEFAULT 'ativo',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    idcliente INT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('MASTER', 'GERENCIAL', 'CLIENTE') DEFAULT 'CLIENTE',
    status TINYINT(1) DEFAULT 1,
    img VARCHAR(255),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idcliente) REFERENCES clientes(idcliente)
);

CREATE TABLE roles (
    idrole INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE usuario_role (
    idusuario INT,
    idrole INT,
    PRIMARY KEY (idusuario, idrole),
    FOREIGN KEY (idusuario) REFERENCES usuarios(idusuario),
    FOREIGN KEY (idrole) REFERENCES roles(idrole)
);

CREATE TABLE permissoes (
    idpermissao INT AUTO_INCREMENT PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE role_permissao (
    idrole INT,
    idpermissao INT,
    PRIMARY KEY (idrole, idpermissao),
    FOREIGN KEY (idrole) REFERENCES roles(idrole),
    FOREIGN KEY (idpermissao) REFERENCES permissoes(idpermissao)
);

CREATE TABLE modulos (
    idmodulo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    rota VARCHAR(150),
    icone VARCHAR(100),
    secao VARCHAR(100),
    ordem INT DEFAULT 0,
    ativo TINYINT(1) DEFAULT 1
);

CREATE TABLE permissao_modulo (
    idpermissao INT,
    idmodulo INT,
    PRIMARY KEY (idpermissao, idmodulo),
    FOREIGN KEY (idpermissao) REFERENCES permissoes(idpermissao),
    FOREIGN KEY (idmodulo) REFERENCES modulos(idmodulo)
);

CREATE TABLE planos (
    idplano INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120),
    valor DECIMAL(10, 2),
    limite_usuarios INT DEFAULT 1,
    ativo TINYINT(1) DEFAULT 1
);

CREATE TABLE funcionalidades (
    idfuncionalidade INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    chave VARCHAR(100) UNIQUE
);

CREATE TABLE plano_funcionalidade (
    idplano INT,
    idfuncionalidade INT,
    habilitado TINYINT(1) DEFAULT 1,
    PRIMARY KEY (idplano, idfuncionalidade),
    FOREIGN KEY (idplano) REFERENCES planos(idplano),
    FOREIGN KEY (idfuncionalidade) REFERENCES funcionalidades(idfuncionalidade)
);

CREATE TABLE contratos (
    idcontrato INT AUTO_INCREMENT PRIMARY KEY,
    idcliente INT,
    idplano INT,
    status ENUM('ativo', 'suspenso', 'cancelado') DEFAULT 'ativo',
    data_inicio DATE,
    data_fim DATE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idcliente) REFERENCES clientes(idcliente),
    FOREIGN KEY (idplano) REFERENCES planos(idplano)
);




/*insert para poder testar o sistema*/

INSERT INTO
    clientes (idcliente, nome, email)
VALUES
    (1, 'Cliente Teste', 'cliente@teste.com');

    INSERT INTO
    usuarios (idusuario, idcliente, nome, email, senha, tipo)
VALUES
    (
        1,
        NULL,
        'Master Admin',
        'master@agi.com',
        '123456',
        'MASTER'
    ),
    (
        2,
        NULL,
        'Gerencial Admin',
        'gerencial@agi.com',
        '123456',
        'GERENCIAL'
    ),
    (
        3,
        1,
        'Usuário Cliente',
        'cliente@agi.com',
        '123456',
        'CLIENTE'
    );

    INSERT INTO
    roles (idrole, nome)
VALUES
    (1, 'MASTER'),
    (2, 'GERENCIAL'),
    (3, 'CLIENTE');

    INSERT INTO
    usuario_role (idusuario, idrole)
VALUES
    (1, 1),
    -- master
    (2, 2),
    -- gerencial
    (3, 3);

-- cliente

INSERT INTO
    permissoes (idpermissao, chave)
VALUES
    (1, 'dashboard'),
    (2, 'carros'),
    (3, 'financeiro'),
    (4, 'usuarios'),
    (5, 'contratos');

    INSERT INTO
    permissoes (idpermissao, chave)
VALUES
    (1, 'dashboard'),
    (2, 'carros'),
    (3, 'financeiro'),
    (4, 'usuarios'),
    (5, 'contratos');


    INSERT INTO
    role_permissao (idrole, idpermissao)
VALUES
    -- MASTER (tudo)
    (1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
    -- GERENCIAL
    (2, 1),
(2, 2),
(2, 3),
(2, 5),
    -- CLIENTE
    (3, 1),
(3, 2);

INSERT INTO
    modulos (idmodulo, nome, rota, icone, secao, ordem)
VALUES
    (
        1,
        'Dashboard',
        '/dashboard',
        'fas fa-home',
        'Principal',
        1
    ),
    (
        2,
        'Carros',
        '/carros',
        'fas fa-car',
        'Veículos',
        2
    ),
    (
        3,
        'Financeiro',
        '/financeiro',
        'fas fa-dollar-sign',
        'Financeiro',
        3
    ),
    (
        4,
        'Usuários',
        '/usuarios',
        'fas fa-users',
        'Configurações',
        4
    ),
    (
        5,
        'Contratos',
        '/contratos',
        'fas fa-file-alt',
        'Administração',
        5
    );


    INSERT INTO
    permissao_modulo (idpermissao, idmodulo)
VALUES
    (1, 1),
    -- dashboard
    (2, 2),
    -- carros
    (3, 3),
    -- financeiro
    (4, 4),
    -- usuarios
    (5, 5);

-- contratos

INSERT INTO
    planos (idplano, nome, valor, limite_usuarios)
VALUES
    (1, 'Plano Básico', 49.90, 3),
    (2, 'Plano Profissional', 99.90, 10);


    INSERT INTO
    funcionalidades (idfuncionalidade, nome, chave)
VALUES
    (1, 'Gestão de Carros', 'carros'),
    (2, 'Financeiro', 'financeiro'),
    (3, 'Gestão de Usuários', 'usuarios'),
    (4, 'Contratos', 'contratos');


    INSERT INTO
    plano_funcionalidade (idplano, idfuncionalidade)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (2, 3),
    (2, 4);


    INSERT INTO
    contratos (
        idcontrato,
        idcliente,
        idplano,
        status,
        data_inicio
    )
VALUES
    (1, 1, 2, 'ativo', CURDATE());