const Home = () => (
  <div className="max-w-3xl mx-auto mx-auto">
    <div className="bg-white shadow-lg rounded-md p-4 my-8 text-lg leading-10">
      <h1 className="text-rose-500 tracking-widest text-4xl text-center">
        PITA
      </h1>
      <p className="mt-4">
        PITA is a headless CMS that provides the following services:
      </p>
      <ul>
        <li className="list-disc list-inside">Storage</li>
        <li className="list-disc list-inside">Database</li>
      </ul>
      <p className="mt-4">Workflow:</p>
      <ul>
        <li className="list-decimal list-inside">
          Create a project (this creates a database and a storage cluster)
        </li>
        <li className="list-decimal list-inside">
          Create tables and fields in the schema section
        </li>
        <li className="list-decimal list-inside">
          Add records to the tables in the data section
        </li>
        <li className="list-decimal list-inside">
          Connect to your database using any tool that can connect to a
          PostgreSQL database
        </li>
        <li className="list-decimal list-inside">
          Upload files at the storage route and access them via a link
        </li>
      </ul>
    </div>
  </div>
);

export default Home;
