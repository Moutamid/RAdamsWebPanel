const Vehicle = require("../models/vehicle");

exports.createVehicle = async (req, res) => {
  try {
    // Extract data from request body
    const { number } = req.body;

    // Check if the vehicle number already exists
    const existingVehicle = await Vehicle.findOne({ number });
    if (existingVehicle) {
      return res.status(400).json({ error: "Vehicle number already exists" });
    }

    // Create a new vehicle instance
    const newVehicle = new Vehicle({ number });

    // Save the new vehicle to the database
    await newVehicle.save();

    return res.status(201).json({
      message: "Vehicle created successfully!",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error creating vehicle. Please try again later.",
    });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    return res.json(vehicles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error retrieving vehicles from the database. Please try again later.",
    });
  }
};
exports.getAllVehicleNumbers = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().select("number -_id");
    return res.json(vehicles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error retrieving vehicle numbers from the database. Please try again later.",
    });
  }
};

exports.deleteVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    // Check if the vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Delete the vehicle from the database
    await Vehicle.findByIdAndDelete(vehicleId);

    return res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error deleting vehicle from the database. Please try again later.",
    });
  }
};
