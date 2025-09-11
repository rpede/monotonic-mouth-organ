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

function saveCase(data: Prisma.CaseCreateInput | Prisma.CaseUncheckedCreateInput) {
  return prisma.case.upsert({
    where: { caseNo: data.caseNo },
    update: data,
    create: data,
  })
}

async function main() {
  await saveUser({
    email: 'admin@mmo.example',
    name: 'Admin',
    passwordHash:
      '$2b$10$lJp7XSw2BiUJit/CBjPXieJXPQJWj01IY.966XnKDH3EDkdVno/o2', // god
    role: 'ADMIN',
  });

  await saveUser({
    email: 'support@mmo.example',
    name: 'Support',
    passwordHash: 'f15ada4c42f934eea105b4a7ccc3707b', // lasthope
    role: 'SUPPORT',
  });

  const companyA = await saveCompany({ name: 'Dunder Mifflin' });
  await saveUser({
    email: 'dwight@dm.example',
    name: 'Dwight Schrute',
    passwordHash: 'bdc87b9c894da5168059e00ebffb9077', // password1234
    role: 'INVESTIGATOR',
    companyId: companyA.id,
  });
  await saveUser({
    email: 'jim@dm.example',
    name: 'Jim',
    passwordHash: '54aea06e65a58b1bc96e060c86b212c3', // ilovepam
    role: 'EMPLOYEE',
    companyId: companyA.id,
  });
  await saveUser({
    email: 'pam@dm.example',
    name: 'Pam',
    passwordHash: '8df2b7edb88ba2270a320df6651b1422', // ilovejim
    role: 'EMPLOYEE',
    companyId: companyA.id,
  });

  const companyB = await saveCompany({ name: 'Path-E-Tech' });
  await saveUser({
    email: 'boss@unknown.example',
    name: 'Pointy-haired Boss',
    passwordHash: 'f8f4877c5d8062c7ce207170d070f11b', // p3cafx4q
    role: 'INVESTIGATOR',
    companyId: companyB.id,
  });
  await saveUser({
    email: 'dilbert@unknown.example',
    name: 'Dilbert',
    passwordHash: '4550955866ee7b328f9e0877bc37a096', // Ab4gSgWX
    role: 'EMPLOYEE',
    companyId: companyB.id,
  });
  await saveUser({
    email: 'wally@unknown.example',
    name: 'Wally',
    passwordHash: '3ee9f4b95b4c9e5276d4dba3df61e353', // B2WDEcBg
    role: 'EMPLOYEE',
    companyId: companyB.id,
  });
  await saveUser({
    email: 'alice@unknown.example',
    name: 'Alice',
    passwordHash: 'e2d0b6fa939e5ceec4217df543606144', // OsRxnTx]S8?!\K[O;/`zD<QB4lyk\vy0
    role: 'EMPLOYEE',
    companyId: companyB.id,
  });
  await saveCase({
    caseNo: "29293297",
    user: { connect: { email: 'dwight@dm.example' } },
    company: { connect: { name: "Dunder Mifflin" } }
  });
  await saveCase({
    caseNo: "29293309",
    user: { connect: { email: 'jim@dm.example' } },
    company: { connect: { name: "Dunder Mifflin" } },
    status: 'INVESTIGATING'
  });
  await saveCase({
    caseNo: "29293310",
    user: { connect: { email: 'pam@dm.example' } },
    company: { connect: { name: "Dunder Mifflin" } },
    status: 'CLOSED'
  });
  await saveCase({
    caseNo: "13371337",
    user: { connect: { email: 'wally@unknown.example' } },
    company: { connect: { name: "Path-E-Tech" } },
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
