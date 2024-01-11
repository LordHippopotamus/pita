import CreateProject from "./CreateProject";
import Projects from "./Projects";

const Dashboard = () => (
  <div className="px-4 my-8 flex gap-4 flex-wrap">
    <Projects />
    <CreateProject />
  </div>
);

export default Dashboard;
