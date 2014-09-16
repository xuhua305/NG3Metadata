using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;



namespace HR.Employee.Facade
{
   public interface IEmpInfoFacade
   {
       DataTable GetEmpList(string clientJson, int pageSize, int PageIndex, ref int totalRecord);

       int Save(DataTable masterdt, DataTable detaildt);

       DataTable GetMasterInfo(string id);

       DataTable GetDetailInfo(string mainid);

       int Delete(string id);
    }
}
