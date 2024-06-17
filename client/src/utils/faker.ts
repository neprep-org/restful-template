import { faker } from "@faker-js/faker";

const generateColumns = () => {
  return [
    { Header: "ID", accessor: "id" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Age", accessor: "age" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Country", accessor: "country" },
    { Header: "Company", accessor: "company" },
    { Header: "Job Title", accessor: "jobTitle" },
    { Header: "Created At", accessor: "createdAt" },
  ];
};

const generateDummyData = (count) => {
  const data: any = [];

  for (let i = 1; i <= count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const age = Math.floor(Math.random() * 50) + 20; // Random age between 20 and 70
    const email = faker.internet.email(firstName, lastName).toLowerCase();
    const phone = faker.phone.number();
    const country = faker.location.country();
    const company = faker.company.name();
    const jobTitle = faker.person.jobTitle();
    const createdAt = faker.date.past(5); // Random date from the past 5 years

    data.push({
      id: i,
      firstName,
      lastName,
      age,
      email,
      phone,
      country,
      company,
      jobTitle,
      createdAt,
    });
  }

  return data;
};

const columns = generateColumns();
const data = generateDummyData(100);

export { columns, data };
