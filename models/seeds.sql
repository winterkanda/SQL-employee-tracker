INSERT INTO department (name)
VALUES ('Engineering');
INSERT INTO department (name)
VALUES ('Management');
INSERT INTO department (name)
VALUES ('Business Development');
INSERT INTO department (name)
VALUES ('Design');
INSERT INTO department (name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Designer', 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Executive Assistant', 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 300000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Public Relations Manager', 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Creative Director', 200000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('Technical Director', 250000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Harry', 'Styles', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Conrad', 'James', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Zendaya', 'Lewis', 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Spencer', 'Shay', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Suhani', 'Win', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nick', 'Call', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gabe', 'Sterning', 4, 1);