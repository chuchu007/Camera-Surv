import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import React from "react";
import { useState, useEffect } from "react";
import List from "devextreme-react/list";
import axios from "axios";
import "./style.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { AddBuildingModal } from "./addBuildingModal";
import { IconButton } from "@mui/material";
import { BorderColor, Map } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const BuildingDirectory = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [buildings, setBuildings] = useState([]);
  let navigate = useNavigate();
  const [addModalShow, setAddModalShow] = useState(false);

  function ItemTemplate(data) {
    const textColor =
      theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)";
    const backgroundColor = theme.palette.mode === "dark" ? "#141b2d" : "#fff";

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          //backgroundColor,
          color: textColor,
        }}
        onClick={() =>
          navigate("/floorInfo", {
            state: { building_name: data.building_name },
          })
        }
      >
        <span>{data.building_name}</span>
        <NavigateNextIcon
          onClick={() =>
            navigate("/floorInfo", {
              state: { building_name: data.building_name },
            })
          }
        />
      </div>
    );
  }

  useEffect(() => {
    getBuildingData();
  }, []);

  const getBuildingData = async () => {
    const response = await axios.get(
      "http://localhost:3002/v1/api/building-details"
    );
    setBuildings(response.data);
  };

  let addModalClose = () => setAddModalShow(false);

  const handleClick = () => {
    navigate("/mapView");
  };

  return (
    <div>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Building Directory" />
          <div>
            {/* <Button
    				variant='primary'
   				 	onClick={()=> {
						setAddModalShow(true);
					}} style={{ backgroundColor: colors.greenAccent[500], color: 'white' }}
   					>Add Buliding</Button>
					<AddBuildingModal
					show={addModalShow}
					onHide={addModalClose}
					/> */}
          </div>
          <Box>
            <IconButton
              onClick={handleClick}
              style={{
                backgroundColor: colors.greenAccent[500],
                color: "white",
              }}
            >
              <Map />
            </IconButton>
            <IconButton
              onClick={() => setAddModalShow(true)}
              sx={{
                bgcolor: colors.greenAccent[500],
                color: "white",
                marginLeft: "10px",
              }}
            >
              <AddIcon />
            </IconButton>
            <AddBuildingModal show={addModalShow} onHide={addModalClose} />
          </Box>

          {/* <Button
    				variant='secondary'
   				 	onClick={handleClick} style={{ backgroundColor: colors.greenAccent[500], color: 'white' }}
   					>Map View</Button> */}
        </Box>
      </Box>
      <div className="list-container">
        <List
          dataSource={buildings}
          height={500}
          itemRender={ItemTemplate}
          searchExpr="building_name"
          searchEnabled={true}
          onClick={() => alert("hello")}
        />
      </div>
    </div>
  );
};

export default BuildingDirectory;
