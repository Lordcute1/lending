import AddUserForm from "../../../ui/dashboard/users/addUser/addUser";
import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <AddUserForm />
    </div>
  );
};

export default AddUserPage;
