import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

const ManageFiles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const axios = require('axios');

  const downloadfile = (filename) => {
    var thisurl =
      "https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/file";
    thisurl = thisurl + "?filename=" + filename;
    axios({ url: thisurl, method: "GET" }).then((response) => {
      console.log(response);
      // fetch(response.data).then(response=>response.blob()).then(blob=>{
      //   const blobURL = window.URL.createObjectURL(new Blob([blob]));
      //   const aTag = document.createElement("a");
      //   aTag.href = blobURL;
      //   document.body.appendChild(aTag);
      //   aTag.click();
      //   aTag.remove();
      // })
      const aTag = document.createElement("a");
      aTag.href = response.data;
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    });
  };

  const deletefile = (filename) => {
    const choice = window.confirm("Are you sure to delete this file?");
    if (choice) {
      var thisurl =
        "https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/file";
      thisurl = thisurl + "?filename=" + filename;
      axios({ url: thisurl, method: "DELETE" }).then((response) => {
        console.log(response.data);
      });
    }
  };

  const columns = [
    {
      field: "Key",
      headerName: "File Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Size",
      headerName: "Size",
      flex: 1,
    },
    {
      field: "LastModified",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: ({ row: { Key } }) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => downloadfile(Key)}
          >
            Download
          </Button>

          // <Button
          //   width="60%"
          //   m="0 auto"
          //   p="5px"
          //   display="flex"
          //   onClick={() => downloadfile(Key)}
          // >
          //   <Typography color={colors.greenAccent[100]} sx={{ ml: "5px" }}>
          //     {"Download"}
          //   </Typography>
          // </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: ({ row: { Key } }) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => deletefile(Key)}
          >
            Delete
          </Button>

          // <Button
          //   width="60%"
          //   m="0 auto"
          //   p="5px"
          //   display="flex"
          //   onClick={() => deletefile(Key)}
          // >
          //   <Typography color={colors.redAccent[300]} sx={{ ml: "5px" }}>
          //     {"DELETE"}
          //   </Typography>
          // </Button>
        );
      },
    },
  ];

  // axios.get('https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/files')
  //   .then(response => {
  //     console.log(response.data);
  //     data = response.data;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  const url =
    "https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/files";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <Box m="20px">
      <Header title="File System" subtitle="Managing the Files" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default ManageFiles;
