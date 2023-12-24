import { updateCustomer } from "../../../lib/actions";
import { fetchCustomer } from "../../../lib/data";
import styles from "../../../ui/dashboard/customers/singleCustomer/singleCustomer.module.css";
import Image from "next/image";

const SingleCustomerPage = async ({ params }) => {
  const { id } = params;
  const customer = await fetchCustomer(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {customer.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateCustomer} className={styles.form}>
          <input type="hidden" name="id" value={customer.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={customer.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={customer.price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={customer.stock} />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder={customer.color || "color"}
          />
          <label>Size</label>
          <textarea
            type="text"
            name="size"
            placeholder={customer.size || "size"}
          />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            placeholder={customer.desc}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
