const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

app.get("/v1/api/building-details", (req, res) => {
	db.query("SELECT building_name FROM cam_sur.building", (error, result) => {
		if(error) {
			console.log(error);
			res.send({});
		}
		else {
			res.send(result);
		}
	})
});

app.get("/v1/api/floor-detail", (req,res)=> {
	const buildingName = req.query.buildingName;
	db.query(
		"SELECT * FROM cam_sur.floor LEFT JOIN cam_sur.camera ON floor.building_name = camera.building_name AND floor.floor_num = camera.floor_num WHERE floor.building_name = ?", 
		buildingName,
		(err, result) => {
			if(err) {}
			else {
				const filtered_result = []
				result.forEach(obj => {
					let building = obj.building_name;
					let floor = obj.floor_num;
					if(building==null || floor==null) return;
					else {
						filtered_result.push(obj);
					}
				});
				res.send(filtered_result);
			}
		});
});

app.get("/v1/api/user-detail", (req,res)=>{
	const user_id = req.query.user_id;
	db.query(
		"SELECT camera_id FROM user_camera_info WHERE user_id=?", user_id, (err, result) => {
			if(err) {}
			else {res.send(result);}
		}
	)
});

app.post("/v1/api/user-detail", (req,res)=>{
	const user_id = req.body.user_id;
	const camera_id = req.body.camera_id;
	db.query(
		'INSERT INTO user_camera_info (user_id, camera_id) VALUES ('+user_id+','+camera_id+')', (err, result) => {
			if(err) { return res.status(500).send({})}
			else { return res.send(result)}
		}
	);
});
app.post("/v1/api/building", (req, res) => {
	const building_name = req.body.building_name;
	db.query(
		'INSERT INTO cam_sur.building (building_name) VALUES ("'+building_name+'")',
		(error, result) => {
			if (error) {
				console.log(error);
				res.send({ message: "Error adding building name" });
			} else {
				res.send({ message: "Building name added successfully" });
			}
		}
	);
});

app.delete("/v1/api/delete_camera/:camera_id", (req, res) => {
	const camera_id = req.params.camera_id;
	db.query(
		'DELETE FROM cam_sur.camera WHERE camera_id = '+ camera_id +'',
		(error, result) => {
			if (error) {
				console.log(error);
				res.send({ message: "Error deleting camera record" });
			} else {
				if (result.affectedRows === 0) {
					res.status(404).send({ message: "camera record not found" });
				} else {
					
					res.send({ message: "camera record deleted successfully" });
				}
			}
		}
	);
});

app.post("/v1/api/addFloor", (req, res) => {
	const building_name = req.body.building_name;
	const floor_num=req.body.floor_num;
	const camera_name = req.body.camera_name;
	const camera_loc=req.body.camera_loc;
	const date_of_installation=req.body.date_of_installation; 
	db.query(
		'INSERT INTO cam_sur.floor (building_name,floor_num) VALUES ("'+building_name+'",'+floor_num+')',
		(error, result) => {
			if (error) {
				console.log(error);
				//res.send({ message: "Error adding floor " });
				db.query(
					'INSERT INTO cam_sur.camera (building_name,floor_num,camera_name,camera_loc,date_of_installation) VALUES ("'+building_name+'",'+floor_num+',"'+camera_name+'","'+camera_loc+'",DATE("'+date_of_installation+'"))',
					(error, result) => {
						if (error) {
							console.log(error);
							res.send({ message: "Error adding camera " });
						} else {
							res.send({ message: "Camera added successfully" });
			
						}
					})

			} else {
				res.send({ message: "Floor added successfully" });
				db.query(
					'INSERT INTO cam_sur.camera (building_name,floor_num,camera_name,camera_loc,date_of_installation) VALUES ("'+building_name+'",'+floor_num+',"'+camera_name+'","'+camera_loc+'",DATE("'+date_of_installation+'"))',
					(error, result) => {
						if (error) {
							console.log(error);
							res.send({ message: "Error adding camera " });
						} else {
							res.send({ message: "Camera added successfully" });
			
						}
					});
			}
		}
	);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})