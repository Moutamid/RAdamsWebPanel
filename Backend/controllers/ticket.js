const Ticket = require("../models/ticket");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.uploadTicketPhotos = upload.array("images", 10);

// exports.createTicket = async (req, res) => {
//   // console.log(req.file);
//   const Image = req.file.filename;
//   const { vehicle, driver, h_code, date } = req.body;
//   //H code is unique??
//   //   Ticket.findOne({ h_code }).exec((err, ticket) => {
//   //     if (ticket) {
//   //       return res.status(400).json({
//   //         error: "h_code is taken",
//   //       });
//   //     }
//   //new ticket
//   const newTicket = new Ticket({ vehicle, driver, h_code, date, Image });
//   newTicket.save(async (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(401).json({
//         error: "Error saving ticket in database. Try later",
//       });
//     }
//     return res.json({
//       message: "Ticket added successfully!",
//     });
//   });
// };

//Multiple images...
exports.createTicket = async (req, res) => {
  try {
    const images = req.files.map(file => file.filename);

    const { vehicle, driver, h_code, date } = req.body;

    const newTicket = new Ticket({ vehicle, driver, h_code, date, images });
    await newTicket.save();

    return res.json({
      message: "Ticket added successfully!",
      ticket: newTicket,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Error saving ticket in database. Please try again later.",
    });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    // const tickets = await Ticket.find().populate("driver", "_id firstName lastName permission").populate("vehicle", "_id number");
    const tickets = await Ticket.find();
    return res.json(tickets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Error retrieving tickets from the database. Please try again later.",
    });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    // const ticket = await Ticket.findById(req.params.id)
    //   .populate("driver", "_id firstName lastName permission")
    //   .populate("vehicle", "_id number");
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    return res.json(ticket);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Error retrieving ticket from the database. Please try again later.",
    });
  }
};

exports.getAllHCodes = async (req, res) => {
  try {
    const hCodes = await Ticket.distinct("h_code");
    const formattedHCodes = hCodes.map(hCode => ({ hcode: hCode }));
    return res.json(formattedHCodes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error retrieving h_codes from the database. Please try again later.",
    });
  }
};

exports.getAllDates = async (req, res) => {
  try {
    const dates = await Ticket.distinct("date");
    const formattedDates = dates.map(el => ({ date: el }));
    return res.json(formattedDates);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error retrieving h_codes from the database. Please try again later.",
    });
  }
};

exports.getFilteredTickets = async (req, res) => {
  try {
    const { vehicle, driver, hcode, date } = req.query;

    const filter = {};
    if (vehicle) filter.vehicle = vehicle;
    if (driver) filter.driver = driver;
    if (hcode) filter.h_code = hcode;
    if (date) filter.date = date;

    const tickets = await Ticket.find(filter);

    return res.json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error retrieving filtered tickets from the database. Please try again later.",
    });
  }
};
