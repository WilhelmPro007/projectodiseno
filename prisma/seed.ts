import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding roles...');

    const adminRole = await prisma.role.upsert({
        where: { name: 'Admin' },
        update: {},
        create: { name: 'Admin' },
    });

    const userRole = await prisma.role.upsert({
        where: { name: 'User' },
        update: {},
        create: { name: 'User' },
    });

    console.log(`- Roles seeded: ${adminRole.name}, ${userRole.name}`);

    console.log('Seeding initial users...');

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: 'AdminPassword123!', // En producción esto debe estar hasheado
            name: 'Administrador Sistema',
            roleId: adminRole.id,
        },
    });

    const normalUser = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            password: 'UserPassword123!', // En producción esto debe estar hasheado
            name: 'Usuario Estándar',
            roleId: userRole.id,
        },
    });

    console.log(`- Users seeded: ${adminUser.email}, ${normalUser.email}`);
    console.log('Seed execution finished successfully.');
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
