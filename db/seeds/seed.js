const format = require('pg-format');
const db = require('../connection');
const { createRef, formatComments } = require('./utils');

const seed = async ({
  assignmentsData,
  classes_usersData,
  classesData,
  lessonsData,
  users_assignmentsData,
  users_lessonsData,
  usersData,
}) => {
  try {
    await db.query('DROP TABLE IF EXISTS users_assignments;');
    await db.query('DROP TABLE IF EXISTS assignments;');
    await db.query('DROP TABLE IF EXISTS users_lessons;');
    await db.query('DROP TABLE IF EXISTS lessons;');
    await db.query('DROP TABLE IF EXISTS classes_users;');
    await db.query('DROP TABLE IF EXISTS classes;');
    await db.query('DROP TABLE IF EXISTS users;');

    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        surname VARCHAR(255),
        email VARCHAR(255),
        role VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        disability TEXT
      );
    `);

    await db.query(`
      CREATE TABLE classes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        age_group VARCHAR(255),
        subject VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        exam_board TEXT
      );
    `);

    await db.query(`
      CREATE TABLE classes_users (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        class_id INTEGER REFERENCES classes(id)
      );
    `);

    await db.query(`
      CREATE TABLE lessons (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        body TEXT,
        teacher_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE users_lessons (
        id SERIAL PRIMARY KEY,
        lesson_id INTEGER REFERENCES lessons(id),
        user_id INTEGER REFERENCES users(id)
      );
    `);

    await db.query(`
      CREATE TABLE assignments (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        body TEXT,
        teacher_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        due_date TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE users_assignments (
        id SERIAL PRIMARY KEY,
        assignment_id INTEGER REFERENCES assignments(id),
        user_id INTEGER REFERENCES users(id),
        work TEXT,
        submit_date TIMESTAMP,
        feedback TEXT,
        mark INTEGER
      );
    `);
    const insertUsersQueryStr = format(
      'INSERT INTO users (id, name, surname, email, role, created_at, disability) VALUES %L RETURNING *;',
      usersData.map(
        ({ id, name, surname, email, role, created_at, disability }) => [
          id,
          name,
          surname,
          email,
          role,
          created_at,
          disability,
        ]
      )
    );
    await db.query(insertUsersQueryStr);

    const insertClassesQueryStr = format(
      'INSERT INTO classes (id, name, age_group, subject, created_at, exam_board) VALUES %L RETURNING *;',
      classesData.map(
        ({ id, name, age_group, subject, created_at, exam_board }) => [
          id,
          name,
          age_group,
          subject,
          created_at,
          exam_board,
        ]
      )
    );
    await db.query(insertClassesQueryStr);

    const insertlessonsDataQueryStr = format(
      'INSERT INTO lessons (id, title, body, teacher_id, created_at) VALUES %L RETURNING *;',
      lessonsData.map(({ id, title, body, teacher_id, created_at }) => [
        id,
        title,
        body,
        teacher_id,
        created_at,
      ])
    );
    await db.query(insertlessonsDataQueryStr);

    const insertassignmentsDataQueryStr = format(
      'INSERT INTO assignments (id, title, body, teacher_id, created_at, due_date) VALUES %L RETURNING *;',
      assignmentsData.map(
        ({ id, title, body, teacher_id, created_at, due_date }) => [
          id,
          title,
          body,
          teacher_id,
          created_at,
          due_date,
        ]
      )
    );
    await db.query(insertassignmentsDataQueryStr);
    const insertusers_lessonsDataQueryStr = format(
      'INSERT INTO users_lessons (id, lesson_id, user_id) VALUES %L RETURNING *;',
      users_lessonsData.map(({ id, lesson_id, user_id }) => [
        id,
        lesson_id,
        user_id,
      ])
    );
    await db.query(insertusers_lessonsDataQueryStr);
    const insertusers_assignmentsDataQueryStr = format(
      'INSERT INTO users_assignments (id, assignment_id, user_id, work, submit_date, feedback, mark) VALUES %L RETURNING *;',
      users_assignmentsData.map(
        ({ id, assignment_id, user_id, work, submit_date, feedback, mark }) => [
          id,
          assignment_id,
          user_id,
          work,
          submit_date,
          feedback,
          mark,
        ]
      )
    );
    await db.query(insertusers_assignmentsDataQueryStr);
    const insertclasses_usersDataDataQueryStr = format(
      'INSERT INTO classes_users (id, class_id, user_id ) VALUES %L RETURNING *;',
      classes_usersData.map(({ id, class_id, user_id }) => [
        id,
        class_id,
        user_id,
      ])
    );
    await db.query(insertclasses_usersDataDataQueryStr);
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

module.exports = seed;
