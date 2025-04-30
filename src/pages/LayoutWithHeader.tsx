import Header from "../shared/Header";
import Input from "../shared/Input";
import { Outlet } from "react-router-dom";

export default function LayoutWithHeader() {
    return (
      <div className='lg:flex bg-[#10141E] overflow-hidden'>
        <Header />
        <div>
          <Input />
          <Outlet />
        </div>
      </div>
    );
}