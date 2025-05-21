import { Outlet } from "react-router-dom";
import Context from "../context";
import { useContext, useEffect } from "react";

function PortugueseDic(){
  const { language, setLanguage } = useContext(Context);

  useEffect(() => {
    if(language.startsWith('en')){
      setLanguage('pt');
    }
  }, [language, setLanguage])

  return (
    <div className="portuguese-dic">
      <Outlet />
    </div>
  )
}

export default PortugueseDic