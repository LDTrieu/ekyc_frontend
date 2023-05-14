import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

function Recommend() {
  return (
    <div className="bg-bg_light_gray h-[240px] flex">
      <div className="m-auto text-center">
        {/* <h2 className="font-bold text-h3">Xem Báo Cáo</h2> */}
        <p className="text-lg mt-[14px]">Truy xuất phiên làm việc</p>
        <div className="flex justify-center">
          <Link to="/report">
            <Button className="mt-[18px] px-8">Xem Báo Cáo</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Recommend;
