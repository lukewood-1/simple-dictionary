import { Outlet } from "react-router-dom";
import Context from "../context";
import { useContext, useEffect } from "react";

function EnglishDic(){
  const {language, setLanguage} = useContext(Context);

  useEffect(() => {
    if(language.startsWith('pt')){
      setLanguage('en');
    }
  }, [language, setLanguage])

  return (
    <div id="eng-dic">
      <Outlet />
    </div>
  )
}

export default EnglishDic