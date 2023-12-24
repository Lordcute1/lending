import Image from "next/image";
import Link from "next/link";
import styles from "../../ui/dashboard/customers/customers.module.css";
import Search from "../../ui/dashboard/search/search";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { fetchCustomers } from "../../lib/data";
import { deleteCustomer } from "../../lib/actions";

const CustomersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, customers } = await fetchCustomers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a customer..." />
        <Link href="/dashboard/customers/add">
          <button className={styles.addButton}>Add New Customer</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className={styles.customer}>
                  <Image
                    src={customer.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.customerImage}
                  />
                  {customer.title}
                </div>
              </td>
              <td>{customer.desc}</td>
              <td>${customer.price}</td>
              <td>{customer.createdAt?.toString().slice(4, 16)}</td>
              <td>{customer.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/customers/${customer.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteCustomer}>
                    <input type="hidden" name="id" value={customer.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default CustomersPage;
