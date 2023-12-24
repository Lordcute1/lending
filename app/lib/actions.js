"use server";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { Customer, Admin } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
// import { signIn } from "../auth";
import bcrypt from "bcrypt";

export const addAdmin = async (prevState, formData) => {
  const { username, password, lastName, firstName, middleName, role } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const session = await getServerSession(options);
    const user = session.user._id;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      lastName,
      firstName,
      middleName,
      role,
      user,
    });

    await newAdmin.save();
  } catch (err) {
    return "User Exists! Add User with Different Credentials!";
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addCustomer = async (prevState, formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newCustomer = new Customer({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newCustomer.save();
  } catch (err) {
    return "Customer Exists!";
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export const updateCustomer = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Customer.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update customer!");
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export const deleteAdmin = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Admin.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};

export const deleteCustomer = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Customer.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete customer");
  }

  revalidatePath("/dashboard/customers");
};

export async function authenticate(prevState, formData) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw error;
  }
}
