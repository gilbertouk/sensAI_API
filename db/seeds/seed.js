const format = require('pg-format');
const db = require('../connection');
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require('./utils');

const seed = async ({ topicData, userData, articleData, commentData }) => {
  try {
    // Drop tables if they exist
    await db.query('DROP TABLE IF EXISTS users_assignments;');
    await db.query('DROP TABLE IF EXISTS assignments;');
    await db.query('DROP TABLE IF EXISTS users_lessons;');
    await db.query('DROP TABLE IF EXISTS lessons;');
    await db.query('DROP TABLE IF EXISTS classes_users;');
    await db.query('DROP TABLE IF EXISTS classes;');
    await db.query('DROP TABLE IF EXISTS users;');

    // Create new tables
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        surname VARCHAR(255),
        email VARCHAR(255),
        role VARCHAR(255) CHECK (role IN ('Student', 'Teacher')),
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
        assignments_id INTEGER REFERENCES assignments(id),
        user_id INTEGER REFERENCES users(id),
        work TEXT,
        submit_date TIMESTAMP,
        feedback TEXT,
        mark INTEGER
      );
    `);
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

module.exports = seed;
