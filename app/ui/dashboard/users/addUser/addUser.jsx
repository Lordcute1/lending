"use client";
import { addAdmin } from "../../../../lib/actions";
import { useFormState } from "react-dom";
import styles from "./addUser.module.css";

export default function AddUserForm() {
  const [state, formAction] = useFormState(addAdmin, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="username" name="username" required />
      <input type="lastName" placeholder="lastName" name="lastName" />
      <input type="password" placeholder="password" name="password" required />
      <input type="firstName" placeholder="firstName" name="firstName" />

      <textarea
        name="address"
        id="address"
        rows="16"
        placeholder="Address"
      ></textarea>
      <button type="submit">Submit</button>
      <div className={styles.state}>{state && state}</div>
    </form>
  );
}
