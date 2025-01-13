Buat file .env yang berisikan 

DATABASE_URL="postgresql://username:password@localhost:5432/alpvp?schema=public"

bukalah PGAdmin dan buat database bernama alpvp kemudian lakukan "npx prisma migrate dev" pada terminal.
Gantilah username sesuai username pada PGAdmin dan juga password. 

Lakukan seeding manual dengan menggunakan thunderclient atau postman dengan menyesuaikan route pada public-router dan juga protected-router.
