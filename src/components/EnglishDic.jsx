import { Outlet, useNavigation } from "react-router-dom";

function EnglishDic(){
  const nav = useNavigation();
  const isLoading = nav.state === 'loading';

  return (
    <div id="eng-dic">
      <Outlet />
      {isLoading && 
      <div className="loading-sign">
        <img src="/logo.webp" alt="$" width='30' height='50' />
      </div>
      } 
    </div>
  )
}

export default EnglishDic