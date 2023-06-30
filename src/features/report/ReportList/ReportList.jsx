import React, { useState } from "react";
import moment from "moment";
import useFetchAllReport from "./hooks/useFetchAllReport";
import useAxiosWithToken from "hooks/useAxiosWithToken";
import StudentProfile from "features/student/StudentCreate/components/StudentProfile";
import Student from "../components/Student";

import {
  updateReportService,
  getAllReportsService,
  getDetailReportService,
} from "../services/report";
import { toast } from "react-toastify";
import { ModalConfirm, ModalReportDetail } from "components/ui/Modal";
import { useNavigate } from "react-router-dom";
import { MuiTabs } from "components/ui";
const report1 = { firstName: 'John', lastName: 'Doe' };
const ReportList = (props) => {
  const { report_list } = useFetchAllReport();
  const axiosPrivate = useAxiosWithToken();
  const [selectedReport, setSelectedReport] = useState(null);

  const [modalDeleteCloseVisible, setModalDeleteCloseVisible] = useState(false);
  const showDeleteModal = () => setModalDeleteCloseVisible(true);
  const hideDeleteModal = () => setModalDeleteCloseVisible(false);

  const [modalDetailCloseVisible, setModalDetailCloseVisible] = useState(false);
  const showDetailModal = () => setModalDetailCloseVisible(true);
  const hideDetailModal = () => setModalDetailCloseVisible(false);

  const [modalCloseVisible, setModalCloseVisible] = useState(false);
  const showModal = () => setModalCloseVisible(true);
  const hideModal = () => setModalCloseVisible(false);

  const navigate = useNavigate();

  const onSelectReport = (report) => {
    console.log("item: ", report);
    setSelectedReport(report);
  };

  return (
    <>
      <div className="py-5">
      <MuiTabs
            componentList={[
              {
                label: 'Sinh viên',
                //  data: <Student />,
              },
              {
                label: 'Lớp học',
                // data: <Course />,
              },
              {
                label: 'Thời gian',
                // data: <DurationTime />,
              },
            ]}
          />
      </div>

    </>
    
  );
};

export default ReportList;
