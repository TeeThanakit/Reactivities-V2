import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import NavBar from "./Navbar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import { useStore } from "../store/store";

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
