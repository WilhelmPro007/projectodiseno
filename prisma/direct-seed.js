const Database = require('better-sqlite3');
const db = new Database('dev.db');

try {
    // Ensure table exists (though Prisma should have created it)
    db.prepare("CREATE TABLE IF NOT EXISTS Role (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)").run();

    const roles = ['Admin', 'User'];

    for (const role of roles) {
        try {
            db.prepare("INSERT OR IGNORE INTO Role (name) VALUES (?)").run(role);
            console.log(`Role '${role}' inserted or already exists.`);
        } catch (err) {
            console.error(`Error inserting role '${role}':`, err.message);
        }
    }

    const result = db.prepare("SELECT * FROM Role").all();
    console.log('Current roles in database:', result);

} catch (err) {
    console.error('Database error:', err.message);
} finally {
    db.close();
}
