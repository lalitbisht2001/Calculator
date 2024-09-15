import styles from "./Screen.module.css";

const Screen = ({ expression, answer }) => {
    return (
        <div className={styles.main}>
            <input
                type="text"
                value={answer !== null ? answer : expression}
                className={styles.input_value}
                readOnly
            />
        </div>
    );
};

export default Screen;
