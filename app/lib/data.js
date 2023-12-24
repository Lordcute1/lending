import { Customer, Admin } from "./models";
import { connectToDB } from "./utils";

export const fetchAdmins = async (q, page, userId) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Admin.countDocuments({
      username: { $regex: regex },
      user: userId,
    });
    const admins = await Admin.find({
      username: { $regex: regex },
      user: userId,
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, admins };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchAdmin = async (id) => {
  try {
    connectToDB();
    const admin = await Admin.findById(id);
    return admin;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Admin!");
  }
};

export const fetchCustomers = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Customer.find({ title: { $regex: regex } }).count();
    const customers = await Customer.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, customers };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch customers!");
  }
};

export const fetchCustomer = async (id) => {
  try {
    connectToDB();
    const customer = await Customer.findById(id);
    return customer;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch customer!");
  }
};

// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];
