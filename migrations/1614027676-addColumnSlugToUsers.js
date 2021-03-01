exports.up = async (sql) => {
  await sql`
    ALTER TABLE customers
      ADD COLUMN slug VARCHAR(40) UNIQUE;
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE customers
      DROP COLUMN slug;
  `;
};
