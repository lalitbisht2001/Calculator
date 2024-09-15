import { useState } from "react";
import styles from "./CalcBtn.module.css";
import Screen from "./Screen";
import useWindowSize from "../HOOKS/useWindowSize";

const CalcBtn = () => {
    const [Windowsize] = useWindowSize();
    const [Input, setInput] = useState({
        firstoperand: null,
        secondoperand: null,
        operator: null,
        currentInput: "",
    });
    const [expression, setExpression] = useState("");
    const [answer, setAnswer] = useState(null);

    const Arr = [
        ["Clear", "/", "X"],
        ["7", "8", "9", "-"],
        ["4", "5", "6", "+"],
        ["1", "2", "3"],
        ["0", "00", ".", "="],
    ];

    const setCalculation = (col) => {
        if (col === "Clear") {
            setInput({
                firstoperand: null,
                secondoperand: null,
                operator: null,
                currentInput: "",
            });
            setExpression("");
            setAnswer(null);
        } else if (['X', '+', '-', '/'].includes(col)) {
            if (Input.currentInput !== "") {
                setInput((prev) => ({
                    ...prev,
                    firstoperand: parseFloat(Input.currentInput),
                    operator: col,
                    currentInput: "",
                }));
                setExpression((prev) => `${prev} ${col} `);
            }
        } else if (col === '=') {
            if (Input.currentInput !== "" && Input.operator !== null) {
                setInput((prev) => ({
                    ...prev,
                    secondoperand: parseFloat(Input.currentInput),
                }));
                getAnswer();
            }
        } else {
            setInput((prev) => ({
                ...prev,
                currentInput: prev.currentInput + col,
            }));
            setExpression((prev) => prev + col);
        }
    };

    const getAnswer = () => {
        const { firstoperand, secondoperand, operator } = Input;
        if (firstoperand !== null && secondoperand !== null && operator !== null) {
            let result;
            switch (operator) {
                case '+':
                    result = firstoperand + secondoperand;
                    break;
                case '-':
                    result = firstoperand - secondoperand;
                    break;
                case 'X':
                    result = firstoperand * secondoperand;
                    break;
                case '/':
                    result = firstoperand / secondoperand;
                    break;
                default:
                    result = "Error";
                    break;
            }
            setAnswer(result);
            setExpression("");
        }
    };

    const getStyleBtn = (col) => {
        if (col === "Clear") {
            if (Windowsize.width <= 430) {
                return {
                    backgroundColor: "orange",
                    width: "4.58em",
                };
            }
            else if (Windowsize.width >= 431 && Windowsize.width <= 1290) {
                return {
                    backgroundColor: "orange",
                    width: "4.5em",
                };
            }
            else {
                return {
                    backgroundColor: "orange",
                    width: "5em",
                };
            }
        }
        if (col === "+") {
            if (Windowsize.width <= 1290) {
                return {
                    height: "3.6em",
                    backgroundColor: "green",
                };
            }
            else if (Windowsize.width >= 1291) {
                return {
                    height: "4.1em",
                    backgroundColor: "green",
                };
            }
        }
        if (col === "=") {
            return {
                backgroundColor: "skyblue",
            };
        }
        return {};
    };

    return (
        <>
            <Screen expression={expression} answer={answer} />
            <div className={styles.main}>
                <div className={styles.btn_box}>
                    {Arr.map((Row, row_id) => (
                        <div key={row_id} className={styles.row}>
                            {Row.map((col, id) => (
                                <span
                                    key={id}
                                    className={styles.col}
                                    style={getStyleBtn(col)}
                                    onClick={() => setCalculation(col)}
                                >
                                    {col}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CalcBtn;
