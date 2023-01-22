import { getDb } from "../server.js";
import { ObjectId } from "mongodb";

export const getAllProducts = async (req, res) => {
  try {
    const dbConnection = getDb();
    const { name, sort } = req.query;

    const findParams = {};
    const sortCriteria = {};

    if (name) {
      findParams.name = { $regex: new RegExp(name), $options: "i" };
    }
    if (sort) {
      sortCriteria.price = sort === "desc" ? -1 : 1;
    }

    if (sort) {
      const products = await dbConnection
        .collection("products")
        .find(findParams)
        .sort(sortCriteria)
        .toArray();

      return res.json(products);
    } else {
      const products = await dbConnection
        .collection("products")
        .find(findParams)
        .toArray();

      return res.json(products);
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const postProduct = async (req, res) => {
  try {
    const dbConnection = getDb();
    const { name, description, price, quantity, unit, available } = req.body;

    const duplicateProduct = await dbConnection
      .collection("products")
      .findOne({ name });

    if (duplicateProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const response = await dbConnection.collection("products").insertOne({
      name,
      description,
      price,
      quantity,
      unit,
      available,
    });

    return res.json({ response });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateProduct = (req, res) => {
  try {
    const dbConnection = getDb();
    const { id, name, description, price, quantity, unit, available } =
      req.body;

    const newValues = {};
    name && (newValues.name = name);
    description && (newValues.description = description);
    description && (newValues.description = description);
    price && (newValues.price = price);
    quantity && (newValues.quantity = quantity);
    unit && (newValues.unit = unit);
    available && (newValues.available = available);

    const response = dbConnection
      .collection("products")
      .updateOne({ _id: ObjectId(id) }, newValues);

    return res.json({ message: response });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const dbConnection = getDb();
    const { id } = req.params;

    const response = await dbConnection
      .collection("products")
      .deleteOne({ _id: ObjectId(id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Product was not found" });
    } else {
      return res.json({ messaage: response });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const productsReport = async (req, res) => {
  try {
    const dbConnection = getDb();

    const reportData = await dbConnection
      .collection("products")
      .aggregate([
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: "$quantity" },
            totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          },
        },
        {
          $project: {
            _id: 0,
            totalQuantity: 1,
            totalValue: 1,
          },
        },
      ])
      .toArray();

    return res.json(reportData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
