CREATE DATABASE api;

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    deal_value REAL,
);
