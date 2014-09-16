using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

using HR.Employee.DataAccess;
using NG3.Aop;
using NG3;

namespace HR.Employee.Facade
{
    public class EmpInfoFacade : IEmpInfoFacade
    {
        private EmpInfoDac dac = new EmpInfoDac();

        
        [DBControl]
        public DataTable GetEmpList(string clientJson, int pageSize, int PageIndex, ref int totalRecord)
        {
            return dac.GetEmpList(clientJson, pageSize, PageIndex, ref totalRecord);
        }

        [DBControl(ControlOption=DbControlOption.BeginTransaction)]
        public int Save(DataTable masterdt, DataTable detaildt)
        {
            return dac.Save(masterdt, detaildt);
        }

        [DBControl]
        public DataTable GetMasterInfo(string id)
        {
            return dac.GetMasterInfo(id);
        }
        
        [DBControl]
        public DataTable GetDetailInfo(string mainid)
        {
            return dac.GetDetailInfo(mainid);
        }

        [DBControl(ControlOption = DbControlOption.BeginTransaction)]
        public int Delete(string id) 
        {
            return dac.Delete(id);
        }
    }
}
