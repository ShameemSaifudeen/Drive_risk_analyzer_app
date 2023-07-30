import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Typography, Grid } from "@mui/material";
import AuthButtons from "./Components/AuthButtons";
import StatsCard from "./Components/StatsCard";
import FileTable from "./Components/FileTable";
import PeopleAccessTable from "./Components/PeopleAccessTable";
import ReactSpeedometer from "react-d3-speedometer";
import swal from "sweetalert";

const App = () => {
  const [driveData, setDriveData] = useState({
    files: [],
    totalSize: 0,
    publicFiles: [],
    externallySharedFiles: [],
    peopleWithAccess: {},
    riskCounter: 0,
    token: null,
  });

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const fetchDriveData = async () => {
      const response = await axios.get("http://localhost:5000/drive");
      if (response.data) {
        setDriveData(response.data);
        setAuth(true);
      }
    };

    fetchDriveData();
  }, []);

  const handleAuth = () => {
    window.location.href = "http://localhost:5000/auth";
  };

  const handleRevokeAccess = async () => {
    try {
      await axios.get(`http://localhost:5000/revoke/${driveData.token}`);
      setDriveData({
        files: [],
        totalSize: 0,
        publicFiles: [],
        externallySharedFiles: [],
        peopleWithAccess: {},
        riskCounter: 0,
        token: null,
      });
      setAuth(false);
      swal("Success", "Access revoked successfully", "success");
    } catch (error) {
      console.error("Failed to revoke access", error);
      swal("Error", "Failed to revoke access", "error");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box p={3}>
        <Typography variant="h4" gutterBottom align="center">
          Google Drive Risk Report
        </Typography>
        <Box display="flex" justifyContent="center" mb={3}>
          <AuthButtons
            auth={auth}
            handleAuth={handleAuth}
            handleRevokeAccess={handleRevokeAccess}
          />
        </Box>
        {auth && (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" gutterBottom>
                  Risk Counter
                </Typography>
                <ReactSpeedometer
                  maxValue={100}
                  value={driveData.riskCounter}
                  valueFormat={"d"}
                  height={200}
                  width={300}
                />
                <Typography variant="h6" gutterBottom>
                  {driveData.riskCounter}
                </Typography>
              </Box>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard title="Risk Counter" value={driveData.riskCounter} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  title="Total Storage Used"
                  value={`${(driveData.totalSize / 1073741824).toFixed(2)} GB`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  title="Public Files"
                  value={driveData.publicFiles.length}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  title="Externally Shared Files"
                  value={driveData.externallySharedFiles.length}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  title="People with Access"
                  value={Object.keys(driveData.peopleWithAccess).length}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <FileTable title="Public Files" data={driveData.publicFiles} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileTable
                  title="Externally Shared Files"
                  data={driveData.externallySharedFiles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PeopleAccessTable
                  title="People with Access"
                  data={driveData.peopleWithAccess}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default App;
