import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function saveUser(
  data: Prisma.UserCreateInput | Prisma.UserUncheckedCreateInput
) {
  return prisma.user.upsert({
    where: { email: data.email },
    update: data,
    create: data,
  });
}

function saveCompany(
  data: Prisma.CompanyCreateInput | Prisma.CompanyUncheckedCreateInput
) {
  return prisma.company.upsert({
    where: { name: data.name },
    update: data,
    create: data,
  });
}

async function main() {
  await saveUser({
    email: 'admin@example.com',
    name: 'Admin',
    passwordHash:
      '$2b$10$lJp7XSw2BiUJit/CBjPXieJXPQJWj01IY.966XnKDH3EDkdVno/o2', // god
    role: 'ADMIN',
  });

  await saveUser({
    email: 'support@example.com',
    name: 'Support',
    passwordHash: 'f21e6e160c503ad7b79e60f22d43e861', // go2support
    role: 'SUPPORT',
  });

  const companyA = await saveCompany({ name: 'Company A' });
  await saveUser({
    email: 'dwight@a.com',
    name: 'Dwight Schrute',
    passwordHash: 'bdc87b9c894da5168059e00ebffb9077', // password1234
    role: 'INVESTIGATOR',
    companyId: companyA.id,
  });
  await saveUser({
    email: 'jim@a.com',
    name: 'Jim',
    passwordHash: '54aea06e65a58b1bc96e060c86b212c3', // ilovepam
    role: 'NORMAL',
    companyId: companyA.id,
  });
  await saveUser({
    email: 'pam@a.com',
    name: 'Pam',
    passwordHash: '8df2b7edb88ba2270a320df6651b1422', // ilovejim
    role: 'NORMAL',
    companyId: companyA.id,
  });

  const companyB = await saveCompany({ name: 'Company B' });
  await saveUser({
    email: 'boss@b.com',
    name: 'Pointy-haired Boss',
    passwordHash: 'f8f4877c5d8062c7ce207170d070f11b', // p3cafx4q
    role: 'INVESTIGATOR',
    companyId: companyB.id,
  });
  await saveUser({
    email: 'dilbert@b.com',
    name: 'Dilbert',
    passwordHash: '4550955866ee7b328f9e0877bc37a096', // Ab4gSgWX
    role: 'NORMAL',
    companyId: companyB.id,
  });
  await saveUser({
    email: 'wally@b.com',
    name: 'Wally',
    passwordHash: '3ee9f4b95b4c9e5276d4dba3df61e353', // B2WDEcBg
    role: 'NORMAL',
    companyId: companyB.id,
  });
  await saveUser({
    email: 'alice@b.com',
    name: 'Alice',
    passwordHash: 'e2d0b6fa939e5ceec4217df543606144', // OsRxnTx]S8?!\K[O;/`zD<QB4lyk\vy0
    role: 'NORMAL',
    companyId: companyB.id,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
