import ThemeContext from "./Context api/Themecontext";
import { useState } from "react";


function Themeprovider({ children }) {
 const  name = "Ayush Ojha";
 const [count, setCount] = useState(0);

  return (
    <ThemeContext.Provider value={{name, count, setCount}}>
      {children}
    </ThemeContext.Provider>
  );
}
export default Themeprovider;
