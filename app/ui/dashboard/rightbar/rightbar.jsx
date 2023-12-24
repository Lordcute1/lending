import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import { Button } from "../../../../components/ui/button";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/astronaut.png" alt="" fill />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 Available Now</span>
          <h3 className={styles.title}>
            How to use the new version of the admin dashboard?
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <Button className="flex p-3 gap-3 w-max items-center">
            <MdPlayCircleFilled />
            Watch
          </Button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notification}>🚀 Coming Soon</span>
          <h3 className={styles.title}>
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className={styles.subtitle}>Boost your productivity</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <Button className="flex p-3 gap-3 w-max items-center">
            <MdReadMore />
            Learn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
