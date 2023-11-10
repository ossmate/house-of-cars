import { css } from "../../styled-system/css";

export default function Home() {
  return (
    <div
      className={css({
        fontSize: "2xl",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        h: "dvh",
      })}
    >
      Hello 🐼!
    </div>
  );
}
