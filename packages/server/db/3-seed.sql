-- Populate Gender Table
INSERT INTO gender ("name")
VALUES
    ('M'),
    ('F'),
    ('O');

SELECT * FROM gender;

-- Populate Permission Level Table
INSERT INTO permission_level ("name")
VALUES
    ('ADMIN'),
    ('USER'),
    ('GUEST');

SELECT * FROM permission_level;