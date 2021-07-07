const express = require("express");

const Schemes = require("./scheme-model.js");

const router = express.Router();

// get all schemes
router.get("/", async (req, res) => {
  try {
    const schemes = await Schemes.findSchemes();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: "Failed to get schemes" });
  }
});

// get scheme by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const scheme = await Schemes.findSchemeById(id);

    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get schemes" });
  }
});

// // get all steps
// router.get("/steps", async (req, res) => {
//   try {
//     const steps = await Schemes.findSteps();
//     res.json(steps);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get steps" });
//   }
// });

// get steps by scheme id
router.get("/:id/steps", async (req, res) => {
  const { id } = req.params;

  try {
    const steps = await Schemes.findSteps(id);

    if (steps.length) {
      res.json(steps);
    } else {
      res
        .status(404)
        .json({ message: "Could not find steps for given scheme" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get steps" });
  }
});

// add new scheme
router.post("/", async (req, res) => {
  const schemeData = req.body;
  console.log("schemeData", schemeData);
  try {
    const scheme = await Schemes.add(schemeData);
    res.status(201).json(scheme);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new scheme" });
  }
});

// add new step by scheme id
router.post("/:id/steps", async (req, res) => {
  const stepData = req.body;
  const { id } = req.params;
  try {
    const scheme = await Schemes.findSchemeById(id);

    if (scheme) {
      const step = await Schemes.addStep(stepData, id);
      res.status(201).json(step);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to create new step" });
  }
});

// update scheme by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const scheme = await Schemes.findSchemeById(id);

    if (scheme) {
      const updatedScheme = await Schemes.update(changes, id);
      res.json(updatedScheme);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update scheme" });
  }
});

//? delete scheme (all related steps also get removed)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundItem = await Schemes.findSchemeById(id);
    const deleted = await Schemes.remove(id);

    if (deleted) {
      res.json(foundItem);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete scheme" });
  }
});

module.exports = router;
