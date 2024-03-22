import { db2 } from "../db/db.js";

async function createSchemaAndTables() {
  try {
    db2.connect();
    // Create Status table

    await db2.query(`
    CREATE TABLE IF NOT EXISTS Status (
      Id SERIAL PRIMARY KEY,
      Title VARCHAR(255) NOT NULL
    );
  `);

    // Create Tag table
    await db2.query(`
    CREATE TABLE IF NOT EXISTS Tag (
      Id SERIAL PRIMARY KEY,
      Name VARCHAR(255) NOT NULL
    );
  `);

    // Create ActivityType table
    await db2.query(`
    CREATE TABLE IF NOT EXISTS ActivityType (
      Id SERIAL PRIMARY KEY,
      Name VARCHAR(255) NOT NULL
    );
  `);

    // Create Activity table
    await db2.query(`
    CREATE TABLE IF NOT EXISTS Activity (
      Id SERIAL PRIMARY KEY,
      Title VARCHAR(255) NOT NULL,
      Description TEXT,
      Url VARCHAR(255),
      StartDate DATE,
      EndDate DATE,
      Status INTEGER REFERENCES Status(Id),
      Tags INTEGER[],
      ActivityType INTEGER REFERENCES ActivityType(Id)
    );
  `);

    // Create Task table
    await db2.query(`
    CREATE TABLE IF NOT EXISTS Task (
      Id SERIAL PRIMARY KEY,
      Name VARCHAR(255) NOT NULL,
      Content TEXT,
      StartDate DATE,
      EndDate DATE,
      Tags INTEGER[],
      Status INTEGER REFERENCES Status(Id),
      ActivityId INTEGER REFERENCES Activity(Id)
    );
  `);

    // Create TagActivity table
    await db2.query(`
      CREATE TABLE IF NOT EXISTS TagActivity (
        ActivityId INTEGER REFERENCES Activity(Id),
        TagId INTEGER REFERENCES Tag(Id),
        PRIMARY KEY (ActivityId, TagId)
     );
    `);

    // Create TagTask table
    await db2.query(`
      CREATE TABLE IF NOT EXISTS TagTask (
        TaskId INTEGER REFERENCES Task(Id),
        TagId INTEGER REFERENCES Tag(Id),
        PRIMARY KEY (TaskId, TagId)
     );
    `);

    // Insert initial data into Status table
    await db2.query(`
    INSERT INTO Status (Title) VALUES
    ('New'),
    ('In Progress'),
    ('Done'),
    ('Cancelled');
  `);

    // Insert initial data into ActivityType table
    await db2.query(`
    INSERT INTO ActivityType (Name) VALUES
    ('Hobby'),
    ('School'),
    ('Job'),
    ('Other');
  `);

    console.log("Schema and tables created successfully");
    db2.end();
  } catch (error) {
    throw error;
  }
}

export { createSchemaAndTables };
