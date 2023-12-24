import { deleteAdmin } from "../../lib/actions";
import { fetchAdmins } from "../../lib/data";
import Pagination from "../../ui/dashboard/pagination/pagination";
import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PrintButton from "../../ui/printButton/printButton";

const UsersPage = async ({ searchParams }) => {
  const session = await getServerSession(options);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, admins } = await fetchAdmins(q, page, session.user._id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New Admin</button>
        </Link>
        <PrintButton />
      </div>
      <Table id="adminsTable">
        <TableCaption>A list of all Admins</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>
                <div className={styles.user}>
                  <Image
                    src={admin.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {admin.username}
                </div>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${admin.id}`}>
                    <Button>View</Button>
                  </Link>
                  <form action={deleteAdmin}>
                    <input type="hidden" name="id" value={admin.id} />
                    <Button variant="destructive">Delete</Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>

      {/* <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={admin.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {admin.username}
                </div>
              </td>
              <td>{admin.email}</td>
              <td>{admin.createdAt?.toString().slice(4, 16)}</td>

              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${admin.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteAdmin}>
                    <input type="hidden" name="id" value={admin.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
